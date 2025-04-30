import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import  Button  from "../components/Button"
import  Heading  from "../components/Heading"
import  InputBox  from "../components/InputBox"
import Navbar from "../components/Navbar"
import  SubHeading  from "../components/SubHeading"
import axios from "axios"

 const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
const handlelogin = async() => { 
  if (email === "" || password === "") {
    setError(true)
    return
  } 
  try{
    setLoading(true)
    setError(false)
  const response=await axios.post(
    "https://mymoney-backend.onrender.com/api/v1/user/signin",
    {
      email: email,
      password: password, 
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  if (response.status === 200) {
      console.log(response)
    localStorage.setItem("token", response.data.token);
    window.location.href = "/dashboard";
  }else{
    if(response.status === 411){
      
      alert(response.data.message)  
      setLoading(false)
      setError(true)  
    return
    }
  }
}


 catch (error) {
   alert("Incorrect email or password")
   setLoading(false)
    console.log(error);
    setError(true)
    
  }
}


if (loading) {  
  return <div className="flex justify-center items-center h-screen">
      <div className="animate-bounce rounded-full h-32 w-32 border-b-10 border-blue-500"></div>
  </div>

}
if (error) {  
  return <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-2xl">Error logging in</div>
      <div className="text-blue-950 text-2xl cursor-pointer " onClick={(()=>window.location.href="/")}>Click to Signup</div>   
  </div>
}


  return(
    <div className="flex">


  <div className="bg-slate-300 h-screen flex justify-center w-screen">
     <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
       <Heading label={"Sign in"} />
         <SubHeading label={"Enter your credentials to access your account"} />
         <InputBox onChange={(e)=>{
            setEmail(e.target.value)
         }} placeholder="abcd@gmail.com" label={"Email"} />
         <InputBox onChange={(e)=>{
         setPassword(e.target.value)
         }} placeholder="123456" label={"Password"} />
         <div className="pt-4">
           <Button onPress={handlelogin}label={"Sign in"} />
         </div>
         <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
       </div>
     </div>
   </div>
  </div>
  )
 
}


export default Signin