import React, { useContext, useState, useEffect } from "react";
import "../../App.css";
import "./Profile.css";
import { url } from "../../GlobalUrl";
import { NavLink } from "react-router-dom";
import ProfileBar from "./ProfileBar";
import "./Input.css";
import "./MediaQueries.css";
import { ImageContext } from "../ImageContext";
import { UserContext } from "../UserContext";
import ScreenTop from "../mobileComp/ScreenTop";
import axios from "axios";
import {  Button,Modal, ModalBody, ModalFooter } from "reactstrap"

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  // organisation_name: "",
  profile_pic: null,
  FirstnameError: "",
  LastnameError: "",
  EmailError: "",
  // organisation_name_Error: "",
};






const Profile = () => {
  /*-------------------- USESTATE --------------------*/

  

  const [userData, setUserData] = useContext(UserContext);
  const [profile, setProfile] = useState(userData);
  const [imagePath, setImagePath] = useState('https://us.123rf.com/450wm/nexusby/nexusby1805/nexusby180500076/100911331-stock-vector-default-avatar-photo-placeholder-profile-picture.jpg?ver=6')
  const formData = new FormData;

/*-------------------- USECONTEXT --------------------*/
  const [image, setImage] = useContext(ImageContext);

  /*-------------------- VALIDATION --------------------*/
  const organisationName = localStorage.getItem("orgName");
  const token = localStorage.getItem("token");

  const [modal, setModal] = useState(false)
  const [msg, setMsg] = useState("")

  
useEffect(() => {
  
  axios
  .get(url + "/api/token/user/", {
  headers: {
  Authorization: `Bearer ${token}`,
  },
  })
  .then((res) => {
  console.log("res", res.data);
  setProfile(res.data);
  res.data.profile_picture!== null && setImagePath(url+res.data.profile_picture);
     setImage({profileImg:url+res.data.profile_picture});
  })
  .catch((error) => {
  console.log(error);
  });

  console.log("localStorage.getItem('pic'))",localStorage.getItem('pic'))

  // if(localStorage.getItem('pic')){
  //   if(localStorage.getItem('pic') !== null){
  //     setImagePath(localStorage.getItem('pic'))
  //   }
    
  // }  
  }, []);

  const toggle = () => {
    setModal(!modal)
    window.location.replace("/profile");
  }
  

  const InputEvent = (e) => {
    const { name, value } = e.target;
    console.log(name, value);


    if (name === "profile_picture") {
      setImagePath(URL.createObjectURL(e.target.files[0]));

      setProfile((prevData) => {
        return {
          ...prevData,
          [name]: e.target.files[0],
        };
      });
    } else {

      if(name === "email" && value !== "")
      {

        setProfile((prevData) => {
          return {
            ...prevData,
            [name]: value,
            EmailError: ""
          };
        });
        
      }else if(name === "last_name" && value !== "")
      {
        setProfile((prevData) => {
          return {
            ...prevData,
            [name]: value,
            LastnameError: ""
          };
        });
        
      }else if(name === "first_name" && value !== "")
      {
        setProfile((prevData) => {
          return {
            ...prevData,
            [name]: value,
            FirstnameError: ""
          };
        });
        
      }
      else{
        setProfile((prevData) => {
          return {
            ...prevData,
            [name]: value,
          };
        });
      }
    }
    console.log("Profile", profile);
  };



  async function updateProfileApi() {

    formData.append("first_name",profile.first_name);
    formData.append("last_name",profile.last_name);
    formData.append("email",profile.email);
    console.log("profile.profile_picture",profile.profile_picture);
    if(profile.profile_picture !== null){
      if(typeof profile.profile_picture=== typeof "string"){
        // formData.append("profile_picture",profile.profile_picture); 
      }
      else{
        formData.append("profile_picture",profile.profile_picture,profile.profile_picture.name);
        setImage(URL.createObjectURL(profile.profile_picture));
      }
      // formData.append("profile_picture",profile.profile_picture,profile.profile_picture.name);
      // setImage(URL.createObjectURL(profile.profile_picture));
    }


    setUserData(profile);

    console.log("PROFILE", typeof profile);

    //const token = localStorage.getItem("token");
    await axios.patch(url + `/api/user/${userData.id}/`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res)
        if (res.status === 200)
          setMsg("Data updated Successfully");
          setModal(true);
          localStorage.setItem("pic",res.data.profile_picture);
          
          
      })
      .catch(err => {
        console.log(err);
      })

  }


  const validate = () => {
    let FirstnameError = "";
    let LastnameError = "";
    let EmailError = "";
    console.log("profileeee",profile)
    // let organisation_name_Error = "";

    if (!profile.first_name) {
      FirstnameError = "Firstname cannot be kept empty";
    }

    if (!profile.last_name) {
      LastnameError = "Lastname cannot be kept empty";
    }

    if (profile.email && !profile.email.includes("@"))  {
      EmailError = "Invalid Email";
    }
    if(profile.email && !profile.email.includes(".com")){
      EmailError = "Invalid Email";
    }

    if (!profile.email) {
      EmailError = "Email Cannot Be Kept Empty";
    }

    // if (!profile.organisation_name) {
    //   organisation_name_Error = "Phone Number Cannot Be Kept Empty";
    // }

    if (EmailError || FirstnameError || LastnameError) {
      setProfile({...profile,EmailError, FirstnameError, LastnameError});
      return false;
    }
    return true;
  };

  /*-------------------- BUTTON CLICKED --------------------*/

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      //setProfile(initialState);
      updateProfileApi();
    }
  };

  /*-------------------- UPLOAD NEW PICTURE --------------------*/

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage({ profileImg: URL.createObjectURL(e.target.files[0]) });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    // preview=URL.createObjectURL(e.target.files[0]);
    // console.log(preview);
    // urlNew = URL.createObjectURL(e.target.files[0]);
    // console.log(urlNew);
  };


  console.log("PRO", image.profileImg,url+ profile.profile_picture)
  return (
    <div className="main" style={{width:"100%"}}>
      <ScreenTop />
      <ProfileBar title="My Profile" text=""/>
      <div className="container">
        <div className="Profile">
          <img className="UserRound" src={imagePath} alt="user" />
          <div className="Admin">
            <div className="Username">
              <h2>{userData.first_name} {userData.last_name}</h2>
              <span>({organisationName})</span>
            </div>
            <small>{userData.organisation_name}</small>
            {/* <button>Upload new picture</button> */}
            <div className="uploadImage">
            <input
              className="img_upload"
              type="file"
              id="pic"
              name="profile_picture"
              onChange={(e) => { imageHandler(e);InputEvent(e) }}
              accept="image/*"
            />
            <label for="pic" className="UploadPic">
              Upload new picture
            </label>
            </div>
          </div>
        </div>
        <form>
          <div className="Length">
            <div className="Input">
              <div className="InputField">
                <label className="ILabel" for="Firstname">
                  Firstname
                </label>
                <input
                  className="IInput"
                  name="first_name"
                  value={profile.first_name}
                  type="text"
                  id="Firstname"
                  placeholder="Firstname"
                  onChange={InputEvent}
                />
                <div style={{ fontSize: "12px", color: "red" }}>
                  {profile.FirstnameError}
                </div>
              </div>
              <div className="InputField">
                <label className="ILabel" for="last_name">
                  Lastname
                </label>
                <input
                  className="IInput"
                  name="last_name"
                  value={profile.last_name}
                  type="text"
                  id="Lastname"
                  placeholder="Lastname"
                  onChange={InputEvent}
                />
                <div style={{ fontSize: "12px", color: "red" }}>
                  {profile.LastnameError}
                </div>
              </div>
              <div className="InputField">
                <label className="ILabel" for="Email">
                  Email
                </label>
                <input
                  className="IInput"
                  name="email"
                  value={profile.email}
                  type="email"
                  id="Email"
                  placeholder="Email"
                  onChange={InputEvent}
                />
                <div style={{ fontSize: "12px", color: "red" }}>
                  {profile.EmailError}
                </div>
              </div>
              {/* <div className="InputField">
                <label className="ILabel" for="Phone">
                  Name of the organization
                </label>
                <input
                  className="IInput"
                  name="organisation_name"
                  value={profile.organisation_name}
                  type="text"
                  id="Phone"
                  placeholder="Name of the Organization"
                  onChange={InputEvent}
                />
                <div style={{ fontSize: "12px", color: "red" }}>
                  {profile.organisation_name_Error}
                </div>
              </div> */}
            </div>
          </div>
          <div className="Button">
            <button className="LeftButton mr-2 mr-md-0" onClick={handleSubmit}>
              Save Changes
            </button>
            <NavLink to="/change-password">
              <button className="RightButton" >Change Password</button>
            </NavLink>
          </div>
        </form>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>{msg}</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={toggle}
              style={{ fontSize: "12px" }}
            >
              Okay
            </Button>
            {/* {verify && <Button color="primary" onClick={()=>{toggle();verificationEmailApi();}} style={{fontSize:"12px"}}>
                Resend Verification email
              </Button>} */}
          </ModalFooter>
        </Modal>
    </div>
  );
};

export default Profile;
