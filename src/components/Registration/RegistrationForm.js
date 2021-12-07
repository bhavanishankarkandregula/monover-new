import React, { useState } from "react"
import "./RegistrationForm.css"
import RegImg from "../../images/RegistrationImg.png"
import { url } from "../../GlobalUrl"
import { NavLink, Redirect, useHistory } from "react-router-dom"
import axios from "axios"
import LoginModal from "./LoginModal"
import "./MediaQueriesRegForm.css"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import {AiOutlineEye, RiEyeCloseLine} from "react-icons/all";

const RegistrationForm = () => {
  var history = useHistory()
  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    // organisation_name: "",
    password: ""
  })
  const [error, setError] = useState({
    first_nameError: "",
    last_nameError: "",
    emailError: "",
    // organisation_nameError: "",
    passwordError: ""
  })

  // const [verify, setVerify] = useState(false);
  const [first_nameBorderColor, setFirst_nameBorderColor] = useState("#f7f7fa")
  const [last_nameBorderColor, setLast_nameBorderColor] = useState("#f7f7fa")
  const [emailBorderColor, setEmailBorderColor] = useState("#f7f7fa")
  // const [
  //   organisation_nameBorderColor,
  //   setOrganisation_nameBorderColor,
  // ] = useState("#f7f7fa");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#f7f7fa")
  const [msg, setMsg] = useState("")
  const [visible,setVisible] = useState(false);

  const [modal, setModal] = useState(false)

  
  async function callApi() {
    // console.log("REG",register);
    if(register.first_name === ""){
      setMsg("Enter first name")
      setModal(true)
    }else if(register.last_name === ""){
      setMsg("Enter last name")
      setModal(true)
    }else if(register.email === ""){
      setMsg("Enter email")
      setModal(true)
    }else if(register.password === ""){
      setMsg("Enter password")
      setModal(true)
    }else{

      if(error.first_nameError === "" && error.first_nameError==="" && error.emailError === "" && error.passwordError === "")
      {
        axios.defaults.headers.common["Authorization"] = ``
        await axios
          .post(url + "/api/user/", register)
          .then((res) => {
            // console.log("res", res);
            // console.log("res.data",res.data);
            console.log("yuyytttttxttztztztzztzt",res)
            if (res.data.message) {
              // return <Redirect to="/login-form"/>
              // console.log("res",res);
              if (res.status === 200) {
                // alert(res.data.message);
                setMsg(res.data.message)
                if (res.data.message === "A user with the email already exist!") {
                  // setVerify(false)
                  setModal(true)
                  // console.log(res.data.message);
                } else {
                  // setVerify(true)
                  setModal(true)
                }
              }
            }
            // console.log("Status", res.status);
          })
          .catch((error) => {
            console.log("Registration-Error", error)
          })
      }


      
    }

  }

  // async function verificationEmailApi(){
  //   await axios.post(`${url}/api/email/verification/refresh/`,{"email":register.email})
  //   .then(res=>{
  //     //console.log(res);
  //     setMsg(res.data.message);
  //   })
  //     .catch(error=>{
  //     console.log(error);
  //   })

  // }

  const toggle = () => {
    setModal(!modal)
    // console.log(msg);
    if (msg == "chirag jain is successfully registered. Please verify your e-mail before logging in.") {
      history.push("/login-form")
    } else {
      // history.push("/login-form")
    }
  }

  const show_password = (e) => {
    setVisible(!visible);
    // if(e.target.checked){
    //     setVisible(true);
    // }
    // else{
    //   setVisible(false);

    // }
}

  const first_name_Handler = (e) => {

    setRegister((prev) => {
      return { ...prev, first_name: e.target.value }
    })

    if (e.target.value.length === 0) {
      setError((prev) => {
        return { ...prev, first_nameError: "*Enter first name" }
      })
      setFirst_nameBorderColor("1px solid red")
    } else if(!(/^[a-zA-Z]+$/.test(e.target.value))){

      setError((prev) => {
        return { ...prev, first_nameError: "*First name can only contain letters" }
      })
      setFirst_nameBorderColor("1px solid red")

    }else {
      setError((prev) => {
        return { ...prev, first_nameError: "" }
      })
      setFirst_nameBorderColor("#f7f7fa")
    }
  }

  const last_name_Handler = (e) => {
    // console.log(e.target.value);
    setRegister((prev) => {
      return { ...prev, last_name: e.target.value }
    })

    if (e.target.value.length === 0) {
      setError((prev) => {
        return { ...prev, last_nameError: "*Enter last name" }
      })
      setLast_nameBorderColor("1px solid red")
    }else if(!(/^[a-zA-Z]+$/.test(e.target.value))){

      setError((prev) => {
        return { ...prev, last_nameError: "*Last name can only contain letters" }
      })
      setLast_nameBorderColor("1px solid red")

    }else {
      setError((prev) => {
        return { ...prev, last_nameError: "" }
      })
      setLast_nameBorderColor("#f7f7fa")
    }
  }
  const email_Handler = (e) => {
    // console.log(e.target.value);
    setRegister((prev) => {
      return { ...prev, email: e.target.value }
    })

    var emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]+$"

    const check = (mailID) => {
      if (mailID.match(emailRegex)) {
        return true
      } else {
        return false
      }
    }

    if (e.target.value.length === 0) {
      setError((prev) => {
        return { ...prev, emailError: "*Enter email" }
      })
      setEmailBorderColor("1px solid red")
    } else if (!check(e.target.value)) {
      setError((prev) => {
        return { ...prev, emailError: "*Not a valid email address" }
      })
      setEmailBorderColor("1px solid red")
    } else {
      setError((prev) => {
        return { ...prev, emailError: "" }
      })
      setEmailBorderColor("#f7f7fa")
    }
  }
  // const Organisation_Handler = (e) => {
  //   console.log(e.target.value);
  //   setRegister((prev) => {
  //     return { ...prev, organisation_name: e.target.value };
  //   });

  //   if (e.target.value.length === 0) {
  //     setError((prev) => {
  //       return { ...prev, organisation_nameError: "*Enter organisation name" };
  //     });
  //     setOrganisation_nameBorderColor("1px solid red");
  //   } else {
  //     setError((prev) => {
  //       return { ...prev, organisation_nameError: "" };
  //     });
  //     setOrganisation_nameBorderColor("#f7f7fa");
  //   }
  // };
  const password_Handler = (e) => {
    // console.log(e.target.value);
    setRegister((prev) => {
      return { ...prev, password: e.target.value }
    })

    var passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

    const check = (password) => {
      if (password.match(passwordRegex)) {
        return true
      } else {
        return false
      }
    }

    if (e.target.value.length === 0) {
      setError((prev) => {
        return { ...prev, passwordError: "*Enter password" }
      })
      setPasswordBorderColor("1px solid red")
    } else if (!check(e.target.value)) {
      setError((prev) => {
        return { ...prev, passwordError: "*Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" }
      })
      setPasswordBorderColor("1px solid red")
    } else {
      setError((prev) => {
        return { ...prev, passwordError: "" }
      })
      setPasswordBorderColor("#f7f7fa")
    }
  }

  // console.log("formdatails", register);

  /*-------------------- BUTTON CLICKED --------------------*/

  const handleSubmit = () => {
    if (
      register.first_name === "" ||
      register.last_name === "" ||
      register.email === "" ||
      // register.organisation_name === "" ||
      register.password === ""
    ) {
      setMsg("Please fill all details")
    }
    callApi()
  }

  return (
    <>
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
                  <p>Login </p>
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
                  <p style={{ color: "#007fff" }}>Register </p>
                </NavLink>
              </div>
            </div>
            <div className="Row">
              <input
                type="text"
                className="firstNameInput"
                value={register.first_name}
                name="first_name"
                placeholder="First Name"
                onChange={first_name_Handler}
                style={{ border: first_nameBorderColor }}
              />
              &emsp;
              <input
                type="text"
                class="lastNameInput"
                value={register.last_name}
                name="last_name"
                placeholder="Last Name"
                onChange={last_name_Handler}
                style={{ border: last_nameBorderColor }}
              />
            </div>
            <div className="Row ErrorClass">
            <div style={{width:"60%"}} className="ErrorClass ml-3 ml-md-0">{error.first_nameError}</div>
            &emsp;
            <div style={{width:"60%"}} className="ErrorClass ml-3 ml-md-0">{error.last_nameError}</div>
            </div>
            

            <input
              type="email"
              value={register.email}
              name="email"
              placeholder="Email"
              onChange={email_Handler}
              style={{ border: emailBorderColor }}
            />
            <div className="ErrorClass ml-3 mb-3 ml-md-0">{error.emailError}</div>
            {/* <input
              type="text"
              value={register.organisation_name}
              name="organisation_name"
              placeholder="Name of the organisation"
              onChange={Organisation_Handler}
              style={{ border: organisation_nameBorderColor }}
            />
            <div className="ErrorClass" >
              {error.organisation_nameError}
            </div> */}

            <div className="password" style={{display:"flex",justifyContent:"space-between",backgroundColor:"#f7f7fa",padding:"16px 20px",borderRadius:"12px",marginTop:"10px", border: passwordBorderColor}} >
            <input
              type={visible ? "text" : "password" }
              value={register.password}
              name="password"
              placeholder="Password"
              onChange={password_Handler}
              
              style={{ border: "rgb(247, 247, 250)",backgroundColor:"#f7f7fa" }}
            />
          <div style={{marginRight:"10px",cursor:"pointer"}}>
             { visible ? <RiEyeCloseLine fontSize={20} onClick={()=>{show_password()}}/> : <AiOutlineEye fontSize={20} onClick={()=>{show_password()}}/> }
          </div>
            </div>
            <div className="ErrorClass ml-3 ml-md-0">{error.passwordError}</div>
            {/* <p style={{marginLeft:"10px",marginTop:"20px",marginBottom:"20px"}}>
                <input type="checkbox" onClick={(e) => show_password(e)}/><span style={{marginLeft:"4px"}}> Show Password</span>
           </p> */}
          <br />
            {/* <div className="FormCheckbox">
              <input type="checkbox" />
              &nbsp;Agree to the{" "}
              <span style={{ color: "blue" }}>&nbsp;terms & Conditions</span>
            </div> */}
            <button
              onClick={() => {
                handleSubmit()
                // toggle();
              }}
            >
              Register
            </button>
          </div>
        </div>
        {/* <LoginModal toggle={toggle} modal={modal} setMsg={msg} /> */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>{msg}</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={toggle}
              style={{ fontSize: "12px" }}
            >
              Okay
            </Button>
            {/* {verify && <Button color="primary" onClick={()=>{toggle();verificationEmailApi();}} style={{fontSize:"12px"}}>
                Resend Verification email
              </Button>} */}
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default RegistrationForm
