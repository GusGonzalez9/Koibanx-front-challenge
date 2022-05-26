

export const transactionService = {
    getAll: () => {
        return {
            "page": 1,
            "pages": 10,
            "limit": 10,
            "total": 100,
            "results": [
                {
                    "id": "01",
                    "currency": "usdc",
                    "date": "2022/04/11 16:44:10",
                    "amount": 100,
                    "status": "Pendiente",
                    "type": "Depósito"
                },
                {
                    "id": "01",
                    "currency": "btc",
                    "date": "2022/04/11 16:44:10",
                    "amount": 0.00035,
                    "status": "Completada",
                    "type": "Depósito"
                },
                {
                    "id": "01",
                    "currency": "usdc",
                    "date": "2022/04/11 16:44:10",
                    "amount": 100,
                    "status": "Pendiente",
                    "type": "Depósito"
                },
                {
                    "id": "01",
                    "currency": "algo",
                    "date": "2022/04/11 16:44:10",
                    "amount": 1000,
                    "status": "Completada",
                    "type": "Depósito"
                }, 
            ]
        }
    }
}