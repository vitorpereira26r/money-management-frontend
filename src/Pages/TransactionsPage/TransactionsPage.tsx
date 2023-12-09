import React from 'react'
import { UserTransactions } from '../../components/UserTransactions/UserTransactions'
import { Navbar } from '../../components/Navbar/Navbar'

export const TransactionsPage:React.FC = () => {
  return (
    <>
      <Navbar/>
      <UserTransactions/>
    </>
  )
}
