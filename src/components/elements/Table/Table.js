import { generateLogo } from '../../../utils/generateLogo'
import { textMapper } from '../../../utils/textMapper'
import styles from './Table.module.css'

const Table = ({ items, columns,title }) => {
    return (
        <div>
            <section className={styles.tableTitles}>
                <h1 className={styles.title}>{title}</h1>
                <button className={styles.showAllAction}>Ver todas</button>
            </section>
            <table className={styles.tableContainer}>
                <thead className={styles.tableHeader}>
                    <tr className={styles.firstRow}>
                        {columns.map((c,index) => <th key={index} id={index}>{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((row,index) => (
                        <tr key={row.id}>
                            <td headers={index} className={styles.currencyRow}> <img src={generateLogo(row.currency)} alt='currency logo' /> {textMapper[row.currency]}</td>
                            <td headers={index}>{row.date}</td>
                            <td headers={index}>{row.amount}</td>
                            <td headers={index} className={styles.showTransactionRow}>Ver Transacción</td>
                            <td headers={index}>{row.status}</td>
                            <td headers={index}>{row.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Table  