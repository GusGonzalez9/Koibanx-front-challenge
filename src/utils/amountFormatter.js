
export const formatAmount = (amount)=>{
  return amount.toString().split('.')[0]
}

export const formatPennie = (amount)=>{
    return amount.toFixed(2).toString().split('.')[1]
}
