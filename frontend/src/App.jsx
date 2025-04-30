import React from "react"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"
import Balance from "./components/Balance"
import About from "./pages/About"
import Transaction from "./pages/Transaction"
function App() {

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/send" element={<SendMoney />}></Route>
      <Route path="/balance" element={<Balance />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/transactions" element={<Transaction/>}></Route>  
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
