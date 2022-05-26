

const objectPrices = {
    usdcTobtc: 0.0000038,
    usdcToalgo: 2.474022761,
    btcTousdc: 29646.80,
    btcToalgo: 63905.5213,
    algoTobtc: 0.00001461,
    algoTousdc: 0.417762,
    usdcTousdc: 1,
    btcTobtc: 1,
    algoToalgo: 1,
}

const balanceByCurrency = [
    {
        currency: 'usdc', total: 1000
    },
    {
        currency: 'btc', total: 0.35
    },
    {
        currency: 'algo', total: 0
    }
]


const simulateGetRate = (from, to) => {
    return objectPrices[`${from}To${to}`];
}

export const simulateFetching = {
    getTransactions: () => {
        return {
            "page": 1,
            "pages": 10,
            "limit": 10,
            "total": 100,
            "results": [
                {
                    "id": "string",
                    "currency": "string",
                    "date": "string",
                    "amount": 0,
                    "status": "string",
                    "type": "string"
                }
            ]
        }
    },
    getRate: (from, to) => {
        return simulateGetRate(from, to)
    },
    convert: (from, to, amount) => {
        return simulateGetRate(from, to) * amount;
    },
    postConvert: (from, to, amount) => {
        const amountConverted = simulateGetRate(from, to) * amount
        balanceByCurrency.forEach(balance => {
            if (balance.currency === to) {
                balance.total = balance.total + amountConverted
            } else if (balance.currency === from) {
                balance.total = balance.total - amount
            }
        })
    },
    getBalanceByCurrency: (currency) => {
        console.log(currency)
        return balanceByCurrency.filter(b => b.currency === currency)
    },
    getBalances: () => {
        return balanceByCurrency
    },
    getResumeInUsd: () => {
        let total = 0;
        balanceByCurrency.forEach(balance => {
            total = total + simulateGetRate(balance.currency, 'usdc') * balance.total
        })
        return total
    }

}