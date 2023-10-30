import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar"
import { Home } from "./Pages/Home/Home"
import { Login } from "./Pages/Login/Login"
import { UserAccess } from "./Pages/User/UserAccess"
import { RequireAuth } from "./contexts/Auth/RequiteAuth"
import { Register } from "./Pages/Register/Register"

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<RequireAuth><UserAccess/></RequireAuth>}/>
      </Routes>
    </div>
  )
}

export default App
