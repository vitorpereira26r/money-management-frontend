import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar"
import { Login } from "./Pages/Login/Login"
import { UserAccess } from "./Pages/User/UserAccess"
import { RequireAuth } from "./contexts/Auth/RequiteAuth"
import { Register } from "./Pages/Register/Register"
import { LandingPage } from "./Pages/LandingPage/LadingPage"
import { Home } from "./Pages/Home/Home"

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<RequireAuth><UserAccess/></RequireAuth>}/>
        <Route path="/home" element={<RequireAuth><Home/></RequireAuth>}/>
      </Routes>
    </div>
  )
}

export default App
