import { simulateFetching } from "../utils/simulateFetching"


export const balanceService = {
    getResume: () => {
        return simulateFetching.getResumeInUsd()
    },
    getBalanceByCurrency: (currency) => {
        const response = simulateFetching.getBalanceByCurrency(currency)
        return response[0]
    },
    getBalances: () => {
        return simulateFetching.getBalances()
    }
}