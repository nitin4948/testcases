export const goalDetailsSavingsMock = [
    {
        pageTitle: {
            value: 'Set a goal',
            title: 'Page Title',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        heroImage: {
            title: 'Hero Image',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        ltpHeroImageVoiceover: {
            title: 'Hero Image Alt Text',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        pageHeader: {
            value:
                "Let's get started with a few details about your goal.",
            title: 'Page Header',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        description: {
            title: 'Description',
            dataType: 'string',
            ':type': 'text/plain',
            multiValue: false
        },
        menuInfo: {
            title: 'Menu Info',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        }
    },
    {
        goalTypeCode: {
            title: 'Goal Type Code',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalName: {
            value: [
                'Build an emergency fund',
                'Buy a car',
                'Buy a home',
                'Travel',
                'Celebrate a big event',
                'Grow my family',
                'Buy an investment property',
                'Pursue a passion',
                'Remodel my home',
                'Save for education',
                'Start or grow my business',
                'Prepare for retirement ',
                'Grow my money',
                'Save or invest for something big',
                'Other'
            ],
            title: 'Goal Name',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalNameAltWealth: {
            title: 'Goal Name Alt Wealth',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalDescription: {
            title: 'Goal Description',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalImage: {
            title: 'Goal Image',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    },
    {
        goalLabel: {
            value: [
                'EMGNCY_FUND',
                'BUY_CAR',
                'BUY_HOME',
                'TRAVEL',
                'CELEB_EVNT',
                'GROW_FAMILY',
                'INVST_PRPTY',
                'PASSION',
                'REMODL_HOME',
                'PLAN_EDU',
                'STRT_BUSNS',
                'RETIRE',
                'GROW_MONEY',
                'SOMETHING_BIG',
                'OTH'
            ],
            title: 'Goal Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        dynamicImage: {
            value: [
                '/content/dam/content/visual-assets/illustrations/personal/illus-piggy-bank-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-car-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-house-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-airplane-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-celebration-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-baby-carriage-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-investment-property-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-heart-in-hand-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-house-remodel-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-graduation-cap-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-idea-lightbulb-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-retire-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-grow-money-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-trophy-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-trophy-banner.svg'
            ],
            title: 'Dynamic Image',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    },
    {
        fieldLabel: {
            value: [
                'Goal name (optional)',
                'Goal target amount',
                'Goal date'
            ],
            title: 'Field Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        fieldHelperText: {
            value: [
                '2 to 32 character limit.',
                '',
                'Estimated mm/yyyy'
            ],
            title: 'Field Helper Text',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        AnsOptions: {
            title: 'Answer Options',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        errorMessage: {
            value: [
                'Please enter a goal name between 2 and 32 characters.',
                'Please enter an amount greater than $1.',
                'Please enter a goal date.'
            ],
            title: 'Error Message',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    },
    {
        navigationHeading: {
            title: 'Navigation Heading',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        continueLabel: {
            value: 'Continue',
            title: 'Continue Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        continueLabelVoiceover: {
            value: 'Continue',
            title: 'Continue Label Voiceover',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        cancelLabel: {
            value: 'Cancel',
            title: 'Cancel Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        cancelLabelVoiceover: {
            value: 'Cancel',
            title: 'Cancel Label Voiceover',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        customLabel: {
            title: 'Custom Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        customLabelVoiceover: {
            title: 'Custom Label Voiceover',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    }
]

export const goalDetailsAIMock = [
    {
        pageTitle: {
            value: 'Automated Investor',
            title: 'Page Title',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        heroImage: {
            title: 'Hero Image',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        pageHeader: {
            value:
                "Let's get started with a few details about your goal.",
            title: 'Page Header',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        description: {
            title: 'Description',
            dataType: 'string',
            ':type': 'text/html',
            multiValue: false
        },
        menuInfo: {
            title: 'Menu Info',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        }
    },
    {
        goalTypeCode: {
            title: 'Goal Type Code',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalName: {
            value: [
                'Build an emergency fund',
                'Buy a car',
                'Buy a home',
                'Travel',
                'Celebrate a big event',
                'Grow my family',
                'Buy an investment property',
                'Pursue a passion',
                'Remodel my home',
                'Save for education',
                'Start or grow my business',
                'Prepare for retirement ',
                'Grow my money',
                'Save or invest for something big',
                'Other'
            ],
            title: 'Goal Name',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalNameAltWealth: {
            title: 'Goal Name Alt Wealth',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalDescription: {
            title: 'Goal Description',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        goalImage: {
            title: 'Goal Image',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    },
    {
        goalLabel: {
            value: [
                'EMGNCY_FUND',
                'BUY_CAR',
                'BUY_HOME',
                'TRAVEL',
                'CELEB_EVNT',
                'GROW_FAMILY',
                'INVST_PRPTY',
                'PASSION',
                'REMODL_HOME',
                'PLAN_EDU',
                'STRT_BUSNS',
                'RETIRE',
                'GROW_MONEY',
                'SOMETHING_BIG',
                'OTH'
            ],
            title: 'Goal Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        dynamicImage: {
            value: [
                '/content/dam/content/visual-assets/illustrations/personal/illus-piggy-bank-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-car-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-house-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-airplane-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-celebration-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-baby-carriage-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-investment-property-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-heart-in-hand-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-house-remodel-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-graduation-cap-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-idea-lightbulb-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-retire-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-grow-money-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-trophy-banner.svg',
                '/content/dam/content/visual-assets/illustrations/personal/illus-trophy-banner.svg'
            ],
            title: 'Dynamic Image',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    },
    {
        fieldLabel: {
            value: [
                'Goal name',
                'Goal target amount',
                'Goal date mm/yyyy'
            ],
            title: 'Field Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        fieldHelperText: {
            value: [
                'Optional',
                'Minimum $1,000',
                'Minimum two years from now'
            ],
            title: 'Field Helper Text',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        AnsOptions: {
            title: 'Answer Options',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        errorMessage: {
            value: [
                '2 to 32 character limit. Your goal name does not affect your investments.',
                'Please enter an amount of $1,000 or more.',
                'Please enter a goal date.',
                'Goal date must be at least 2 years from now.',
                'Goal date cannot exceed 50 years from now.'
            ],
            title: 'Error Message',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    },
    {
        navigationHeading: {
            title: 'Navigation Heading',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        continueLabel: {
            value: 'Continue',
            title: 'Continue Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        continueLabelVoiceover: {
            value: 'Continue',
            title: 'Continue Label Voiceover',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        cancelLabel: {
            value: 'Cancel',
            title: 'Cancel Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        cancelLabelVoiceover: {
            value: 'Cancel',
            title: 'Cancel Label Voiceover',
            dataType: 'string',
            ':type': 'string',
            multiValue: false
        },
        customLabel: {
            value: ['Back'],
            title: 'Custom Label',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        },
        customLabelVoiceover: {
            value: ['Back'],
            title: 'Custom Label Voiceover',
            dataType: 'string',
            ':type': 'string',
            multiValue: true
        }
    }
]

export const draftGoalsMock = {
    data: {
        financialGoals: [
            {
                goalGuid: '780b3204-4046-4ba8-b51e-31d44c750543',
                goalStatusCode: 'Draft',
                goalAmount: null,
                goalTargetDate: null,
                customGoalNameTypeText: null,
                goalTypeCode: 'EMGNCY_FUND'
            },
            {
                goalGuid: 'bccc6848-2732-489f-8713-17de80fe72e4',
                goalStatusCode: 'Draft',
                goalAmount: '7665',
                goalTargetDate: '2026-07-01',
                customGoalNameTypeText: 'Pursue a passion',
                goalTypeCode: 'PASSION'
            },
            {
                goalGuid: 'd4c9f891-6ed9-48cb-88e2-be592c9e1f2f',
                goalStatusCode: 'Draft',
                goalAmount: null,
                goalTargetDate: null,
                customGoalNameTypeText: null,
                goalTypeCode: 'CELEB_EVENT'
            },
            {
                goalGuid: 'd6beec0a-01ae-40f1-8c90-5c1793cc49f3',
                goalStatusCode: 'Draft',
                goalAmount: null,
                goalTargetDate: null,
                customGoalNameTypeText: null,
                goalTypeCode: 'REMODL_HOME'
            }
        ]
    }
}
