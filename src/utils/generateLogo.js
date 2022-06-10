import algo from '../assets/algo-logo.png'
import btc from '../assets/btc-logo.png'
import usdc from '../assets/usdc-Logo.png'

export const generateLogo = (logo) => {
    if(logo ==='btc'){
        return btc
    }else if(logo==='usdc'){
        return usdc 
    }else if (logo ==='algo'){
        return algo 
    }
}