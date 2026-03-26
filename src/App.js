import {Routes, Route} from "react-router-dom"
import './App.css';
import Login from "./Components/Login" 
import Home from "./Components/Home"



function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>} ></Route>

       <Route path="/login" element={<Login/>} ></Route>
        
        </Routes>
  )

}

export default App