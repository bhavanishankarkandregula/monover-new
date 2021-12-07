import React, { useContext, useEffect, useState } from "react";
import notif from "../../images/Notification.png";
import search from "../../images/Search.png";
import { NavLink } from "react-router-dom";
import classes from "./Mobile.module.css";
import { UserContext } from "../UserContext";
import { ImageContext } from "../ImageContext";
import { BsFillCaretRightFill, RiFileSearchLine } from "react-icons/all";
import {
  Dropdown,
  DropdownItem,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { url } from "../../GlobalUrl";
import axios from "axios";
import Moment from 'react-moment';

const ScreenNotif = () => {
  /*-------------------- USECONTEXT --------------------*/
  const [image, setImage] = useContext(ImageContext);
  const [userData, setUserData] = useContext(UserContext);
  const [notification, setNotification] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const token = localStorage.getItem("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchq, setSearchq] = useState("");
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState([]);
  const orgId = localStorage["orgId"];

  const toggle = () => setDropdownOpen((prevState) => !prevState);
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

  function handleLogout() {
    localStorage.removeItem("orgId");
    localStorage.clear();
    window.location.replace("/registration-form");
  }

  const document_details = (id) => {
    localStorage["documentId"] = id;
    window.location.replace("/document-details");
  };

  const searchToggle = () => {
    setShowInput(!showInput);
  };

  const handleSearch = (e) => {
    setSearchq(e.target.value);
    if (e.target.value === "") {
      setClicked(false);
      setItems([]);
      return;
    }

    if (!e.target.value) {
      setClicked(false);
      setItems([]);
      return;
    }
    console.log("searchQuary", e.target.value);
    const body = { organisation_id: `${orgId}`, query: `${searchq}` };

    axios
      .post(url + "/api/search/", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("ProjectList", res.data);
        if (res.data && res.data.length > 0) {
          setClicked(true);
        }
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  };

  if (clicked) {
    // window.onscroll = function () { window.scrollTo(0, 0); };
  } else {
    window.onscroll = function () {};
  }

  return (
    <div className={classes.screenNotif}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="" style={{ boxShadow: "none",padding:"0px",marginRight:'3px'  }}>
          <img
            src={notif}
            alt="notif"
            style={{ border: "none", width: "auto", height: "auto",
            borderRadius:"50%",
            padding:"3px",
            backgroundColor:
              dropdownOpen 
              ? "lightblue"
              : "white"
          }}
          />
        </DropdownToggle>
        <DropdownMenu className="bz-card" style={{  backgroundColor:"whitesmoke",width: "12rem",borderRadius:"0.5rem",paddingBottom:"0px",marginTop:"1rem",marginRight:"3rem",left:"-10px",border:"none"}}>
          <p style={{paddingBottom:"4px",paddingLeft:"0.5rem",paddingRight:"0.3rem",paddingTop:"0px",
            borderBottom:"1px solid lightgray",marginBottom:"2px"
            
          }}><b>NOTIFICATIONS</b></p>
          {
             notification.length === 0 &&           
             <p style={{paddingLeft:"0.4rem",paddingRight:"0.3rem",paddingTop:"5px",
             marginBottom:"7px"
             
           }}>No new notifications</p>
          }
          {notification.map((notify, index) => (
            <DropdownItem style={{display:'flex',paddingLeft:"0.2rem",paddingRight:"0.3rem",paddingTop:"0px",paddingBottom:"2px",
            borderBottom:
             index+1 !== notification.length 
             ? "1px solid lightgray"
             : "none"
          }} 
            key={index}>
              <div style={{marginTop:"0.3rem",marginRight:"0.2rem"}}>
              <BsFillCaretRightFill/>
              </div>
              <div>
              <h5
                style={{
                  fontSize: ".8rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: "0.4rem 0rem",
                  marginBottom:"0px",
                  whiteSpace: "initial",
                  padding:"0.1rem 0rem"
                }}
              >
                {notify.notification}
              </h5>
              
              <p style={{marginBottom:"0.4rem",fontSize: ".8rem",color:"#0F5298",fontWeight:500}}><Moment fromNow>{notify.date_created}</Moment></p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* <img src={notif} alt="notif" /> */}
      <div style={{position:"relative"}}>
        <input
          placeholder="Search"
          id="search-box"
          
          style={{
            width:"9rem",
            display: showInput ? "block" : "none",
            zIndex: showInput ? "100" : "none",
            border:'none',
            outline:"none",
            borderBottom:"2px solid rgb(218, 215, 215)",
            opacity:0.5
          }}
          onChange={(e) => handleSearch(e)}
        />
          {clicked && (
            <div className="modal-search" style={{top:"100%"}}>
              {items.map((each) => (
                <div
                  className="item"
                  onClick={() => {
                    document_details(each.id);
                  }}
                 style={{paddingLeft:"6px",height:"5rem"}}
                >
                  <RiFileSearchLine fontSize={20}/>
                  <p style={{fontSize:"15px",width:"150px"}}>{each.document_name}</p>
                </div>
              ))}
            </div>
          )}
        {clicked && (
          <div
            onClick={() => {
              setClicked(!clicked);
            }}
            className="background"
          ></div>
        )}
      </div>
      <img
        src={search}
        alt="search"
        style={{ paddingRight: "0.5rem" }}
        onClick={searchToggle}
      />

<UncontrolledDropdown>
        <DropdownToggle color="" caret style={{ boxShadow: "none", padding:"0px" }}>
          <img
            className={classes.UserImg}
            src={
              userData.profile_picture !== null
                ? url + userData.profile_picture
                : "https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6"
            }
            alt="img"
            style={{display:"inline"}}
          />
        </DropdownToggle>
        <DropdownMenu right style={{ borderRadius: "5px" }}>
          <NavLink
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <DropdownItem>Profile</DropdownItem>
          </NavLink>

          <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default ScreenNotif;
