import React, { useEffect, useState } from "react";
import "./Slider.css";
import Menu from "../Menu";
import Backdrop from "../Backdrop/Backdrop";
import { useHistory } from "react-router";
import axios from "axios";
import { url } from "../../GlobalUrl";
import { useDispatch } from "react-redux";
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { VscOpenPreview, FiUpload } from "react-icons/all";


const Slider = (props) => {
  var history = useHistory();
  let attachedClasses = "SideDrawer Close";
  if (props.open) {
    attachedClasses = "SideDrawer Open";
  }
  const token = localStorage["token"];
  const orgId = localStorage["orgId"];

  const [joinedOrganisation, setJoinedOrganisation] = useState([]);
  const [ownedOrganisation, setOwnedOrganisation] = useState([]);
  const dispatch = useDispatch();



  useEffect(() => {
    organisationListAPI();
  }, []);

  async function organisationListAPI() {
    await axios
      .get(url + "/api/organisation/", {
        headers: {
          Authorization: `Bearer ${token}`,
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
          // if (res.data.owned_organisation.length === 1) {
          //   selectedOrganisation(
          //     res.data.owned_organisation[0].id,
          //     res.data.owned_organisation[0].name
          //   );
          // }
        }
        console.log("Joined", res.data);
      })
      .catch((err) => {
        console.log("Error Aaya", err);
      });
  }

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
    console.log("hello", orgId, orgName)
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


  function gotoProjects() {
    window.location.replace("/review");
  }

  const logout = () => {
    localStorage.clear();
    history.replace("/login");
  };

  // console.log(attachedClasses);
  // console.log("HELLO", props.open);
  return (
    <div  >
      <Backdrop show={props.open} onClick={props.close} />
      <div style={{ zIndex: 20 }} className={attachedClasses}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",

          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: "-15px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={() => gotoProjects()}
            >
              MONOVER
            </span>
            <span>
              <i
                className="fa fa-times fa-lg"
                style={{
                  color: "red",
                  verticalAlign: "text-top",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={props.close}
              ></i>
            </span>
          </div>
          <br />
          <select
            className="select"
            style={{ maxWidth: "200px", paddingLeft: "10px" }}
            type="select"
            // value={subprojectId}
            // name="subprojects"
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value === "allOrg") {
                window.location.replace("/Organisation");
              } else {
                console.log(ownedOrganisation);
                let org = ownedOrganisation.filter(
                  (org) => Number(org.id) === Number(e.target.value)
                );
                console.log(org[0].name);
                dispatch({
                  type: "SetOrgName",
                  orgName: org[0].name,
                });
                selectedOrganisation(org[0].id, org[0].name);
                // selectOrganisationAPI(organisation.id);
                membersListAPI();
                // window.location.reload();
              }
            }}
          >
            {ownedOrganisation.map((org, i) =>
              localStorage.getItem("orgName") ? (
                (org.name === localStorage.getItem("orgName") && !(window.location.href.includes("/Organisation"))) ? (
                  <option selected value={org.id}>
                    {org.name}
                  </option>
                ) : (
                  <option value={org.id}>{org.name}</option>
                )
              ) : (i === 0 && !(window.location.href.includes("/Organisation"))) ? (
                <option selected value={org.id}>
                  {org.name}
                </option>
              ) : (
                <option value={org.id}>{org.name}</option>
              )
            )}
            <option value="allOrg">All organizations</option>

          </select>
        </div>
        <Menu>
          <Nav className='d-flex justify-content-center flex-column mt-4'>
            <Nav.Item>
              <LinkContainer to='/review'>
                <Nav.Link><VscOpenPreview style={{ marginRight: '7px' }} color='black' /><h5 style={{ fontWeight: 'bold', color: 'black',marginTop:'4px' }}>Review</h5></Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to='/DragAndDrop'>
                <Nav.Link><FiUpload style={{ marginRight: '7px' }} color='black' /><h5 style={{ fontWeight: 'bold', color: 'black',marginTop:'6px' }}>Upload</h5></Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Menu>
        {/* <a
          onClick={logout}
          style={{
            textDecoration: "none",
            position: "absolute",
            bottom: "30px",
            cursor: "pointer",
          }}
        >
          <span>
            <strong>Logout</strong>
          </span>
        </a> */}
      </div>
    </div>
  );
};

export default Slider;
