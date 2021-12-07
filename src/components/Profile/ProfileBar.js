import React from "react";
import MenuIcon from "../menuIcon";
import classes from "../Navlinks/Projects.module.css";
import User from "../User";

const ProfileBar = (props) => {
  return (
    <div>
      <div className={classes.top}>
        <MenuIcon />
        <span>
        <h3
              // onClick={() => {
              //   window.history.back();
              // }}
              style={{ cursor: "pointer", display: "inline" }}
            >
              {props.title}
            </h3>
            <strong>&nbsp;/&nbsp;{props.text}</strong>
        </span>
        <User />
      </div>
    </div>
  );
};

export default ProfileBar;
