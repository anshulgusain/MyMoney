import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function Transaction() {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {   
        const fetchTransactions = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/account/transactions", {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            setTransactions(response.data.transactions)
            // console.log(response)
        }

        fetchTransactions()
    },[transactions])   

  return (
    <div className='flex' >
        <Navbar/>
        <div className='flex  flex-col  w-10/12  '>
        <div className=' font-bold text-[rgb(66,94,189)] text-5xl mb-10 mt-10 flex justify-center'>Transactions</div>
    <div className='overflow-y-auto h-[80vh] '>
{
  transactions.map((transaction) => (
    <div className=' ' key={transaction._id}>    
        
    <Table key={transaction._id} transaction={transaction} />   

    </div>
    ))
  
}
</div>
</div>
                     
    </div>
  )
}




export default Transaction



function Table({transaction}) {
    

    return <div className="w-9/12 p-4 m-0 flex justify-center align-center ">
    <div className="bg-white rounded-2xl shadow-lg p-3  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-xl transition duration-300 ">
      
    
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="h-14 w-20 rounded-full bg-blue-100 text-blue-600 font-bold text-xl flex items-center justify-center">
          {transaction.toAccount[0]?.toUpperCase()}
        </div>
        <div className="text-lg font-medium text-gray-800 break-all">
          {transaction.toAccount}
        </div>
      </div>
  
      <div className="text-green-600 text-xl font-bold text-center sm:text-right">
        ₹ {transaction.amount}
      </div>
  
   
      <div className="text-sm text-gray-500 text-center sm:text-right">
        {new Date(transaction.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </div>
    </div>
  </div>
  
  
}
