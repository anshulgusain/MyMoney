import { useEffect, useState } from "react"
import Navbar from "./Navbar"

 const Balance = ({ value }) => {
   
const [balance, setBalance] = useState(0)  
const [loading, setLoading] = useState(false)
const [isVisible, setIsVisible] = useState(false)   
const handleBalance = () => {
    setLoading(true)
    setTimeout(() => {
  

    setLoading(false)
    setIsVisible(true)
    }, 2000);
    
}
useEffect(() => {
    setIsVisible(false) 
    const fetchBalance = async () => {
        try {
            const response = await fetch('https://mymoney-backend.onrender.com/api/v1/account/balance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            const data = await response.json();
           
            setBalance(data.message);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    fetchBalance();
}   , []);


if (loading) {
    return <div className=" select-none flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-10 border-blue-500"></div>
    </div>
}   
    return(
        <div className="flex flex-col lg:flex-row">
              <Navbar  />


              <div className=" min-h-screen min-w-9/11   flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
  
  <button
    className="select-none text-2xl bg-blue-600 hover:bg-blue-700 transition-colors text-white px-8 py-4 rounded-full shadow-lg mb-10"
    onClick={handleBalance}
  >
    Fetch Your Current Balance
  </button>

  {isVisible && (
    <div className="select-none bg-white rounded-xl shadow-2xl p-10 text-center max-w-md w-full">
      <h2 className="select-none text-3xl font-bold text-blue-600 mb-4">Your Current Balance</h2>
      <p className="text-4xl font-semibold text-gray-800">Rs. {balance.toFixed(2)}</p>
    </div>
  )}

</div>
        </div>
      
    
  
)
   
 }

export default Balance