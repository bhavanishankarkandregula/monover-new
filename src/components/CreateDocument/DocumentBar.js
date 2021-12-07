import React from "react";
import classes from "./Projects.module.css";
import "./DocumentList.css"

const DocumentBar = (props) => {
  return (
    <div style={{marginBottom:"50px",marginTop:"10px"}}>
      <div className={classes.top}>
        <span>
          <h5>
            {props.title} <small> / {props.text}</small>
          </h5>
        </span>
      </div>
    </div>
  );
};

export default DocumentBar;
