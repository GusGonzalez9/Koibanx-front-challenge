import React, { useEffect, useState } from 'react';
import Button from '../../elements/Button/Button';
import CurrencyBalance from '../../elements/CurrencyBalance/CurrencyBalance';
import SuccessModal from '../../elements/SuccessModal/SuccessModal';
import './ConvertLayout.css';
import { BiTransfer } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { currencyOptions } from '../../../utils/currencyConstants';
import { balanceService } from '../../../service/balanceService';
import { convertService } from '../../../service/convertService';
import { textMapper } from '../../../utils/textMapper';

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

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000)
        } else {
            getRate();
            setCounter(15)
        }
    }, [counter])


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
        <div className='convertLayout-container'>
            <p className='convert-title'>Convierta la cantidad que desee en una moneda diferente.</p>
            <div className='currencybalance-container'>
                <div className='label-container'>
                    <p className='p-label-title'>Desde</p>
                    <p className='p-label'>Disponible en la billetera <strong>{availableAmount}</strong></p>
                </div>
                <CurrencyBalance error={error} currency={principalCurrency} onChangeAmount={onChangeAmountToConvert} onChangeCurrency={onChangeCurrency} maxBalanceAction={maxBalanceAction} amount={amountToConvert} options={currencyOptions} />
            </div>

            <div className='icon-container'>
                <div className='icon-box'><button className='icon-button' onClick={onSwap} > <BiTransfer className='icon-convert' style={{ transform: [{ rotateY: '90deg' }] }} size={35} color='#4E4E4E' /></button></div>
            </div>

            <div className='currencybalance-container'>
                <div className='label-container'>
                    <p className='p-label-title'>Para</p>
                </div>
                <CurrencyBalance onChangeCurrency={onChangeSecondaryCurrency} currency={secondaryCurrency} amount={convertAmount} options={currencyOptions} />
                <div className='price-container'>
                    <p>Precio</p>
                    <p>1 {textMapper[principalCurrency]} = {rate} {textMapper[secondaryCurrency]} </p>
                </div>
            </div>
            <div className='convert-timer'>
                <p><BsArrowRight size={20} style={{ marginRight: 10 }} /> La cotizacion se actualizará en {counter} segundos</p>
            </div>
            <div className='button-container-convert'>
                <Button text={"Volver"} url='/' redirect className='button-container-secondary' />
                <Button text={"Convertir"} disabled={!!error} onClick={onSubmit} />
            </div>
            <SuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)} />
        </div>
    )
}

export default ConvertLayout;
