import { Component } from "react";
//import DisplayBar from "../DisplayBar";
import classes from "./folder.module.css";

class folderComponents extends Component {
  render() {
    return (
      <>
      {/* <DisplayBar title={"Projects"} text={this.props.location.aboutProps.projectTitle}/> */}
        <div className={classes.utility}>
          {/* <NavLink
            to={{
              pathname: "/SubFolder",
              aboutProps: {
                selectedid: "AR Documents",
              },
            }}
            style={{ textDecoration: "none" }}
          > */}
            <div
              style={{
                backgroundColor: "#FEFCFF",
                boxShadow:
                  "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <span style={{ color: "#4E53BA" }}>School Documents</span>
              <p style={{ color: "black" }}>
                Some small info about the documnet
              </p>
              <ul style={{ color: "black" }}>
                <li>File Name 1</li>
                <li>File Name 2</li>
                <li>File Name 3</li>
                <li>File Name 4</li>
              </ul>
            </div>
          {/* </NavLink> */}
        </div>
      </>
    );
  }
}

export default folderComponents;
