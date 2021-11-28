import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import USBInput from '@usb-shield/react-input'
import { useManualQuery, useMutation } from 'graphql-hooks'
import { useHistory } from 'react-router-dom'
import Loader from '../../../components/organisms/Loader/Loader'
import {
    getAEMServiceURL,
    handleMultipleFragmentAEMData
} from '../../../utils/aem'
import {
    GetGoalWithStatus,
    createGoal,
    updateGoal,
    SpecificGoal
} from '../../../queries'
import {
    GOAL_NAME_CODES,
    GOAL_NAME_MAX_CHAR_LIMIT,
    GOAL_NAME_MIN_CHAR_LIMIT
} from '../../../constants'
import { aemFetch } from '../../../api'
import CurrencyInput from '../../../components/molecules/CurrencyInput/CurrencyInput'
import DateInput from '../../../components/molecules/DateInput/DateInput'
import Image from '../../../components/atoms/Image/Image'
import PageHeader from '../../../components/molecules/PageHeader'
import * as fromUtils from '../../../utils'
import { goalTagger } from '../../../utils/tealium'
import { DIYDetailsViewLoader } from '../../../skeletons/molecules'
import warningIcon from '../../../svgs/warning-red-icon.svg'
import ErrorContainer from '../../../components/organisms/ErrorContainer/ErrorContainer'
import GoalsOnboardingButtons from '../../../components/molecules/GoalsOnboardingButtons'
import '../styles.scss'

const ContainerDiv = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
`
const InputContainer = styled.div`
    padding: 1rem 0;
