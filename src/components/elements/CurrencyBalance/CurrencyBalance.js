import './CurrencyBalance.css'

const CurrencyBalance = ({ currency, amount, options, onChangeAmount, onChangeCurrency, maxBalanceAction, error }) => {
    return (
        <div className="currency-container">
            <div style={{ display: 'flex',flexDirection:'column',justifyContent:'center',width:'100%',position:'relative' }}>
                <input type="number" className='currency-input' value={amount} onChange={onChangeAmount} />
                {error ? <label className='input-error'>{error}</label> : null}
            </div>
            <div className='select-container-maxbutton'>
                <button title='Utilizar todo el saldo disponible' onClick={maxBalanceAction} className='button'>MAX</button>
                <select className='currency-select' value={currency} onChange={onChangeCurrency}>
                    {options && options.map(currency => <option key={currency.value} value={currency.value}>{currency.label}</option>
                    )}
                </select>
            </div>
        </div>
    )
}

export default CurrencyBalance