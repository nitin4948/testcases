import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
    cleanup,
    render,
    screen,
    fireEvent
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClientContext } from 'graphql-hooks'
import * as hooks from 'graphql-hooks'
import GoalDetailsA from './GoalDetailsA'
import { Store } from '../../../utils'
import { endpoints } from '../../../../config/connections'
import {
    goalDetailsAIMock,
    goalDetailsSavingsMock,
    draftGoalsMock
} from './GoalDetailsAMock'

const reactMock = require('react')

const setHookState = (newState) =>
    jest.fn().mockImplementation(() => [newState, () => {}])

const { apiGee: graphqlPath, routingKey } = endpoints
const AccessToken =
    (typeof window !== 'undefined' &&
        sessionStorage.getItem('AccessToken')) ||
    sessionStorage.getItem('oAuthtoken') ||
    null

const client = {
    url: `${graphqlPath}`,
    headers: {
        routingKey,
        'Service-Version': '2',
        authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/json'
    }
}

const component = () => (
    <ClientContext.Provider value={client}>
        <Store>
            <GoalDetailsA />
        </Store>
    </ClientContext.Provider>
)

jest.spyOn(hooks, 'useManualQuery').mockImplementation(() => [
    jest.fn(() => Promise.resolve(draftGoalsMock)),
    {},
    jest.fn()
])
jest.spyOn(hooks, 'useMutation').mockImplementation(() => [
    jest.fn(() => Promise.resolve({})),
    {},
    jest.fn()
])
describe('Goal Details Page A Auto Invest flow', () => {
    global.sessionStorage.setItem(
        'flowIdentifier',
        'investOnboarding'
    )
    reactMock.useState = setHookState(goalDetailsAIMock)
    it('renders successfully', () => {
        global.sessionStorage.setItem('goalTypeCode', 'PASSION')
        render(component())
        expect(
            screen.getByText(
                `Let's get started with a few details about your goal.`
            )
        ).toBeInTheDocument()
        expect(screen.getByText('Goal name')).toBeInTheDocument()
        expect(
            screen.getByText('Goal target amount')
        ).toBeInTheDocument()
        expect(
            screen.getByText('Goal date mm/yyyy')
        ).toBeInTheDocument()
    })
    it('should throw errors if continue button is clicked for empty inputs', () => {
        global.sessionStorage.setItem('goalTypeCode', 'PASSION')
        render(component())
        fireEvent.click(
            window.document.querySelector('#goalDetailA-continue')
        )
        expect(
            screen.getByText(
                'Please enter an amount of $1,000 or more.'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByText('Please enter a goal date.')
        ).toBeInTheDocument()
    })
    it('goal name field should throw error if 2 to 32 character limit is not met', () => {
        render(component())
        userEvent.type(
            window.document.querySelector('.goalName_input input'),
            'a'
        )
        fireEvent.click(
            window.document.querySelector('#goalDetailA-continue')
        )
        expect(
            screen.getByText(
                '2 to 32 character limit. Your goal name does not affect your investments.'
            )
        ).toBeInTheDocument()
    })
    it('goal date field should throw error if invalid value entered', () => {
        global.sessionStorage.setItem('goalTypeCode', 'BUY_CAR')
        render(component())
        userEvent.type(
            window.document.querySelector('.date_input input'),
            '132029'
        )
        fireEvent.click(
            window.document.querySelector('#goalDetailA-continue')
        )
        expect(
            screen.getByText('Please enter a goal date.')
        ).toBeInTheDocument()
    })
    it.skip('goal date field should throw error if date is less than 2 years from now', () => {
        global.sessionStorage.setItem('goalTypeCode', 'BUY_CAR')
        render(component())
        userEvent.type(
            window.document.querySelector('.date_input input'),
            '112022'
        )
        fireEvent.blur(
            window.document.querySelector('#goalDetailA-continue')
        )
        expect(
            screen.getByText(
                'Goal date must be at least 2 years from now.'
            )
        ).toBeInTheDocument()
    })
    it.skip('goal date field should throw error if date is greater than 50 years from now', () => {
        global.sessionStorage.setItem('goalTypeCode', 'BUY_CAR')
        render(component())
        userEvent.type(
            window.document.querySelector('.date_input input'),
            '112099'
        )
        fireEvent.click(
            window.document.querySelector('#goalDetailA-continue')
        )
        expect(
            screen.getByText(
                'Goal date cannot exceed 50 years from now.'
            )
        ).toBeInTheDocument()
    })
})

// describe('Goal Details Page A Savings flow', () => {
//     global.sessionStorage.setItem('flowIdentifier', 'savings')
//     reactMock.useState = setHookState(goalDetailsSavingsMock)
//     it('renders successfully', () => {
//         global.sessionStorage.setItem('goalTypeCode', 'PASSION')
//         render(component())
//         expect(
//             screen.getByText(
//                 `Let's get started with a few details about your goal.`
//             )
//         ).toBeInTheDocument()
//         expect(
//             screen.getByText('Goal name (optional)')
//         ).toBeInTheDocument()
//         expect(
//             screen.getByText('Goal target amount')
//         ).toBeInTheDocument()
//         expect(screen.getByText('Goal date')).toBeInTheDocument()
//     })
//     it('should throw errors if continue button is clicked for empty inputs', () => {
//         global.sessionStorage.setItem('goalTypeCode', 'PASSION')
//         render(component())
//         fireEvent.click(
//             window.document.querySelector('#goalDetailA-continue')
//         )
//         expect(
//             screen.getByText(
//                 'Please enter an amount greater than $1.'
//             )
//         ).toBeInTheDocument()
//         expect(
//             screen.getByText('Please enter a goal date.')
//         ).toBeInTheDocument()
//     })
// })
