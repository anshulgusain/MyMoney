import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Appbar from '../components/Appbar';
import Navbar from '../components/Navbar';
import Success from '../components/Success';

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
if(success){
return <div className='w-screen'>

   <Success />
    </div>


}if(loading){
    return <div className='flex justify-center items-center h-screen w-full'>
        <div className="animate-spin rounded-full h-32 w-32 border-b-10 border-blue-500"></div>
    </div>
}
if(error){
    return <div className='flex justify-center items-center h-screen w-full'>
        <div className="text-red-500 text-2xl">Error fetching account details</div>  
        <div className="text-blue-950 text-2xl cursor-pointer " onClick={(()=>window.location.replace("/dashboard"))}>Click to Reload</div>   
    </div>
}
if(!email || !name){
    return <div className='flex justify-center items-center h-screen w-full'>
        <div className="text-red-500 text-2xl">Error fetching account details</div>  
        <div className="text-blue-950 text-2xl cursor-pointer " onClick={(()=>window.location.replace("/dashboard"))}>Click to Reload</div>   
    </div>
}
 
 return <div className='flex '>
   
    <Navbar />
    


<div className="flex justify-center h-screen bg-gray-100 w-9/11">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async() => {
                        setLoading(true)
                        try{
                       const response=    await axios.post  ("https://mymoney-backend.onrender.com/api/v1/account/transfer", {
                                to: email,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            if(response.status===200){
                                setSuccess(true)    
                                setLoading(false)
                            }
                            if(response.status!==200){
                                alert(response.data.message)  
                                setLoading(false)
                                setError(true)  
                                return
                            }
                           
                        }catch(e){  
                            alert("Error sending money")
                            setError(true)
                            setLoading(false)
                        }
                       
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
    </div>
    
}



export default SendMoney