`

const GoalDetailsA = () => {
    const [content, setContent] = React.useState(null)
    const [showLoader, setLoader] = useState(false)
    const [isAEMIssue, setAEMIssue] = useState(false)
    const goalTypeCodePassed = sessionStorage.getItem('goalTypeCode')
    const goalGuidPassed = sessionStorage.getItem('goalGuid')
    const flowIdentifierPassed = sessionStorage.getItem(
        'flowIdentifier'
    )
    const _flowIdentifier = flowIdentifierPassed ?? 'investOnboarding'
    const lang = fromUtils.getLanguage()
    const [pageError, setPageError] = useState(false)
    const [goalInfo, setGoalInfo] = useState(null)
    const [goalName, setGoalName] = useState('')
    const [isGoalNameError, setGoalNameError] = useState(false)
    const [goalAmount, setGoalAmount] = useState(0)
    const [isGoalAmountError, setGoalAmountError] = useState(false)
    const [goalDate, setGoalDate] = useState('')
    const [isGoalDateError, setGoalDateError] = useState(false)
    const [goalDateErrorMsg, setGoalDateErrorMsg] = useState(null)
    const isAutoInvestFlow = _flowIdentifier === 'investOnboarding'
    const minGoalAmount = isAutoInvestFlow ? 1000 : 1
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const [financialGoals] = useManualQuery(GetGoalWithStatus)
    const [specificGoal] = useManualQuery(SpecificGoal)
    const [createFinancialGoal] = useMutation(createGoal)
    const [updateFinancialGoal] = useMutation(updateGoal)
    const history = useHistory()

    const prepopulateInitialValues = (draftGoal) => {
        const targetDate = draftGoal?.goalTargetDate?.split('-') || ''
        setGoalInfo(draftGoal)
        setGoalName(draftGoal?.customGoalNameTypeText || '')
        setGoalAmount(draftGoal?.goalAmount || 0)
        if (targetDate)
            setGoalDate(
                `${targetDate?.[1]}/${targetDate?.[0]}` // yyyy-mm format on UI
            )
    }

    useEffect(() => {
        fromUtils.scrollToTop()
        if (!flowIdentifierPassed)
            sessionStorage.setItem(
                'flowIdentifier',
                'investOnboarding'
            )
        goalTagger({
            pageName: 'goal details',
            siteSection: 'goals'
        })
        // graphQL call to get a specific goal
        if (goalGuidPassed) {
            specificGoal({
                variables: {
                    goalGuid: goalGuidPassed
                }
            })
                .then((resp) => {
                    if (!resp?.data) return Promise.reject(resp)
                    if (resp?.data?.financialGoals.length !== 0) {
                        const isDraftGoal =
                            resp?.data?.financialGoals[0]
                                ?.goalStatusCode === 'Draft'
                        const draftGoal =
                            isDraftGoal &&
                            resp?.data?.financialGoals[0]
                        if (draftGoal) {
                            prepopulateInitialValues(draftGoal)
                        } else {
                            sessionStorage.removeItem('goalGuid')
                            sessionStorage.removeItem('goalTypeCode')
                        }
                    }
                    return Promise.resolve(resp)
                })
                .catch((err) => {
                    fromUtils.scrollToTop()
                    return Promise.reject(err)
                })
        }
        // graphQL call to get goals with draft status
        if (goalTypeCodePassed && !goalGuidPassed) {
            financialGoals({
                variables: {
                    goalStatusCode: 'Draft'
                }
            })
                .then((resp) => {
                    if (!resp?.data) return Promise.reject(resp)
                    if (resp?.data?.financialGoals.length !== 0) {
                        // check if resp has a draft goal that matches with goalTypeCode
                        const draftGoal = resp?.data?.financialGoals?.find(
                            (x) =>
                                x.goalTypeCode === goalTypeCodePassed
                        )
                        if (draftGoal)
                            prepopulateInitialValues(draftGoal)
                    }
                    return Promise.resolve(resp)
                })
                .catch((err) => {
                    fromUtils.scrollToTop()
                    return Promise.reject(err)
                })
        }
    }, [])

    // AEM fetch call
    useEffect(() => {
        const url = isAutoInvestFlow
            ? 'goalDetailsAI'
            : 'goalDetailsASavings'
        const aemUrl = getAEMServiceURL({
            service: url,
            locale: lang,
            serveMock: false
        })

        aemFetch(aemUrl)
            .then((res) => res.json())
            .then((aemData) => {
                const parsedData = handleMultipleFragmentAEMData(
                    aemData
                )
                setContent(parsedData)
                return aemData
            })
            .catch((err) => {
                setAEMIssue(true)
                fromUtils.scrollToTop()
                return err
            })
    }, [lang])

    const handleGoalNameChange = (e) => {
        const _customName = e.target.value
        const isGoalTypeOther = goalInfo?.goalTypeCode === 'OTH'
        const goalNameLengthCondition =
            _customName.length > GOAL_NAME_MAX_CHAR_LIMIT ||
            _customName.length < GOAL_NAME_MIN_CHAR_LIMIT
        const goalNameCondition =
            (isGoalTypeOther &&
                (_customName === '' || goalNameLengthCondition)) ||
            (_customName !== '' && goalNameLengthCondition)
        if (goalNameCondition) {
            setGoalNameError(true)
        } else {
            setGoalNameError(false)
            setGoalName(_customName)
        }
    }

    const handleGoalAmountChange = (e) => {
        const valueEntered = Number(
            e.target.value.replace(/[^0-9.]+/g, '')
        )
        const amountCondition = isAutoInvestFlow
            ? valueEntered < minGoalAmount
            : valueEntered <= minGoalAmount
        if (amountCondition) {
            setGoalAmountError(true)
        } else {
            setGoalAmountError(false)
            setGoalAmount(valueEntered)
        }
    }

    const goalDateError = (index = 2) => {
        setGoalDateError(true)
        setGoalDateErrorMsg(content[3]?.errorMessage?.value[index])
    }

    const monthYearValidation = (
        yearEntered,
        monthEntered,
        noOfYearsFromNow = 0
    ) => {
        const minOrMaxYear = currentYear + noOfYearsFromNow
        const isYearEnteredInvalid =
            noOfYearsFromNow === 50
                ? yearEntered > minOrMaxYear
                : yearEntered < minOrMaxYear
        const isMonthEnteredInvalid =
            noOfYearsFromNow === 50
                ? monthEntered > currentMonth
                : monthEntered < currentMonth
        return (
            isYearEnteredInvalid ||
            (yearEntered === minOrMaxYear && isMonthEnteredInvalid)
        )
    }

    const handleGoalDateChange = (val, isError) => {
        const yearEntered = parseInt(val.split('/')[1], 10)
        const monthEntered = parseInt(val.split('/')[0], 10)
        const isDateLessThan2Years = monthYearValidation(
            yearEntered,
            monthEntered,
            2
        )
        const isDateGreaterThan50Years = monthYearValidation(
            yearEntered,
            monthEntered,
            50
        )
        const isDateInvalid = monthYearValidation(
            yearEntered,
            monthEntered
        )

        switch (true) {
            case isError || (!isAutoInvestFlow && isDateInvalid):
                return goalDateError()
            case isAutoInvestFlow && isDateGreaterThan50Years:
                return goalDateError(4)
            case isAutoInvestFlow && isDateLessThan2Years:
                return goalDateError(3)
            default:
                setGoalDateError(false)
                return setGoalDate(val)
        }
    }

    const validationOnSubmit = () => {
        const isGoalTypeOther = goalInfo?.goalTypeCode === 'OTH'
        if (isGoalTypeOther && goalName === '') setGoalNameError(true)
        if (goalAmount === 0) setGoalAmountError(true)
        if (goalDate === '' && !isGoalDateError) {
            goalDateError()
        }
    }

    const itemIndex = content?.[2]?.goalLabel?.value?.indexOf(
        goalInfo?.goalTypeCode || goalTypeCodePassed
    )

    const handleSubmitError = () => {
        setPageError(true)
        setLoader(false)
        fromUtils.scrollToTop()
    }

    const handleSubmit = () => {
        const isGoalTypeOther = goalInfo?.goalTypeCode === 'OTH'
        const isError =
            isGoalNameError || isGoalAmountError || isGoalDateError
        if (
            isError ||
            goalAmount === 0 ||
            goalDate === '' ||
            (isGoalTypeOther && goalName === '')
        ) {
            validationOnSubmit()
            return
        }
        const targetDate = goalDate?.split('/')
        const goalData = {
            alternateGoalTypeText:
                GOAL_NAME_CODES[goalTypeCodePassed],
            customGoalNameTypeText: goalName,
            goalAmount: goalAmount.toString(),
            // Expected date format yyyy-mm-dd for update and create goal
            goalTargetDate: `${targetDate[1]}-${targetDate[0]}-01`
        }
        setLoader(true)
        if (goalGuidPassed || goalInfo) {
            const reqObj = {
                goalGuid: goalGuidPassed || goalInfo.goalGuid,
                goalTypeText: content[1]?.goalName?.value[itemIndex],
                ...goalData
            }
            // if draft goal is present - update draft goal
            updateFinancialGoal({
                variables: reqObj
            })
                .then((resp) => {
                    if (resp?.data?.updateFinancialGoal?.goalGuid) {
                        sessionStorage.setItem(
                            'goalGuid',
                            resp?.data?.updateFinancialGoal?.goalGuid
                        )
                        history.push('./investGoalDetailsB')
                    }
                    setLoader(false)
                    fromUtils.scrollToTop()
                    return Promise.reject(resp)
                })
                .catch((err) => {
                    handleSubmitError()
                    return Promise.reject(err)
                })
        } else {
            const requestObj = {
                ...goalData,
                goalStatusCode: 'Draft',
                goalTypeCode: goalTypeCodePassed,
                goalTypeText: content[1]?.goalName?.value[itemIndex],
                alternateGoalTypeText:
                    GOAL_NAME_CODES[goalTypeCodePassed],
                goalOriginCode: 'Declared',
                goalSourceCode: 'Channel'
            }
            // if draft goal is not present - create draft goal
            createFinancialGoal({
                variables: requestObj
            })
                .then((resp) => {
                    if (resp?.data?.createFinancialGoal?.goalGuid) {
                        sessionStorage.setItem(
                            'goalGuid',
                            resp?.data?.createFinancialGoal?.goalGuid
                        )
                        history.push('./investGoalDetailsB')
                    }
                    setLoader(false)
                    return Promise.reject(resp)
                })
                .catch((err) => {
                    handleSubmitError()
                    return Promise.reject(err)
                })
        }
    }

    if (isAEMIssue) {
        return (
            <ErrorContainer
                icon={warningIcon}
                errorText="Our system isn't cooperating, please try again."
            />
        )
    }

    if (!content) {
        return <DIYDetailsViewLoader />
    }

    const hostName = fromUtils.getAEMDomain()
    const pathName = content[2]?.dynamicImage?.value

    return (
        <>
            {showLoader && (
                <Loader determinate={false} variant="simple" />
            )}
            <Image
                width="100%"
                url={`${hostName}${pathName[itemIndex]}`}
                disable="true"
                altText=""
            />
            <ContainerDiv id="goalDetails_name_amt_date">
                <PageHeader
                    header={content[0]?.pageHeader?.value}
                    hasError={pageError}
                    isHeadingBlue
                />
                <InputContainer>
                    <USBInput
                        addClasses="goalName_input"
                        labelText={content[3]?.fieldLabel?.value[0]}
                        helperText={
                            content[3]?.fieldHelperText?.value[0]
                        }
                        handleChange={handleGoalNameChange}
                        type="text"
                        inputMode="text"
                        errorText={content[3]?.errorMessage?.value[0]}
                        isError={isGoalNameError}
                        value={goalName}
                    />
                </InputContainer>
                <InputContainer>
                    <CurrencyInput
                        label={content[3]?.fieldLabel?.value[1]}
                        helperText={
                            content[3]?.fieldHelperText?.value[1]
                        }
                        handleChange={handleGoalAmountChange}
                        inputMode="numeric"
                        isError={isGoalAmountError}
                        errorText={content[3]?.errorMessage?.value[1]}
                        initValue={fromUtils.formatCurrency(
                            goalAmount,
                            0
                        )}
                        value={fromUtils.formatCurrency(
                            goalAmount,
                            0
                        )}
                        initialValue={goalAmount}
                        greaterThan={minGoalAmount}
                        lessThan={Number.MAX_SAFE_INTEGER}
                        allowDecimal={false}
                    />
                </InputContainer>
                <InputContainer>
                    <DateInput
                        addClasses="date_input"
                        labelText={content[3]?.fieldLabel?.value[2]}
                        helperText={
                            content[3]?.fieldHelperText?.value[2]
                        }
                        initValue={goalDate}
                        value={goalDate}
                        initialValue={goalDate}
                        onBlur={handleGoalDateChange}
                        maxLength={7}
                        isError={isGoalDateError}
                        errorText={goalDateErrorMsg}
                    />
                </InputContainer>
            </ContainerDiv>
            <GoalsOnboardingButtons
                smScreenClasses="paddingHorz"
                continueButtonVOLabel={
                    content[4]?.continueLabelVoiceover?.value
                }
                continueButtonLabel={content[4]?.continueLabel?.value}
                handleContinueButtonClick={handleSubmit}
                cancelButtonLabel={content[4]?.cancelLabel?.value}
                cancelButtonVOLabel={
                    content[4]?.cancelLabelVoiceover?.value
                }
            />
        </>
    )
}

export default GoalDetailsA
