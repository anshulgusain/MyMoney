import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Appbar = () => {
  
  
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.replace("/")


    }
    return (
       <div className="flex justify-end"> 
          <div className=" bg-[rgb(66,94,189)]  relative  flex justify-end   mt-5   h-10 border border-gray-400 rounded-lg  shadow-md text-amber-50" >
            <button onClick={handleLogout}  className="flex align-middle p-2  text-[rgb(66,94,189) cursor-pointer ">
           
                    Signout
              
            </button>
        </div>


        <div className="flex justify-end h-20 mx-4 ">
            <Link to={"/"}  className="rounded-full h-15 w-15 bg-slate-200 flex justify-center mt-3 mr-2">
                <div to={"/"} className="flex flex-col justify-center h-full text-xl text-[rgb(66,94,189)] font-bold">
                    U
                </div>
            </Link>
        </div>
    </div>
    )
}

export default Appbar