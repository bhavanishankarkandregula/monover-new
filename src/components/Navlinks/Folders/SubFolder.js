import React from "react";
import classes from "../../../docs/docs.module.css";
import grp1 from "../../../images/docs/Group 2.png";
import sheet from "../../../images/docs/planning-sheets.png";
import kit from "../../../images/docs/work-kit.png";
import ScreenTop from "../../mobileComp/ScreenTop";
import Top from "../../Top";
import DisplayBar from "../DisplayBar";

const SubFolder = (props) => {
  return (
    <div className="main">
      <ScreenTop />
      <Top />
      <DisplayBar title={"Projects"} text={props.location.aboutProps.selectedid}/>
      <div className={classes.utility}>
        <div style={{ backgroundColor: "#DDE5FF" }}>
          <span style={{ color: "#689595" }}>AR Documents</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
          <img src={grp1} alt="grp1" align="bottom" />
        </div>
        <div
          style={{
            backgroundColor: "#FEFCFF",
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <span style={{ color: "#4E53BA" }}>School Documents</span>
          <p>Some small info about the documnet</p>
          <img src={sheet} alt="grp1" className={classes.image} />
        </div>
        <div style={{ backgroundColor: "#FFF4F2" }}>
          <span style={{ color: "#956891" }}>ML Docs</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <img src={kit} alt="grp1" className={classes.image} />
        </div>
        <div style={{ backgroundColor: "#DDE5FF" }}>
          <span style={{ color: "#689595" }}>Planning Sheets</span>
          <p>Small info about this document.</p>
          <img src={grp1} alt="grp1" />
        </div>
      </div>
    </div>
  );
};

export default SubFolder;
