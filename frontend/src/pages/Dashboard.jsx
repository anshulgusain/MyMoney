import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/User"
import axios from "axios"
import UserCard from "../components/UserCard"
import Navbar from "../components/Navbar"

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [account,setAccount]=useState({})
    const [user,setUser]=useState({})
  
    




    useEffect(() => {
       setLoading(true)
        const fetchAccountDetails = async () => {
            try {
              const response = await fetch('http://localhost:8080/api/v1/account/accountDetails', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
              });
              const data = await response.json();
              console.log(data)
              if(response.status !== 200){
                     setError(true)
                     setLoading(false)
                     return
              }
              setAccount(data.account);
              setUser(data.user);
            } catch (error) {
              console.error('Error fetching account details:', error);
              setLoading(false)
                setError(true)
            }
          };
      
          fetchAccountDetails();
          setLoading(false);
          
    }, [])  

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-bounce rounded-full h-32 w-32 border-b-10 border-blue-500"></div>
        </div>
    }
    if(error){
        return <div className="flex justify-center items-center h-screen">
            <div className="text-red-500 text-2xl">Error fetching account details</div>  
            <div className="text-blue-950 text-2xl cursor-pointer " onClick={(()=>window.location.href="/signup")}>Click to Signup</div>   
        </div>
    }
    return <div className="grid grid-cols-10 jus ">
      
        <div className="col-span-2 hidden lg:block" ><Navbar /></div>
        <div className="col-span-8   " ><Appbar />
        <div className="col-span-8 bg-[rgb(244,246,250)] grid grid-cols-2  p-4 ">
        <div className="mt-5 col-span-2 flex justify-center " ><UserCard name={`${user.firstName} ${user.lastName}`} email={user.email} id={user._id} /></div>
        
        <div className="col-span-2    rounded-2xl h-71 overflow-y-auto p-5 shadow-xl"><Users /></div>
        </div>
        </div>
       
       
           

        
    </div>
}

export default Dashboard
