import React, { useState } from "react";
import ChangePasswordPic from "../../images/ChangePassword.jpg";
//import "./ChangePassword.css";
import "../../App.css";
import { url } from "../../GlobalUrl";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {  Button,Modal, ModalBody, ModalFooter } from "reactstrap"

const ForgetPasswordTwo = () => {
    const [otp, setOtp] = useState("");
    var history = useHistory();
    const [modal, setModal] = useState(false)
    const [msg, setMsg] = useState("")

    const token = localStorage.getItem("token");

    async function callEditPasswordApi() {
        localStorage.setItem("otp", otp);

        await axios.post(url + "/api/password_reset/validate_token/", { "token": otp })
            .then(res => {
                console.log(res);
                // alert(res.data.status);
                history.push("/new-password");
            })
            .catch(error => {
                console.log(error);
                setMsg("Enter Correct Verification Code!")
                setModal(true)
            })
    }
    const toggle = () => {
        setModal(!modal)
      }

    function handleData(e) {
        setOtp(e.target.value)
    }

    function handleSubmit() {
        if (otp === "") {
            setMsg("Enter Verification Code !")
            setModal(true)
        }
        else {
            callEditPasswordApi();
        }
    }

    return (
        <>
            <div className="container" style={{ marginLeft: "15%", marginRight: "15%", marginTop: "5%" }}>
                <div className="Group">
                    <img src={ChangePasswordPic} className="ChangeIMG" alt="Picture of Change Password" />
                    <br />
                    <p style={{ color: "#aaaaaa" }}>Enter Verification Code which has been send to your mail reset your password</p>

                    <div className="InputGroup">
                        <label className="InputLabel"><strong>Verification Code</strong></label>
                        <input
                            className="InputTake"
                            type="text"
                            name="text"
                            placeholder="Enter Verification Code"
                            onChange={(e) => handleData(e)}
                        ></input>
                    </div>
                    <br />

                    <div style={{ display:"flex",justifyContent:"flex-end" }}>
                        {/* <p>Resend Verification Code</p> */}

                        <button class="btn btn-primary" color="primary" onClick={handleSubmit}>Next</button>
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

export default ForgetPasswordTwo;
