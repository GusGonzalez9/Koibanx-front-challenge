import { Link } from 'react-router-dom'
import './Button.css'

const Button = ({ title, onClick, text, icon, className, redirect, url, disabled }) => {
    return (
        redirect ?
            <Link to={url} className='button-link'> <button title={title} className={`button-container ${className}`} onClick={onClick}>{text}</button>
            </Link>
            : <button disabled={disabled} title={title} className={`button-container ${className?className:''}${disabled ? 'button-container-disabled' : ''}`} onClick={onClick}>{text}</button>

    )
}
export default Button