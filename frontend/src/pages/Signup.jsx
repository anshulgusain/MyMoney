import React from "react"
import axios from "axios"
import {useState,useEffect} from "react"

import { BottomWarning } from "../components/BottomWarning"
import  Button from "../components/Button"
import  Heading  from  "../components/Heading"
import  InputBox  from "../components/InputBox"
import  SubHeading  from "../components/SubHeading"
import { useNavigate } from "react-router-dom"




 const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLaoding]=useState("")
  const [err,setError]=useState("")
  const navigate = useNavigate();


  if(loading){  
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-bounce rounded-full h-32 w-32 border-b-10 border-blue-500"></div>
    </div>
  }
  if(err){
    return <div className="flex justify-center items-center h-screen">
      <div className="text-red-500 text-2xl">Error fetching account details</div>   
      <div className="text-blue-950 text-2xl cursor-pointer " onClick={(()=>window.location.reload())}>Click to Reload</div>  
    </div>
  }

  return <div className="bg-slate-300 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label={"Sign up"} />
      <SubHeading label={"Enter your infromation to create an account"} />
      <InputBox onChange={e => {
        setFirstName(e.target.value);
      }} placeholder="Virat" label={"First Name"} />
      <InputBox onChange={(e) => {
        setLastName(e.target.value);
      }} placeholder="Kohli" label={"Last Name"} />
      <InputBox onChange={e => {
        setEmail(e.target.value);
      }} placeholder="abcd@gmail.com" label={"Email"} />
      <InputBox onChange={(e) => {
        setPassword(e.target.value)
      }} placeholder="123456" label={"Password"} />
      <div className="pt-4">
        <Button onPress={async () => {
          // console.log("button")
          setLaoding(true)
          setError(false)
          if (firstName === "" || lastName === "" || email === "" || password === "") {
            alert("Please fill all the fields")
            setLaoding(false)
            return
          }
          try{
          const response = await axios.post("http://localhost:8080/api/v1/user/signup", {
            email,
            firstName,
            lastName,
            password
          });
          console.log(response)
          localStorage.setItem("token", response.data.token)
          navigate("/")
        }catch(err){
          console.log(err)
          alert(err)
          setError(true)
          setLaoding(false)
        } 
        }} label={"Sign up"} />
      </div>
      <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
    </div>
  </div>
</div>
}


export default Signup


