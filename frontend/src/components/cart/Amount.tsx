import React from 'react'
import { formatCurrency } from '../../utils/utils';

export const Amount=({label,amount}: {label: string,amount:number}) =>{
  return (
    <div className='flex justify-between'>
        <dt className='font-bold'>
        {label}
        </dt>
        <dd className='text-gray-900'>
        {formatCurrency(amount)}
        </dd>
        </div>
  )
}
