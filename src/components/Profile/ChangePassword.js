import React, { useEffect, useState } from "react";
//import { Row, Col, Input, Label, Button } from "reactstrap";
import ScreenTop from "../mobileComp/ScreenTop";
import ChangePasswordPic from "../../images/ChangePassword.jpg";
import "./ChangePassword.css";
import "../../App.css";
import ProfileBar from "./ProfileBar";
import { url } from "../../GlobalUrl";
import axios from "axios";
import {  Button,Modal, ModalBody, ModalFooter } from "reactstrap"

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState("")

  const token = localStorage.getItem("token");

  async function callChangePasswordApi() {
    await axios.post(url + "/api/users/change-password/", { old_password, new_password }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res);
        setMsg(res.data.message);
        setModal(true)
      })
      .catch(error => {
        console.log(error);
        setMsg(error);
        setModal(true)
      })
  }
  const toggle = () => {
    setModal(!modal)
    // console.log(msg);
    if (msg == "Password Changed!!") {
      window.location.replace("/profile")
    } else {
      // history.push("/login-form")
    }
  }
  function handleData(e) {
    // var emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]+$";
    const { name, value } = e.target;

    // const check = (email) => {
    //   if (email.match(emailRegex)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    if (name === "password") {
      console.log("Old Password",value);
      setOldPassword(value);
    } else if (name === "confirmPassword") {
      console.log("New-Password",value);
      setNewPassword(value);
    }
  }

  function handleSubmit() {
    // if (password !== confirmPassword) {
    //   alert("Password and confirm password not matched !");
    // } 
    // else{
      if(old_password === ""){
        setMsg("Enter Old Password")
        setModal(true)
      }else if(new_password === ""){
        setMsg("Enter New Password")
        setModal(true)
      }else{
        var passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
        console.log(new_password)
        if(new_password.match(passwordRegex)){
          callChangePasswordApi();
        }else{
          setMsg("New Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
          setModal(true)
        }
      }

    
    // }
  }

  return (
    <>
      <div className="main" style={{width:"100%"}}>
        <ScreenTop />
        <ProfileBar title="My Profile" text="Change Password" />
        <div className="Group">
          <img src={ChangePasswordPic} className="ChangeIMG" alt="Picture of Change Password" />

          <div className="InputGroup">
            <label className="InputLabel">Old Password</label>
            <input
              className="InputTake"
              type="password"
              name="password"
              placeholder="Enter New Password"
              onChange={(e) => handleData(e)}
            ></input>
          </div>
          <div className="InputGroup">
            <label className="InputLabel">New Password</label>
            <input
              className="InputTake"
              type="pasword"
              name="confirmPassword"
              placeholder="Re-type password"
              onChange={(e) => handleData(e)}
            ></input>
          </div>
          <div className="ButtonGroup">
            <button color="primary" block onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
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
  );
};

export default ChangePassword;
