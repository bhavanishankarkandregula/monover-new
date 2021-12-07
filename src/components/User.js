import classes from "./Navlinks/Projects.module.css";
import notif from "../images/Notification.png";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ImageContext } from "./ImageContext";
import { UserContext } from "./UserContext";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { url } from "../GlobalUrl";
import axios from "axios";
import { VscOpenPreview, FiUpload, BsFillCaretRightFill } from "react-icons/all";
import { Card } from "react-bootstrap";
import Moment from 'react-moment';
// import 'moment-timezone';

//import { url } from "./../GlobalUrl";
//import axios from "axios";

const User = () => {
  /*-------------------- USECONTEXT --------------------*/
  const [image, setImage] = useContext(ImageContext);
  //  console.log(image);
  const [userData, setUserData] = useContext(UserContext);
  // const avtar =localStorage.getItem("pic");
  const [notification, setNotification] = useState([{}]);
  const [show, setShow] = useState(false);
  const [notifyWidth, setNotifyWidth] = useState("30%");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const token = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("orgId");
    localStorage.clear();
    window.location.replace("/home");
  }
  // console.log(url + userData.profile_picture);
  // console.log(userData);

  useEffect(() => {
    axios
      .get(url + "/api/notifications/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Notification", res);
        console.log("Notification", res.data);
        console.log("Notification", res.data[1]);
        setNotification(res.data[1]);
        console.log("res notification", notification);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(show);
  console.log(notifyWidth);
  return (
    <div className={classes.notifications}>
      {!window.location.href.includes("/DragAndDrop") && (
        <Card
          style={{
            width: "125px",
            marginTop: "3px",
            marginRight: "10px",
            color: "black",
            border: "none",
          }}
        >
          <Card.Body style={{ padding: "10px" }}>
            <NavLink
              to="/DragAndDrop"
              activeClassName="active"
              style={{ textDecoration: "none"}}
            >
              {/* {this.props.active === "/DragAndDrop" ? (
                              <img src={upload2} alt="projects" />
                            ) : (
                              <img src={star2} alt="projects" />
                            )} */}
                            <div style={{display:'flex',flexDirection:'row'}}>
              <FiUpload style={{ marginRight: "4px",marginTop:'14px' }} size={20} />
              <span style={{ margin: "0px" ,fontWeight:500,fontSize:'18px',marginTop:'10px' }}>
                <p>Upload</p>
              </span>
              </div>
            </NavLink>
          </Card.Body>
        </Card>
      )}
      {/* {!window.location.href.includes("/DragAndDrop") &&
        !window.location.href.includes("/review") && (
          <Card style={{ width: "125px", marginTop: "0px", border: "none" }}>
            <Card.Body style={{ padding: "1px" }}>
              <NavLink
                to="/review"
                activeClassName="active"
                exact
                style={{ textDecoration: "none" }}
              >
                <VscOpenPreview style={{ marginRight: "4px" }} size={20} />
                <span style={{ margin: "0px" }}>
                  <strong>Review</strong>
                </span>
              </NavLink>
            </Card.Body>
          </Card>
        )} */}
      <UncontrolledDropdown direction="left">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="" style={{ boxShadow: "none", padding: "0px" }}>
            <img
              src={notif}
              alt="notif"
              style={{
                border: "none", width: "auto", height: "auto",
                borderRadius: "50%",
                padding: "6px",
                backgroundColor:
                  dropdownOpen
                    ? "lightblue"
                    : "white"
              }}
            />

          </DropdownToggle>
          <DropdownMenu className="bz-card" style={{ backgroundColor: "whitesmoke", width: "15rem", borderRadius: "0.5rem", paddingBottom: "0px", marginTop: "1rem", marginRight: "2rem", border: "none" }}>
            <p style={{
              paddingBottom: "4px", paddingLeft: "0.5rem", paddingRight: "0.3rem", paddingTop: "0px",
              borderBottom: "1px solid lightgray", marginBottom: "2px"

            }}><b>NOTIFICATIONS</b></p>
            {
              notification.length === 0 &&
              <p style={{
                paddingLeft: "0.4rem", paddingRight: "0.3rem", paddingTop: "5px",
                marginBottom: "7px"

              }}>No new notifications</p>
            }
            {notification.map((notify, index) => (
              <DropdownItem style={{
                display: 'flex', paddingLeft: "0.4rem", paddingRight: "0.3rem", paddingTop: "0px", paddingBottom: "2px",
                borderBottom:
                  index + 1 !== notification.length
                    ? "1px solid lightgray"
                    : "none"
              }}
                key={index}>
                <div style={{ marginTop: "0.3rem", marginRight: "0.4rem" }}>
                  <BsFillCaretRightFill />
                </div>
                <div>
                  <h5
                    style={{
                      fontSize: ".8rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      margin: "0.4rem 0rem",
                      marginBottom: "0px",
                      whiteSpace: "initial",
                      padding: "0.1rem 0rem"
                    }}
                  >
                    {notify.notification}
                  </h5>

                  <p style={{ marginBottom: "0.4rem", fontSize: ".8rem", color: "#0F5298", fontWeight: 500 }}><Moment fromNow>{notify.date_created}</Moment></p>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </UncontrolledDropdown>
      <span>Hi {userData.first_name}</span>
      {/* <NavLink to="/profile">
        <img className={classes.UserImg} src={image.profileImg} alt="img" />
      </NavLink> */}

      <UncontrolledDropdown>
        <DropdownToggle color="" caret style={{ boxShadow: "none" }}>
          <img
            className={classes.UserImg}
            src={
              userData.profile_picture !== null
                ? url + userData.profile_picture
                : "https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6"
            }
            alt="img"
          />
        </DropdownToggle>
        <DropdownMenu right style={{ borderRadius: "5px" }}>
          <NavLink
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <DropdownItem>Profile</DropdownItem>
          </NavLink>
          <NavLink
            to="/products"
            style={{ textDecoration: "none", color: "black" }}
          >
            <DropdownItem>My Products</DropdownItem>
          </NavLink>

          <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default User;
