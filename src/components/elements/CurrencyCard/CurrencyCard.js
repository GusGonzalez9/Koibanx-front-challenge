import { textMapper } from '../../../utils/textMapper'
import styles from './CurrencyCard.module.css'

const CurrencyCard = ({ currency, total }) => {
    return (
        <div className={`${styles.container} ${styles[`container-${currency}`]}`}>
            <p className={styles.currency}>{textMapper[currency]}</p>
            <div className={styles.amountContainer}>
                <p className={styles.amount}>{total}</p>
                <p className={styles.units}>{textMapper[currency]}</p>
            </div>
        </div>
    ) 
}

export default CurrencyCard