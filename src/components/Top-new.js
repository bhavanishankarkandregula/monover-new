import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navlinks/Projects.module.css";
import search from "../images/Search.png";
import MenuIcon from "./menuIcon";
import User from "./User";
import axios from "axios";
import { url } from "../GlobalUrl";
import "./Top.css";
import star2 from "../images/upload.png";
import upload2 from "../images/upload2.png";
// import team2 from "../images/team.png"
// // import projects from "../images/projects.png";
// // import folder2 from '../images/Folder.png';
// import { connect } from "react-redux"
import { VscOpenPreview, FiUpload, RiFileSearchLine } from "react-icons/all";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AiFillEye, AiOutlineFileJpg, GrDocumentPdf } from "react-icons/all";
import Select from 'react-select';
import WordIcon from "../images/word-file.png";
import TextIcon from "../images/text-file.png";
import InvalidIcon from "../images/invalid-file.png";

const Top = () => {
  const [searchq, setSearchq] = useState('');
  const [clicked, setClicked] = useState(false);
  const [items, setItems] = useState([]);
  const token = localStorage["token"];
  const orgId = localStorage["orgId"];
  const dispatch = useDispatch();
  const [joinedOrganisation, setJoinedOrganisation] = useState([]);
  const [ownedOrganisation, setOwnedOrganisation] = useState([]);
//   const [selectedOrgValue, setSelectedOrgValue] = useState();
//   const [selectedOrgLabel, setSelectedOrgLabel] = useState();



  useEffect(() => {
    organisationListAPI();
  }, []);



  const document_details = (id) => {
    localStorage["documentId"] = id;
    window.location.assign(`/document-details/${id}`);
  };

  const organisationListAPI = async () => {
    await axios
      .get(url + "/api/organisation/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Organisation API", res.data);
        dispatch({
          type: "SetOrg",
          org: parseInt(
            parseInt(res.data?.joined_organisation.length) +
            parseInt(res.data?.owned_organisation.length)
          ),
        });
        // this.props.setOrg(parseInt(res.data?.joined_organisation)+parseInt(res.data?.owned_organisation))

        if (res.data.joined_organisation) {
          localStorage.setItem(
            "joined_org",
            res.data.joined_organisation.length
          );
          setJoinedOrganisation(res.data.joined_organisation);
        }
        if (res.data.owned_organisation) {
          localStorage.setItem("own_org", res.data.owned_organisation.length);

          setOwnedOrganisation(res.data.owned_organisation);
          //       localStorage.setItem("orgId", id);
          // localStorage.setItem("orgName", orgName);
          console.log("jjjjjjjjjj", localStorage.getItem("orgId"));
          if (!localStorage.getItem("orgId")) {
            selectedOrganisation(
              res.data.owned_organisation[0].id,
              res.data.owned_organisation[0].name
            );
          }
        }
        console.log("Joined", res.data);
      })
      .catch((err) => {
        console.log("Error Aaya", err);
      });
  };

  const membersListAPI = async () => {
    await axios
      .get(
        url + `/api/user/organisation/members/${localStorage.getItem("orgId")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        localStorage.setItem("members_count", res.data.length);
        dispatch({ type: "SetMembers", members: parseInt(res.data.length) });
        // this.props.setMembers(res.data.length);
        // localStorage.setItem('members_count',res.data.length);
        console.log("Members API", res.data);
        window.location.replace("/review");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const changeOrganization = (name) => {
    dispatch({
      type: "Change",
      payload: name,
    });
  };

  const selectedOrganisation = (id, orgName) => {
    console.log("hello", id, orgName);
    localStorage.setItem("orgId", id);
    localStorage.setItem("orgName", orgName);
    changeOrganization(orgName);
    // if (boxColor == "none") {
    //   console.log("Phase 1");
    //   setBoxColor("0px 0px 11px 0px rgba(0,0,0,0.75)");
    // } else {
    //   console.log("Phase 2");
    //   setBoxColor("none");
    // }
    // props.setOrg();
  };

  const gotoProjects = () => {
    window.location.replace("/review");
  };

  const handleSearch = (e) => {
    setSearchq(e.target.value);
    // setSearchq(e.target.value);
    // alert(e.target.value)
    console.log("setSearch",setSearchq)
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
    if(searchq=='')
    {}
    else if(e.target.value === 'Enter')
    console.log('do validate');
  
    {
      // var Input = React.createClass({
      //   render: function () {
      //     return <input type="text" onKeyDown={this._handleKeyDown} />;
      //   },
      //   _handleKeyDown: function(e) {
      //     if (e.key === 'Enter') {
      //       console.log('do validate');
      //     }
      //   }
      // });
      
    console.log("searchQuary", e.target.value);
    const body = { organisation_id:orgId, query:searchq };

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
    window.onscroll = function () { };
  }

  }





  const selectOptions = []
  let selectedOrgValue
  let selectedOrgLabel
  ownedOrganisation.map((org, i) =>{
    if(localStorage.getItem("orgName"))  {
        if(org.name === localStorage.getItem("orgName") && !(window.location.href.includes("/Organisation")) ){
            selectedOrgValue = org.id
            selectedOrgLabel = org.name
            // setSelectedOrgValue(org.id)
            // setSelectedOrgLabel(org.name)
            // alert("OrggggName: "+selectedOrgValue)
        }else{
            selectedOrgValue = org.id
            selectedOrgLabel = org.name
            // setSelectedOrgValue(org.id)
            // setSelectedOrgLabel(org.name)
            
        }
        // 
    }else if(i === 0 && !(window.location.href.includes("/Organisation")) ){
        selectedOrgValue = org.id
        selectedOrgLabel = org.name
        // setSelectedOrgValue(org.id)
        // setSelectedOrgLabel(org.name)

        
    }else{
        selectedOrgValue = org.id
        selectedOrgLabel = org.name  
        // setSelectedOrgValue(org.id)
        // setSelectedOrgLabel(org.name)

    }
      selectOptions.push({
          value: org.id,
          label: org.name
      })
  })
  
  selectOptions.push({
      value: 'allOrg',
      label: 'All organizations'
  })





  return (
    <>
      <div className={classes.top}>
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "700",
              cursor: "pointer",
              margin: "15px",
            }}
            onClick={() => gotoProjects()}
          >
            MONOVER
          </span>
          <div>
          <Select
          className={classes.basic_single}
          classNamePrefix="select"
          defaultValue={{value: selectedOrgValue, label: selectedOrgLabel}}
          name="orgination"
          onChange={(e) => {
            console.log(e.value);
            if (e.value === "allOrg") {
              window.location.replace("/Organisation");
            } else {
              console.log(ownedOrganisation);
              let org = ownedOrganisation.filter(
                (org) => Number(org.id) === Number(e.value)
              );
              console.log(org[0]?.name);
              dispatch({
                type: "SetOrgName",
                orgName: org[0]?.name,
              });
              selectedOrganisation(org[0]?.id, org[0]?.name);
              // selectOrganisationAPI(organisation.id);
              membersListAPI();
              // window.location.reload();
            }
          }}
          options={selectOptions}
        />
          </div>
        </div>

        {/* <MenuIcon /> */}
        <span>
          <img src={search} alt="search" />
          <input
            id="search-box"
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
            
            className={classes.input}
            style={{ zIndex: 1 }}
          />
          {clicked && (
            <div className="modal-search">
              {items.map((each) => (
                <div
                  className="item"
                  onClick={() => {
                    document_details(each.id);
                  }}
                 
                >
                  <RiFileSearchLine fontSize={25}/>
                  <p>{each.document_name}</p>
                </div>
              ))}
            </div>
          )}
        </span>

        {clicked && (
          <div
            onClick={() => {
              setClicked(!clicked);
            }}
            className="background"
          ></div>
        )}

        <User />
      </div>

     {window.location.href.includes("/DragAndDrop") && (
        <div className="links">
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
                  style={{ textDecoration: "none" }}
                
                >
              
                  <FiUpload style={{ marginRight: "4px" }} size={20} />
                  <span style={{ margin: "0px",fontWeight:100,color:'white',background:'' }}>
                    <p>Upload</p>
                  </span>
                </NavLink>
              </Card.Body>
            </Card>
          )} 
          {!window.location.href.includes("/review") && (
            <Card style={{ width: "125px", marginTop: "3px", border: "none" }}>
              <Card.Body style={{ padding: "10px" }}>
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
          )}
        </div>
      )}
    </>
  );
};

export default Top;
