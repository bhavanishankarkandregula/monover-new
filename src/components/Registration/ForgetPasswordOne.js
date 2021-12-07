import React, { useState } from "react";
import ChangePasswordPic from "../../images/ChangePassword.jpg";
//import "./ChangePassword.css";
import "../../App.css";
import { url } from "../../GlobalUrl";
import axios from "axios";
import { Button,Row,Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import {  Modal, ModalBody, ModalFooter } from "reactstrap"

const ForgetPasswordOne = () => {
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState("")
  var history = useHistory();

  const token = localStorage.getItem("token");

  // async function callEditPasswordApi() {
  //   await axios.post(url + "/api/password_reset/", { email })
  // }

  async function callEditPasswordApi() {
    axios.defaults.headers.common["Authorization"] = ``
    await axios.post(url + "/api/password_reset/", { email })
      .then(res => {
        console.log(res);
        //  alert(res.data.status);
         history.push("/otp");
      })
      .catch(error => {
        // error.preventDefault();
        console.log(error.response);
         setMsg(error.response.data.email[0]);
         setModal(true)

      })
  }
  const toggle = () => {
    setModal(!modal)
  }

  function handleData(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
  }

  function handleSubmit() {
    var emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]+$";

    const check = (email) => {
      if (email.match(emailRegex)) {
        return true;
      } else {
        return false;
      }
    };

    if (check(email)) {
      callEditPasswordApi();
    } else if(email===""){
      setMsg("Enter E-mail");
      setModal(true)
    }else{
      setMsg("Enter Correct E-mail");
      setModal(true)
    }


  }

  return (
    <>
      <div className="container" style={{ paddingLeft:"10px", paddingRight:"10px" }}>
        <div className="Group">
          <img src={ChangePasswordPic} className="ChangeIMG" alt="Picture of Change Password" />
          <br />
          <p style={{ color: "#aaaaaa" }}>Enter the email associated with your account and well send an OTP to your mail to reset your password</p>

          <div className="InputGroup">
            <label className="InputLabel"><strong>Email Address</strong></label>
            <input
              className="InputTake"
              type="email"
              name="email"
              placeholder="Enter email address"
              onChange={(e) => handleData(e)}
            ></input>
          </div>
          <br />
          <div style={{ display:"flex",justifyContent:"flex-end" }}>
                        {/* <p>Resend Verification Code</p> */}

                        <Button block style={{maxWidth:"87px"}} color="primary" onClick={handleSubmit}>
                          Next
                        </Button>
          </div>
          {/* <Row>
            <Col sm={6} md={10} lg={10}/>
            <Col>
            <Button block style={{maxWidth:"87px"}} color="primary" onClick={handleSubmit}>
              Next
            </Button>
            </Col>
          </Row> */}
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

export default ForgetPasswordOne;
