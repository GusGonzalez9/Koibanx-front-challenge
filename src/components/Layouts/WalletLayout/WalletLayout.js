import CurrencyCard from '../../elements/CurrencyCard/CurrencyCard'
import Table from '../../elements/Table/Table'
import styles from './WalletLayout.module.css'
import { AiOutlineEye } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { balanceService } from '../../../service/balanceService';
import { transactionService } from '../../../service/transactionsService';

const WalletLayout = () => {

    const [hide, setHide] = useState(false)
    const [amount, setAmount] = useState(0)
    const [balances, setBalances] = useState()
    const [transactionsResults, setTransactionsResults] = useState([])
    const [counter,setCounter] = useState(15)
    const onHideBalance = () => {
        localStorage.setItem('hide', !hide)
        setHide(!hide)
    }

    useEffect(() => {
        const hide = localStorage.getItem('hide') === 'true'
        const balance = balanceService.getResume();
        const balances = balanceService.getBalances()
        const transactionsResponse = transactionService.getAll()
        setHide(hide)
        setAmount(balance)
        setBalances(balances)
        setTransactionsResults(transactionsResponse.results)
    }, [])

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000)
        } else {
            const balance = balanceService.getResume();
            setAmount(balance)
            setCounter(15)
        }
    }, [counter])

    const columns = ['Moneda', 'Fecha y hora', 'Cantidad', 'Blockchain record', 'Estado', 'Tipo']

    return (
        <div className={styles.container}>
            <div className={styles.balanceContainer}>
                <div>
                    <p className={styles.balanceTitle}>Balance total</p>
                    <div className={styles.balanceAmountContainer}>
                        <p className={styles.balanceAmount}>{hide ? '********' : `${amount.toString().split('.')[0]}`}</p>
                        {!hide && <p className={styles.balanceAmountCentavos}>.{amount.toFixed(2).toString().split('.')[1]}</p>}
                        <p className={styles.balanceCurrency}>USD</p>
                    </div>
                    <button className={styles.balanceHideButton} onClick={onHideBalance}>
                        <p>Haz click para {!hide ? 'ocultar' : 'mostrar'}</p>
                        <AiOutlineEye size={15} />
                    </button>
                </div>
                <CurrencyCard currency={'usdc'} amount={balances && balances[0].total} />
                <CurrencyCard currency={'btc'} amount={balances && balances[1].total} />
                <CurrencyCard currency={'algo'} amount={balances && balances[2].total} />
            </div>
            <div className={styles.tableContainer}>
                <Table items={transactionsResults} columns={columns} />
            </div>
        </div>
    )
}

export default WalletLayout