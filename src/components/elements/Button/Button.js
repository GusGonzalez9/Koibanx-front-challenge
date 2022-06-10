import styles from './Button.module.css'

const Button = ({ title, onClick, text, icon, className, disabled }) => {
    return (
        <button disabled={disabled} title={title} className={`${styles['button-container']} ${!!className ?styles[className]: ''} ${disabled && styles['button-container-disabled']}`} onClick={onClick}>{text}</button>
    )
}
export default Button