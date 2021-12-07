import React, { useEffect, useState } from "react";
import { Row, Col, Input, Label, Button } from "reactstrap";
import ScreenTop from "../mobileComp/ScreenTop";
import ChangePasswordPic from "../../images/ChangePassword.jpg";
import "../../App.css";
import ProfileBar from "../Profile/ProfileBar";
import { url } from "../../GlobalUrl";
import axios from "axios";
import {  Modal, ModalBody, ModalFooter } from "reactstrap"
import {AiOutlineEye, RiEyeCloseLine} from "react-icons/all";

const ChangePassword = () => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState("")
  const [visible,setVisible] = useState(false);
  const token = localStorage.getItem("token");
  const otp = localStorage.getItem("otp");

  async function callChangePasswordApi() {
    await axios.post(url + "/api/password_reset/confirm/",
      {
        "password": newPassword,
        "token": otp
      })
      .then(res => {
        console.log(res);
        
        if(res.status >= 200 && res.status<=300){
          setMsg("Congratulations, your password has changed successfully!");
          setModal(true)
          // window.location.replace("/login-form")
        }

      })
      .catch(error => {
        

        console.log(error);
        alert(`This password is too short. It must contain at least 8 characters.\n This password is too common.\nThis password is entirely numeric.`);
      })
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

  function handleData(e) {

    const { name, value } = e.target;

    if (name === "newPassword") {
      console.log("new Password", value);
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      console.log("confirmPassword", value);
      setConfirmPassword(value);
    }
  }

  const toggle = () => {
    setModal(!modal)
    // console.log(msg);
    if (msg == "Congratulations , your password has changed successfully!") {
      window.location.replace("/login-form")
    } else {
      // history.push("/login-form")
    }
  }

  function handleSubmit() {
    console.log("Pass ",newPassword,"conf",confirmPassword);
    const validation = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$";

    // setMsg("Congratulations , your password has changed successfully!");
    // setModal(true)

    if(newPassword.length===0){
      setMsg("Enter new Password")
      setModal(true)
    }
    else if(confirmPassword.length===0){
      setMsg("Enter Confirm Password")
      setModal(true)
    }
    else if (newPassword !== confirmPassword) {
      setMsg("Password and confirm password not matched !");
      setModal(true)
    }
    // else if(validation.match(newPassword)){
    //   alert("Please enter Strong Password");
    // }
    else {
      var passwordRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
      // console.log(new_password)
      if(newPassword.match(passwordRegex)){
        callChangePasswordApi();
      }else{
        setMsg("New Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
        setModal(true)
      }
      // callChangePasswordApi();
    }
  }

  return (
    <>
      <div className="container" style={{ marginRight: "15%", marginLeft: "15%" }}>
        {/* <ScreenTop />
        <ProfileBar title="My Profile" text="Change Password" /> */}
         <div className="Group">
          <img src={ChangePasswordPic} className="ChangeIMG" alt="Picture of Change Password" />

          <div className="InputGroup"  >
            <label className="InputLabel">New Password</label>
            <div className="InputGroup" style={{display:"flex",justifyContent:"space-between",backgroundColor:"#e8e8e8",padding:"",borderRadius:"12px",marginTop:"10px"}} >
            <input
              className="InputTake"
               
              type={visible ? "text" : "password" }
              type="password"
              type={visible ? "text" : "password" }
              name="newPassword"
              placeholder="Enter New Password"
              onChange={(e) => handleData(e)}
            ></input>
             <div style={{marginRight:"10px",marginTop:'9px',cursor:"pointer"}}>
            { visible ? <RiEyeCloseLine fontSize={20} onClick={()=>{show_password()}}/> : <AiOutlineEye fontSize={20} onClick={()=>{show_password()}}/> }
            </div>
            </div>
          </div>

        
          {/* <div className="InputGroup">
            <label className="InputLabel">New Password</label>

            <div style={{display:"flex",justifyContent:"space-between",backgroundColor:"#e8e8e8",padding:"",borderRadius:"12px",marginTop:"10px"}} >
           

            <input
              className="InputTake"
            
              type={visible ? "text" : "password" }
              name="newPassword"
              placeholder="Enter New Password"
              onChange={(e) => handleData(e)}
              style={{ border: "#e8e8e8",backgroundColor:"#e8e8e8" }}
            ></input>
            <div style={{marginRight:"10px",cursor:"pointer"}}>
            { visible ? <RiEyeCloseLine fontSize={20} onClick={()=>{show_password()}}/> : <AiOutlineEye fontSize={20} onClick={()=>{show_password()}}/> }
            </div>
            </div>

          </div> */}
          <div className="InputGroup">
            <label className="InputLabel">Confirm Password</label>
            <input
              className="InputTake"
              type="password"
              name="confirmPassword"
              placeholder="Re-type password"
              onChange={(e) => handleData(e)}
            ></input>
          </div>
          <br/>
          <Row>
            <Col sm={10} md={10} lg={10}/>
          <Col>
            <Button color="primary" block onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
          </Row>
     
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
