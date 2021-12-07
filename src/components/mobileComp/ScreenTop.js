import React from "react";
import { connect } from "react-redux";
import classes from "./Mobile.module.css";
import MenuIcon from "../menuIcon";
import ScreenNotif from "./ScreenNotif";

class ScreenTop extends React.Component {
  render() {
    let title = "Projects";
    // console.log(this.props.active);

    switch (this.props.active) {
      // case "/folders":
      //   title = "Folders";
      //   break;
      case "/members":
        title = "Members";
        break;
      case "/starred":
        title = "Starred";
        break;
      case "/profile":
        title = "My Profile";
        break;
      case "/Document":
        title = "Document";
        break;
      case "/Organisation":
        title = "Organisation";
        break;
      case "/change-password":
        title = "Change Password";
        break;
      default:
        title = "MONOVER";
        break;
    }
    return (
      <div className="mb-2">
        {/* <Modal/> */}
        {/* <ScreenLeft heading={title}/> */}

        <div className={classes.screenTop}>
          <div className={classes.screenSlider}>
            <MenuIcon />
            {/* <span className={classes.title}>{props.heading}</span> */}
            {/* <span className={classes.title}>{title}</span> */}
          </div>
          {this.props.active === "/profile" ? null : <ScreenNotif />}
        </div>
        {/* {this.props.active === "/profile" || 
        this.props.active==="/members" ||
        this.props.active === "/Organisation"||
        this.props.active === "/document-list" || 
        this.props.active === "/change-password" ? null :
        <div className={classes.dropdown}>
          <select>
            <option value="0">This Week</option>
          </select>
        </div>} */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    active: state.active.active,
  };
};
export default connect(mapStateToProps, null)(ScreenTop);
