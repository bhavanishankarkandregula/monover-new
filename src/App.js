// import { NavLink } from "react-router-dom";
import React, { useContext, useEffect } from "react"
import "./App.css"
import Home from "./components/Home"
import axios from "axios"

// import LoginForm from "./components/Registration/LoginForm";
// import RegistrationForm from "./components/Registration/RegistrationForm";
import Slider from "./components/Slider/Slider"

// import ReactDOM from "react-dom";
import { UserContext } from "../src/components/UserContext"
import "./providers/token_listener"

function App() {
  const [userData, setUserData] = useContext(UserContext)

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (axios)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }, [token])
  return (
    <div>
      {/* <RegistrationForm/> */}
      {/* <LoginForm/> */}
      <Slider />
      <Home organizationName={userData.organisation_name} />
    </div>
  )
}

export default App
