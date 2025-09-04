import React from "react"
import './index.css'
import {Link} from 'react-router'
import Cookies from "js-cookie"
import {useNavigate} from "react-router"

const Header = () => {
 const navigate = useNavigate()
  const onClickLogout = () => {
      Cookies.remove("jwt_token");
      navigate("/login")
  }
    return (
        <>
        <div className="header-container">
            <div className="header-logo-container">
              <img className="logo-style" src="https://res.cloudinary.com/drskskzys/image/upload/v1756633216/Screenshot_2025-08-31_150447_ppjn74.png" alt="Logo"/>
              <h1 className="header-title">Xpensify</h1>
            </div>


            <div className="nav-container">
              <Link to="/"><p >Home</p></Link>
              <Link to="/dashboard"><p>Dashboard</p></Link>
              <Link to="/expenses"><p>Expenses</p></Link>
              <button onClick={onClickLogout}>Logout</button>
             
            </div>
        </div>
        </>
    )
}

export default Header;