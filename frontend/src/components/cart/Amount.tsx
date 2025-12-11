import React from 'react'
import { formatCurrency } from '../../utils/utils';

export const Amount=({label,amount,discount}: {label: string,amount:number,discount?:boolean}) =>{
  return (
    <div className={`${discount && 'bg-green-300 text-green-900'} flex justify-between p-1`}>
        <dt className='font-bold'>
        {label}
        </dt>
        <dd className='text-gray-900'>
        {discount && '-'} {formatCurrency(amount)}
        </dd>
        </div>
  )
}
