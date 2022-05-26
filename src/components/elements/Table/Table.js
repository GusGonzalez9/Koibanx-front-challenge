import { textMapper } from '../../../utils/textMapper'
import styles from './Table.module.css'
import algo from '../../../assets/algo-logo.png'
import btc from '../../../assets/btc-logo.png'
import usdc from '../../../assets/usdc-Logo.png'

const generateLogo = (logo) => {
    switch (logo) {
        case ('btc'):
            return btc;
        case ('usdc'):
            return usdc;
        case ('algo'):
            return algo
        default:
    }
}

const Table = ({ items, columns }) => {
    return (
        <div>
            <div className={styles.tableTitles}>
                <p className={styles.title}>Transacciones recientes</p>
                <p className={styles.showAllAction}>Ver todas</p>
            </div>
            <table className={styles.tableContainer}>
                <thead className={styles.tableHeader}>
                    <tr className={styles.firstRow}>
                        {columns.map(c => <th>{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((row) => (
                        <tr key={row.id}>
                            <td className={styles.currencyRow}> <img src={generateLogo(row.currency)} alt='currency logo' /> {textMapper[row.currency]}</td>
                            <td>{row.date}</td>
                            <td>{row.amount}</td>
                            <td className={styles.showTransactionRow}>Ver Transacción</td>
                            <td>{row.status}</td>
                            <td>{row.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Table  