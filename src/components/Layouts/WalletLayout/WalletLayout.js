import Table from '../../elements/Table/Table'
import styles from './WalletLayout.module.css'
import { useEffect, useState } from 'react';
import { balanceService } from '../../../service/balanceService';
import { transactionService } from '../../../service/transactionsService';
import BalanceHeader from '../../modules/balanceHeader/balanceHeader';

const WalletLayout = () => {
    const [hide, setHide] = useState(false)
    const [amount, setAmount] = useState(0)
    const [balances, setBalances] = useState(null)
    const [transactionsResults, setTransactionsResults] = useState([])
    const [counter, setCounter] = useState(15)

    const Columns = ['Moneda', 'Fecha y hora', 'Cantidad', 'Blockchain record', 'Estado', 'Tipo']

    useEffect(() => {
        let timer = setTimeout(() => {
            if (counter > 0) return setCounter(prevState => prevState - 1)
            const balance = balanceService.getResume();
            setAmount(balance)
            setCounter(15)
        }, 1000)
        return (() => clearTimeout(timer))
    })

    useEffect(() => {
        handleBalance()
    }, [])

    const onHideBalance = () => {
        localStorage.setItem('hide', !hide)
        setHide(!hide)
    }

    const handleBalance = () => {
        const hide = localStorage.getItem('hide') === 'true'
        const balance = balanceService.getResume();
        const balances = balanceService.getBalances()
        const transactionsResponse = transactionService.getAll()
        setHide(hide)
        setAmount(balance)
        setBalances(balances)
        setTransactionsResults(transactionsResponse.results)
    }

    return (
        <div className={styles.container}>
            <BalanceHeader amount={amount} hide={hide} onHideBalance={onHideBalance} balances={balances} />
            <div className={styles.tableContainer}>
                <Table items={transactionsResults} title='Transacciones recientes' columns={Columns} />
            </div>
        </div>
    )
}

export default WalletLayout