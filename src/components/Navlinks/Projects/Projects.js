import { Component } from "react";
import classes from "../Projects.module.css";
import ScreenTop from "../../mobileComp/ScreenTop";
import Docs from "../../../docs/docs";
import Top from "../../Top";
//import Add from "../../Add";

const button = [classes.icon];

class Folders extends Component {
  // handleClick = () =>{
  //     button.push(classes.rotate);
  //     console.log(button);
  // }
  render() {

    
  const token =localStorage.getItem("token");
  console.log(token);
  
    const body = (
      <div>
        <div className={classes.middle}>
          <h3>Projects</h3>
          <select className={classes.dropdown}>
            <option value="0">This Week</option>
            <option value="0">This Month</option>
          </select>
        </div>
        <Docs />
        {/* <Add /> */}
      </div>
    );

    const next = <button className={classes.next}>Next</button>;
    return (
      <div className="main">
        <ScreenTop />
        <Top />
        {!this.props.clicked && body}
        {this.props.clicked && next}
      </div>
    );
  }
  // dfgh
}

export default Folders;
