import React, { useEffect, useState } from "react";
import ScreenTop from "../mobileComp/ScreenTop";
import Top from "../Top";
import "./OrganisationPage.css";
import OrganisationCard from "./OrganisationCard";
import axios from "axios";
import { url } from "../../GlobalUrl";
import { Button, Card, CardBody, Col, Row,Spinner } from "reactstrap";
import Add from "../Add";
import OrganisationModal from "./OrganisationModal";
import { GrAdd } from "react-icons/gr";
import * as actions from "../../store/actions/active";
import { useDispatch } from "react-redux";

import JoinedOrganisationCard from "./JoinedOrganisationCard";
import CommonModal from "../CommonModal/CommonModal";

const OrganisationPage = (props) => {
  const [joinedOrganisation, setJoinedOrganisation] = useState([]);
  const [ownedOrganisation, setOwnedOrganisation] = useState([]);
  const [modal, setModal] = useState(false);
  const [boxColor, setBoxColor] = useState("none");
  const [removeOrgid, setRemoveOrgid] = useState(0);
  const [addColor, setAddColor] = useState("#888888");
  const [addNumber, setAddNumber] = useState(0);
  const dispatch = useDispatch();
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState("");
  const commonToggle = () => setCommonModal(!commonModal);
  const [commonModal2, setCommonModal2] = useState(false);
  const commonToggle2 = () => setCommonModal2(!commonModal2);
  const [is_org_loading, set_org_loading] = useState(true);
  // const [additional, setAdditional] = useState('Cancel')

  const [pin, setPin] = useState({
    id: "",
    color: "",
  });

  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("orgId");

  const toggle = () => setModal(!modal);

  useEffect(() => {
    organisationListAPI();
  }, []);

  async function organisationListAPI() {
    set_org_loading(true);
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
          if (res.data.owned_organisation.length === 1) {
            selectedOrganisation(
              res.data.owned_organisation[0].id,
              res.data.owned_organisation[0].name
            );
          }
        }
        set_org_loading(false);
        console.log("Joined", res.data);
      })
      .catch((err) => {
        console.log("Error Aaya", err);
      });
  }

  // async function organisationSelectedAPI() {
  //   await axios
  //     .get(url + "/api/selected/organisation/", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("Selected Organisation",res);
  //     })
  //     .catch((err) => {
  //       console.log("ERROR", err);
  //     });
  // }

  // async function selectOrganisationAPI(ID) {
  //   await axios
  //     .post(url + "/api/selected/organisation/", {"organisation_id":ID} ,{
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("post Selected Organisation",res);
  //     })
  //     .catch((err) => {
  //       console.log("ERROR", err);
  //     });
  // }

  async function removeOrganisationAPI(id) {
    await axios
      .delete(url + `/api/organisation/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status <= 300)
          setMsg("Organisation removed successfully!");
        setCommonModal(false);
        setCommonModal2(true);
        // alert("Org remove successfully !");
        // window.location.replace("/Organisation");
        organisationListAPI();
        localStorage.removeItem("org_del_id");
      })
      .catch((err) => {
        console.log("Error");
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

  const removeOrganisation = (id) => {
    setRemoveOrgid(id);
    removeOrganisationAPI(id);
  };
  const changeOrganization = (name) => {
    dispatch({
      type: "Change",
      payload: name,
    });
  };

  const selectedOrganisation = (id, orgName) => {
    localStorage.setItem("orgId", id);
    localStorage.setItem("orgName", orgName);
    changeOrganization(orgName);
    if (boxColor == "none") {
      console.log("Phase 1");
      setBoxColor("0px 0px 11px 0px rgba(0,0,0,0.75)");
    } else {
      console.log("Phase 2");
      setBoxColor("none");
    }
    // props.setOrg();
  };

  const addToFav = (id) => {
    console.log("CHECKID", id);

    console.log(pin);
    let count = addNumber;
    console.log("Count", count);
    if (addColor == "#888888") {
      console.log("#888888");
      if (addNumber <= 3 && addNumber >= 0) {
        setAddColor("black");
        setAddNumber(count + 1);
        setPin((prev) => {
          console.log("PIN", pin);
          return {
            ...prev,
            id: id,
            color: "black",
          };
        });
      } else {
        setAddColor("red");
      }
    } else if (addColor == "black") {
      console.log("black");
      if (addNumber <= 3 && addNumber >= 0) {
        setAddColor("#888888");
        setAddNumber(count - 1);
      }
    }
  };

  const removeOrganisationModal = (id) => {
    setMsg("Are you sure you want to delete the organisation? All the documents associated with this organisation will also be deleted");
    setCommonModal(true);
    localStorage.setItem("org_del_id", id);
  };

  const confirmRemove = () => {
    removeOrganisation(localStorage.getItem("org_del_id"));
  };

  const cancel = () => {
    setCommonModal(false);
  };

  return (
    <>
    <div className="main" style={{ width: "100%" }}>
      <ScreenTop />
      <Top />
        {is_org_loading ? (
            <div style={{margin:"auto",textAlign:"center",marginTop:"10rem"}}>
              <Spinner animation="border" style={{fontSize:"20px",marginBottom:"10px"}}  role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <h3 style={{marginLeft:"20px"}}>Loading Organisations...</h3>
            </div>
          ) : (
        <div>
                  
        <div className=" mr-md-4 ml-md-4" >
          <div className="HeadingOrganisation  ml-md-5">
            <h3>My Organisation(s)</h3>
          </div>
          <Row >
            {ownedOrganisation && ownedOrganisation.length === 0 ? (
              <h5>You've not created any organisation</h5>
            ) : (
              ownedOrganisation.map((organisation, index) => (
                <Col
                  style={{
                    width: "auto",
                    paddingRight: "0px",
                    paddingLeft: "0px",
                    marginTop:"15px"
                  }}
                  className="px-xs-0"
                  xs={6}
                  sm={3}
                  md={3}
                  lg={3}
                  onClick={() => {
                    dispatch({
                      type: "SetOrgName",
                      orgName: organisation.name,
                    });
                    selectedOrganisation(organisation.id, organisation.name);
                   
                    membersListAPI();
                  }}
                >
                  <OrganisationCard
                    name={organisation.name}
                    id={organisation.id}
                    key={index}
                    ListAPI={organisationListAPI}
                    Favourites={addToFav}
                    addColor={addColor}
                    removeOrganisation={removeOrganisationModal}
                    noOfDocs={organisation.count}
                  />
                </Col>
              ))
            )}
            <Col
            className="mr-xs-3"
              style={{
                width: "auto",
                paddingRight: "0px",
                paddingLeft: "0px",
                marginTop:"20px"
              }}
              
              xs={6}
              sm={3}
              md={3}
              lg={3}
            >


<div style={{ display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div
        className="cardLayout"
        style={{border:"1px solid lightgrey"}}
        onClick={() => {
          {
            toggle();
          }
        }}
      >
        <CardBody className="mt-4 mt-md-5 pl-md-3 pr-md-3">
        
                  <GrAdd style={{ fontSize: "3rem", position: "relative" }} />
                
        </CardBody>
      </div>
    </div>

            </Col>
          </Row>
        </div>
        <div className="ml-2 mr-md-4 ml-md-4 mt-md-5">
          <div className="HeadingOrganisation  ml-md-5">
            <h3>Joined Organisation(s)</h3>
          </div>
          <Row>
            {joinedOrganisation && joinedOrganisation.length === 0 ? (
              <h5 className="notJoinedOrg" >You're not added to any organisation</h5>
            ) : (
              joinedOrganisation &&
              joinedOrganisation.map((organisation, index) => (
                <Col
                style={{
                  width: "auto",
                  paddingRight: "15px",
                  paddingLeft: "8px",
                  marginTop:"15px"
                }}
                className="mr-xs-3"
                xs={6}
                sm={3}
                md={3}
                lg={3}
                  onClick={() => {
                    dispatch({
                      type: "SetOrgName",
                      orgName: organisation.name,
                    });
                    selectedOrganisation(organisation.id, organisation.name);
                  }}
                >
                  <OrganisationCard
                    name={organisation.name}
                    id={organisation.id}
                    key={index}
                    removeOrganisation={removeOrganisationModal}
                    noOfDocs={organisation.count}
                  />
                </Col>
              ))
            )}
          </Row>
        </div>
        </div>
          )}
      </div>
      <OrganisationModal
        toggle={toggle}
        modal={modal}
        organisationListAPI={organisationListAPI}
        ownedOrganisation={ownedOrganisation}
      />
      <CommonModal modal={commonModal2} toggle={commonToggle2} msg={msg} />
      <CommonModal
        modal={commonModal}
        toggle={confirmRemove}
        msg={msg}
        additional={cancel}
      />
    </>
  );
};

export default OrganisationPage;
