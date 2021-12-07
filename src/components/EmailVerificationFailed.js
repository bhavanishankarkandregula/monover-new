import React from "react";
import failure from "../../src/images/failure.png"

const EmailVerificationFailed = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
        <img src={failure} alt="failure"  style={{height:"auto",width:"5rem",marginBottom:"0.7rem"}}/>
      <div class="__content">
        <h2 style={{textAlign:"center",fontFamily: "Arial, Helvetica, sans-serif"}}>
          The following url is Expired!
        </h2>
      </div>
    </div>
  );
};

export default EmailVerificationFailed;
