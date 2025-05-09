import { useEffect, useState } from "react"
import  Button  from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


 const Users = () => {
  
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    
    useEffect(() => {
        axios.get("https://mymoney-backend.onrender.com/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
                // console.log(users)
            })
    }, [filter])

    return < div className="bg-white w-100% h-100% rounded-2xl p-5 shadow-xl overflow-hidden ">
        <div className="font-bold mt- text-2xl">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded-xl border-slate-600"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </div>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onPress={(e) => {
                // console.log("clicked")
                navigate("/send?email=" + user.email + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}


export default Users
