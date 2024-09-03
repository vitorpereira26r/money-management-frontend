import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login/Login"
import { UserAccess } from "./Pages/User/UserAccess"
import { RequireAuth } from "./contexts/Auth/RequiteAuth"
import { Register } from "./Pages/Register/Register"
import { LandingPage } from "./Pages/LandingPage/LadingPage"
import { Home } from "./Pages/Home/Home"
import { TransactionsPage } from "./Pages/TransactionsPage/TransactionsPage"
import { UserConfig } from "./Pages/UserConfig/UserConfig"
import { RequireAdmin } from "./contexts/Admin/RequireAdmin";
import { Admin } from "./Pages/Admin/Admin";

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user" element={
            <RequireAuth>
              <UserAccess/>
            </RequireAuth>
          }/>
          <Route path="/home" element={
            <RequireAuth>
              <Home/>
            </RequireAuth>
          }/>
          <Route path="/transactions" element={
            <RequireAuth>
              <TransactionsPage/>
            </RequireAuth>
          }/>
          <Route path="/user-config" element={
            <RequireAuth>
              <UserConfig/>
            </RequireAuth>
          }/>
          <Route path="/admin" element={
            <RequireAdmin>
              <Admin/>
            </RequireAdmin>
          }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
