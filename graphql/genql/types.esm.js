export default {
    "scalars": [
        1,
        2,
        3,
        5,
        7
    ],
    "types": {
        "Account": {
            "accountId": [
                1
            ],
            "active": [
                2
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "Boolean": {},
        "AmountDir": {},
        "Budget": {
            "amount": [
                5
            ],
            "categoryId": [
                1
            ],
            "date": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "Event": {
            "data": [
                7
            ],
            "id": [
                1
            ],
            "sequence": [
                5
            ],
            "timestamp": [
                1
            ],
            "version": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "JSON": {},
        "Mutation": {
            "addTransaction": [
                10,
                {
                    "accountId": [
                        1,
                        "String!"
                    ],
                    "amount": [
                        5,
                        "Int!"
                    ],
                    "amountDir": [
                        3,
                        "AmountDir!"
                    ],
                    "categoryId": [
                        1
                    ],
                    "currency": [
                        1,
                        "String!"
                    ],
                    "txId": [
                        1
                    ],
                    "txInformation": [
                        1
                    ],
                    "txReference": [
                        1
                    ]
                }
            ],
            "closeAccount": [
                0,
                {
                    "accountId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createAccount": [
                0,
                {
                    "name": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createUser": [
                11,
                {
                    "authId": [
                        1,
                        "String!"
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "familyName": [
                        1,
                        "String!"
                    ],
                    "givenName": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateAccount": [
                0,
                {
                    "accountId": [
                        1,
                        "String!"
                    ],
                    "name": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateUser": [
                11,
                {
                    "email": [
                        1
                    ],
                    "familyName": [
                        1
                    ],
                    "givenName": [
                        1
                    ]
                }
            ],
            "upsertBudget": [
                4,
                {
                    "amount": [
                        5,
                        "Int!"
                    ],
                    "categoryId": [
                        1,
                        "String!"
                    ],
                    "date": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "accounts": [
                0
            ],
            "budget": [
                4,
                {
                    "date": [
                        1,
                        "String!"
                    ]
                }
            ],
            "events": [
                6
            ],
            "transactions": [
                10,
                {
                    "accountId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "user": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "Transaction": {
            "accountId": [
                1
            ],
            "amount": [
                5
            ],
            "amountDir": [
                3
            ],
            "categoryId": [
                1
            ],
            "currency": [
                1
            ],
            "txId": [
                1
            ],
            "txInformation": [
                1
            ],
            "txReference": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "email": [
                1
            ],
            "familyName": [
                1
            ],
            "givenName": [
                1
            ],
            "__typename": [
                1
            ]
        }
    }
}