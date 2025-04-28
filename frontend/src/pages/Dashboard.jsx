import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/User"
import axios from "axios"

const Dashboard = () => {
const [balance,setBalance]=useState(0)
    useEffect(() => {

        const search=async()=>{
            var response=   await axios.get("http://localhost:8080/api/v1/account/balance"
                , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                setBalance(parseInt(response.data.message))
               
                
        }
     search()
    },[])
    return <div className="bg-red">
        <Appbar />
        <div className="m-8"  >
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}

export default Dashboard
