import { AiOutlineEye } from 'react-icons/ai'
import { formatAmount, formatPennie } from '../../../utils/amountFormatter'
import CurrencyCard from '../../elements/CurrencyCard/CurrencyCard'
import styles from './balanceHeader.module.css'


const BalanceHeader = ({ hide, balances, onHideBalance, amount }) => {
   balances && console.log(balances)
    return (
        <section className={styles.balanceContainer}>
            <h1 className={styles.balanceTitle}>Balance total</h1>
            <div className={styles.balanceAmountContainer}>
                <p className={styles.balanceAmount}>{hide ? '********' : formatAmount(amount)}</p>
                {!hide && <p className={styles.balanceAmountCentavos}>.{formatPennie(amount)}</p>}
                <p className={styles.balanceCurrency}>USD</p>
            </div>
            <button className={styles.balanceHideButton} onClick={onHideBalance}>
                <p>Haz click para {!hide ? 'ocultar' : 'mostrar'}</p>
                <AiOutlineEye size={15} />
            </button>
            {balances && balances.length && balances.map((b, index) => <CurrencyCard {...b} key={index} />
            )}
        </section>
    )
}

export default BalanceHeader