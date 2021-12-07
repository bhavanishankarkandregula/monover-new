import React from "react";
import { NavLink } from "react-router-dom";
import checkMark from "../../src/images/check-mark.png"

const EmailVerification = () => {
  return (
    <div
      class="__emailcontent"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <img src={checkMark} alt="checkMark" style={{height:"auto",width:"5rem",marginBottom:"0.7rem"}}/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>
          <h3
            style={{
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Your email address is successfully verified!!.
            <br />
            LogIn to continue....
          </h3>
        </p>
        <NavLink
          style={{
            padding: "10px 55px",
            color: "white",
            backgroundColor: "rgb(40, 138,218)",
            borderRadius: "10px",
            textDecoration: "None",
          }}
          exact
          to="http://19.164.225.35.bc.googleusercontent.com/home"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default EmailVerification;
