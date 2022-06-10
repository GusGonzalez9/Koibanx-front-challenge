import React, { useEffect, useState } from 'react';
import Button from '../../elements/Button/Button';
import CurrencyBalance from '../../elements/CurrencyBalance/CurrencyBalance';
import SuccessModal from '../../elements/SuccessModal/SuccessModal';
import { BiTransfer } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { currencyOptions } from '../../../utils/currencyConstants';
import { balanceService } from '../../../service/balanceService';
import { convertService } from '../../../service/convertService';
import { textMapper } from '../../../utils/textMapper';
import { useNavigate } from 'react-router-dom';
import styles from './ConvertLayout.module.css'
const ConvertLayout = () => {
    const [successVisible, setSuccessVisible] = useState(false);
    const [counter, setCounter] = useState(15);
    const [rate, setRate] = useState(0)
    const [amountToConvert, setAmountToConvert] = useState();
    const [convertAmount, setConvertAmount] = useState()
    const [principalCurrency, setPrincipalCurrency] = useState('usdc');
    const [secondaryCurrency, setSecondaryCurrency] = useState('btc');
    const [availableAmount, setAvailableAmount] = useState()
    const [error, setError] = useState()
    const [availableGetPrice, setAvailableGetPrice] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        let timer = setTimeout(() => {
            if (counter > 0) { return setCounter(counter - 1) } else {
                setAvailableGetPrice(true)
            }
        }, 1000)
        return (() => clearTimeout(timer))
    })


    useEffect(() => {
        setBalanceResume()
        getRate()
    }, [principalCurrency])

    const setBalanceResume = () => {
        const resume = balanceService.getBalanceByCurrency(principalCurrency)
        setAvailableAmount(resume.total)
    }

    const getRate = () => {
        const rate = convertService.getRate(principalCurrency, secondaryCurrency)
        setRate(rate)
    }

    const handlerGetRate = ()=>{
        getRate()
        setCounter(15)
        setAvailableGetPrice(false)
    }

    const onChangeCurrency = (event) => {
        setPrincipalCurrency(event.target.value)
        setAmountToConvert(0)
        setConvertAmount(0)
    }

    const onChangeSecondaryCurrency = (event) => {
        setSecondaryCurrency(event.target.value)
        const amountConverted = convertService.convert(principalCurrency, event.target.value, amountToConvert)
        setConvertAmount(amountConverted)
    }


    const onChangeAmountToConvert = (event) => {
        setAmountToConvert(event.target.value)
        const amountConverted = convertService.convert(principalCurrency, secondaryCurrency, event.target.value)
        setConvertAmount(amountConverted)

        if (event.target.value > availableAmount) {
            setError('Saldo insuficiente')
        } else {
            setError()
        }
    }


    const maxBalanceAction = () => {
        setAmountToConvert(availableAmount)
        const amountConverted = convertService.convert(principalCurrency, secondaryCurrency, availableAmount)
        setConvertAmount(amountConverted)
    }


    const onSwap = () => {
        const currency = principalCurrency
        const amount = amountToConvert
        setPrincipalCurrency(secondaryCurrency)
        setSecondaryCurrency(currency)
        setAmountToConvert(convertAmount)
        setConvertAmount(amount)

    }

    const onSubmit = () => {
        convertService.postConvert(principalCurrency, secondaryCurrency, amountToConvert)
        setSuccessVisible(true)
    }

    return (
        <div className={styles.convertLayoutContainer}>
            <p className={styles.convertTitle}>Convierta la cantidad que desee en una moneda diferente.</p>
            <div className={styles.currencyBalanceContainer}>
                <div className={styles.labelContainer}>
                    <p className={styles['p-label-title']}>Desde</p>
                    <p className={styles['p-label']}>Disponible en la billetera <strong>{availableAmount}</strong></p>
                </div>
                <CurrencyBalance error={error} currency={principalCurrency} onChangeAmount={onChangeAmountToConvert} onChangeCurrency={onChangeCurrency} maxBalanceAction={maxBalanceAction} amount={amountToConvert} options={currencyOptions} />
            </div>

            <div className={styles['icon-container']}>
                <div className={styles['icon-box']}><button className={styles['icon-button']} onClick={onSwap} > <BiTransfer className={styles['icon-convert']} style={{ transform: [{ rotateY: '90deg' }] }} size={35} color='#4E4E4E' /></button></div>
            </div>

            <div className='currencybalance-container'>
                <div className='label-container'>
                    <p className={styles['p-label-title']}>Para</p>
                </div>
                <CurrencyBalance onChangeCurrency={onChangeSecondaryCurrency} currency={secondaryCurrency} amount={convertAmount} options={currencyOptions} />
                <div className={styles['price-container']}>
                    <p>Precio</p>
                    <p>1 {textMapper[principalCurrency]} = {rate} {textMapper[secondaryCurrency]} </p>
                </div>
            </div>
            <div className={styles['convert-timer']}>
                <p><BsArrowRight size={20} style={{ marginRight: 10 }} /> La cotizacion se actualizará en {counter} segundos</p>
                <Button text={"Solicitar cotización"} onClick={() => handlerGetRate()} disabled={!availableGetPrice}/>
            </div>
            <div className={styles['button-container-convert']}>
                <Button text={"Volver"} onClick={() => history.push('/')} className='button-container-secondary' />
                <Button text={"Convertir"} disabled={!!error} onClick={onSubmit} />
            </div>
            <SuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)} />
        </div>
    )
}

export default ConvertLayout;
