import React, { useState } from "react"
import "./RegistrationForm.css"
import RegImg from "../../images/RegistrationImg.png"
import { url } from "../../GlobalUrl"
import { NavLink, useHistory } from "react-router-dom"
import axios from "axios"
// import LoginModal from "./LoginModal";
import "./MediaQueriesLogForm.css"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import {AiOutlineEye, RiEyeCloseLine} from "react-icons/all";

const LoginForm = () => {
  var history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passBorderColor, setPassBorderColor] = useState("#f7f7fa")
  const [emailBorderColor, setEmailBorderColor] = useState("#f7f7fa")
  const [visible,setVisible] = useState(false);
  const [msg, setMsg] = useState("")
  const [verify, setVerify] = useState(false)

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
    if (msg === "Login Successful!") {
      window.location.replace("/review")
    }
  }

  async function verificationEmailApi() {
    setVerify(false)

    await axios
      .post(`${url}/api/email/verification/refresh/`, { email: email })
      .then((res) => {
        //console.log(res);
        setMsg(res.data.message)
        setVerify(false)
      })
      .catch((error) => {
        console.log(error)
        setVerify(false)
      })
  }

  async function callApi() {
    // console.log("DATA", email, password);
    axios.defaults.headers.common["Authorization"] = ``
    await axios
      .post(url + "/api/token/", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.access)
        localStorage.setItem("refresh_token", res.data.refresh)
        const token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        if (res.status == 203) {
          // alert("Please verify your email!");
          setMsg("Please verify your email!")
          setModal(true)
          setVerify(true)
        }

        if (res.status === 200) {
          setMsg("Login Successful!")
          window.location.replace("/review")
          // setModal(true)
          // alert("Login Successful!");
        }
      })
      .catch((error) => {
        // console.log(error.response);
        console.log(error)
        if (error && error.response && error.response.status === 401) {
          // alert(error.response.data.detail);
          setMsg("Invalid email or password")
          localStorage.setItem("token", null)
          axios.defaults.headers.common["Authorization"] = ``
          setModal(true)
        }
      })
  }

  const show_password = () => {
    setVisible(!visible);
    // if(e.target.checked){
    //     setVisible(true);
    // }
    // else{
    //   setVisible(false);

    // }
}

  const handleEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value)

    var emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]+$"

    const check = (mailID) => {
      if (mailID.match(emailRegex)) {
        return true
      } else {
        return false
      }
    }

    if (e.target.value.length === 0) {
      setEmailError("*Enter email address")
      setEmailBorderColor("1px solid red")
    } else if (!check(e.target.value)) {
      setEmailError("Not a valid email address")
      setEmailBorderColor("1px solid red")
    } else {
      setEmailError("")
      setEmailBorderColor("#f7f7fa")
    }
  }

  const handlePassword = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value)
    // console.log("LEN", e.target.value.length);

    if (e.target.value.length === 0) {
      setPasswordError("*Enter Password")
      setPassBorderColor("1px solid red")
    } else {
      setPasswordError("")
      setPassBorderColor("#f7f7fa")
    }
  }

  // console.log("URL", url);

  /*-------------------- BUTTON CLICKED --------------------*/

  const handleSubmit = () => {
    // e.preventDefault();
    console.log("tytytyt",email,password)
    if (email === "" || password === "") {
      setMsg("")
      setMsg("Please fill all the details")
      setModal(true)
      setVerify(false)
    }else{
      callApi()
    }

    
  }

  // console.log("verify", verify);

  return (
    <div className="Register">
      <div className="Logo">
        <h2>MONOVER</h2>
      </div>
      <div className="FormSection">
        <img src={RegImg} alt="RegImg" />
        <div className="FormDetails">
          <div className="FormRules" style={{ marginBottom: "5%" }}>
            <div className="FormRuleLogin">
              <NavLink
                to="/login-form"
                style={{
                  textDecoration: "none",
                  alignItems: "center",
                  color: "black"
                }}
              >
                <p style={{ color: "#007fff" }}>Login </p>
              </NavLink>
            </div>
            <div className="FormRuleMiddle">
              <small>|</small>
            </div>
            <div className="FormRuleRegister">
              <NavLink
                to="/registration-form"
                style={{
                  textDecoration: "none",
                  color: "black"
                }}
              >
                <p>Register </p>
              </NavLink>
            </div>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleEmail(e)}
            style={{ border: emailBorderColor }}
          />
          <div className="ErrorClass">{emailError}</div>
          <div className="password"  style={{ display:"flex",justifyContent:"space-between",backgroundColor:"#f7f7fa",padding:"13px 20px",borderRadius:"12px", border: passBorderColor}} >
          <input
            type={visible ? "text" : "password" }
            name="password"
            placeholder="Password"
            onChange={(e) => handlePassword(e)}
            style={{ border: "rgb(247, 247, 250)",backgroundColor:"#f7f7fa" }}
          />
          <div style={{marginRight:"10px",cursor:"pointer"}}>
          { visible ? <RiEyeCloseLine fontSize={20} onClick={()=>{show_password()}}/> : <AiOutlineEye fontSize={20} onClick={()=>{show_password()}}/> }
          </div>
          </div>
         
          <div className="ErrorClass">{passwordError}</div>
          {/* <p style={{marginLeft:"10px",marginTop:"20px",marginBottom:"20px"}}>
                <input type="checkbox" onClick={(e) => show_password(e)}/><span style={{marginLeft:"4px"}}> Show Password</span>
           </p>
          <br /> */}

          <button
            type="submit"
            style={{marginTop:"10px"}}
            onClick={() => {
              handleSubmit()
              // toggle();
            }}
          >
            Log In
          </button>
          {/* <br />
          <div className="NoAccount">
          <span>
          Don`t have an accout? &emsp;&emsp;
          </span>
              <NavLink style={{textDecoration:"none"}} to="/registration-form"> Register now</NavLink>
            </div> */}

          <span className="ForgetPass">
            <NavLink style={{ textDecoration: "none" }} to="/forget-password">
              Forget Password
            </NavLink>
          </span>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>{msg}</ModalBody>
        <ModalFooter>
          {!verify && (
            <Button
              color="primary"
              onClick={toggle}
              style={{ fontSize: "12px" }}
            >
              Okay
            </Button>
          )}
          {verify && (
            <Button
              color="primary"
              onClick={() => {
                verificationEmailApi()
              }}
              style={{ fontSize: "12px" }}
            >
              Resend Verification email
            </Button>
          )}

          {verify && (
            <Button
              color="primary"
              onClick={() => {
                toggle()
              }}
              style={{ fontSize: "12px" }}
            >
              Cancel
            </Button>
          )}
        </ModalFooter>
      </Modal>
      {/* <LoginModal toggle={toggle} modal={modal} setMsg={msg} resend = {false}/> */}
    </div>
  )
}

export default LoginForm
