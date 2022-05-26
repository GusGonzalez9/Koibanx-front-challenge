import { simulateFetching } from "../utils/simulateFetching"

export const convertService = {
    getRate: (from, to) => {
        //axios.get('/rate?from='usd'&to='btc'')   
        return simulateFetching.getRate(from, to)
    },
    convert: (from, to, amount) => {
        //axios.post(/localConvert , {from,to,amount})
       return simulateFetching.convert(from, to, amount)
    },
    postConvert:(from,to,amount)=>{
        //return axios.post('/convert',{from,to,amount})
        return simulateFetching.postConvert(from, to, amount)
    }
}