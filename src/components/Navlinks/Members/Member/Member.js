import { Component } from "react";
import classes from "./Member.module.css";
import user from "../../../../images/user.jpg";
import { CardBody, CardTitle } from "reactstrap";
import { UserContext } from "../../../UserContext";
import { url } from "../../../../GlobalUrl";
// import grp1 from '../images/docs/Group 2.png';
// import sheet from '../images/docs/planning-sheets.png';
// import kit from '../images/docs/work-kit.png';

class Member extends Component {
  // static contextType = UserContext;
  // componentDidMount() {
  //   const user = this.context;

  //   console.log(user[0].profile_picture); // { name: 'Tania', loggedIn: true }
  // }
  // console.log(props);
  render() {
    return (
      // <div className = {classes.member}>
      //     <div className="MemberTop">

      //     <p
      //     onClick={() => {
      //         this.props.removeMember();
      //     }}
      //     style={{ fontSize: "2rem" }}
      //     >
      //     &times;
      //   </p>
      //       </div>
      //     <img src = {user} alt = 'user'/>
      //     <div className={classes.group}>
      //         <span className = {classes.name}>{this.props.first_name + " " + this.props.last_name}</span>
      //         {/* <span className = {classes.subheading} style = {{color: '#BEBEC0'}}>5 Projects</span> */}
      //     </div>
      //     {/* <button>
      //         Remove Profile
      //     </button> */}
      // </div>

      <div>
        <div className={classes.cardLayout}>
          <CardBody>
            <div className={classes.MemberCard}>
              <div className={classes.MemberCardTop}>
                <p
                  onClick={() => {
                    this.props.removeMember(this.props.id);
                    console.log(this.props.id);
                  }}
                >
                  &times;
                </p>
              </div>
              {console.log("image boi", this.props.profilePic)}
              <img
                src={
                  this.props.profilePic !== null
                    ? url + this.props.profilePic
                    : "https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6"
                }
                alt="img"
              />
              {/* <img src={user} alt="User" /> */}
              <CardTitle className={classes.MemberName}>
                <h5>{this.props.first_name + " " + this.props.last_name}</h5>
              </CardTitle>
            </div>
          </CardBody>
        </div>
      </div>
    );
  }
}

export default Member;
