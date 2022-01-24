const accountTypeChecker = (accountBalanceHistory) => {
    let isAmountDifferenceSame = true;
    if (accountBalanceHistory && accountBalanceHistory instanceof Array && accountBalanceHistory.length > 1) {
        // sort months in descending order
        accountBalanceHistory.sort(function (a, b) { return a.account.balance.amount - b.account.balance.amount });
        //remove duplicate
        let filterdAccountBalanceHistory = []
        for (let [ index, item ] of accountBalanceHistory.entries()) {
            if (!filterdAccountBalanceHistory.find(el => Number(el.monthNumber) == Number(item.monthNumber))) {
                filterdAccountBalanceHistory.push(item)
            } else if (index == accountBalanceHistory.length - 1) {
                filterdAccountBalanceHistory.push({ ...item, monthNumber: item.monthNumber + 1 })
            }
        }
        let differentAmount = filterdAccountBalanceHistory[ 1 ].account.balance.amount - filterdAccountBalanceHistory[ 0 ].account.balance.amount;
        // fill remaining months
        for (let i = 0; i <= filterdAccountBalanceHistory[ filterdAccountBalanceHistory.length - 1 ].monthNumber; i++) {
            if (!filterdAccountBalanceHistory.find(item => item.monthNumber == i)) {
                filterdAccountBalanceHistory.splice(i, 0, {
                    monthNumber: i, // current month
                    account: {
                        balance: { amount: filterdAccountBalanceHistory[ 0 ].account.balance.amount + differentAmount * (i) },
                    },
                })
            }
        }
        let accountBalanceHistoryLength = filterdAccountBalanceHistory.length - 1;
        // forEach can also be used but to simplify the reverse loop i used the for loop as i am assuming that array item is sort in ascendig manner by month number.
        for (let index = accountBalanceHistoryLength; index > 1; index--) {
            let diffAmount = filterdAccountBalanceHistory[ index ].account.balance.amount - filterdAccountBalanceHistory[ index - 1 ].account.balance.amount;
            if (diffAmount === differentAmount) {
                isAmountDifferenceSame = true;
            } else {
                isAmountDifferenceSame = false;
            }
            // if isAmountDifferenceSame is not false then can break the loop
            if (!isAmountDifferenceSame) {
                break;
            }
        }
    }
    return isAmountDifferenceSame ? "B" : "A";
}

const accountBalanceHistory1 = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 450 },
        },
    }
];

const accountBalanceHistory2 = [];


const accountBalanceHistory3 = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 150 },
        },
    },
    {
        monthNumber: 5, // 5 months ago
        account: {
            balance: { amount: 1400 },
        },
    },
    {
        monthNumber: 1, // 1 month ago
        account: {
            balance: { amount: 400 },
        },
    },
    {
        monthNumber: 2, // 2 months ago
        account: {
            balance: { amount: 650 },
        },
    },
    {
        monthNumber: 3, // 3 months ago
        account: {
            balance: { amount: 900 },
        },
    },
];

const accountBalanceHistory4 = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 50 },
        },
    },
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 100 },
        },
    }
];

const accountBalanceHistory5 = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 50 },
        },
    },
    {
        monthNumber: 1, // 1 month ago
        account: {
            balance: { amount: 100 },
        },
    },
    {
        monthNumber: 1, // 1 month ago
        account: {
            balance: { amount: 120 },
        },
    },
    {
        monthNumber: 2, // 2 months ago
        account: {
            balance: { amount: 150 },
        },
    },
    {
        monthNumber: 2, // 2 months ago
        account: {
            balance: { amount: 200 },
        },
    },
    {
        monthNumber: 5, // 5 months ago
        account: {
            balance: { amount: 1500 },
        },
    }
];

let accountTypeCheckerResult = accountTypeChecker(accountBalanceHistory3);

console.log('accountTypeCheckerResult', accountTypeCheckerResult);
