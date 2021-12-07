import { Component } from "react";
import Menu from "./Menu";
//import logout from "../images/Logout.png";
//import folders from "../images/sidepanel/folders.png";
import members from "../images/sidepanel/members.png";
import star from "../images/sidepanel/star.png";
import profile from "../images/sidepanel/profile.png";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../GlobalUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Organization() {
  const OrganisationName = useSelector(
    (state) => state.organizationReducer[0].orgName
  );
  return <>{OrganisationName}</>;
}

// const [joinedOrganisation, setJoinedOrganisation] = useState([]);
// const [ownedOrganisation, setOwnedOrganisation] = useState([]);

// const dispatch = useDispatch();

class Sidepanel extends Component {
  state = { Name_Of_Organisation: "",joinedOrganisation:[],ownedOrganisation:[] };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.organisationSelectedAPI();
      this.organisationListAPI();
    }
  }

  token = localStorage.getItem("token");
  



  async organisationListAPI() {
    await axios
      .get(url + "/api/organisation/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Organisation API", res.data);
        this.props.dispatch({
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
          this.setState({joinedOrganisation:res.data.joined_organisation});
        }
        if (res.data.owned_organisation) {
          localStorage.setItem("own_org", res.data.owned_organisation.length);
          
          this.setState({ownedOrganisation:res.data.owned_organisation});
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

   async membersListAPI(){
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
        this.props.dispatch({ type: "SetMembers", members: parseInt(res.data.length) });
        // this.props.setMembers(res.data.length);
        // localStorage.setItem('members_count',res.data.length);
        console.log("Members API", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  changeOrganization(name){
    this.props.dispatch({
      type: "Change",
      payload: name,
    });
  };

   selectedOrganisation = (id, orgName) => {
    console.log("hello",id,orgName)
    localStorage.setItem("orgId", id);
    localStorage.setItem("orgName", orgName);
    this.changeOrganization(orgName);
    // if (boxColor == "none") {
    //   console.log("Phase 1");
    //   setBoxColor("0px 0px 11px 0px rgba(0,0,0,0.75)");
    // } else {
    //   console.log("Phase 2");
    //   setBoxColor("none");
    // }
    // props.setOrg();
  };


  async organisationSelectedAPI() {
    await axios
      .get(url + "/api/selected/organisation/", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => {
        console.log("Selected Organisation", res);
        this.setState({ Name_Of_Organisation: res.data.name });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }

  gotoProjects() {
    window.location.replace("/review");
  }

  render() {
    let image = null;
    const docs = (
      <div className="docs">
        <div style={{ backgroundColor: "#DDE5FF", marginRight: "30px" }}>
          <span style={{ color: "#689595" }}>AR Docs</span>
        </div>
        <div
          style={{
            backgroundColor: "#FEFCFF",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <span style={{ color: "#4E53BA" }}>School Docs</span>
        </div>
        <div style={{ backgroundColor: "#FFF4F2", marginRight: "30px" }}>
          <span style={{ color: "#956891" }}>ML Docs</span>
        </div>
        <div style={{ backgroundColor: "#DDE5FF" }}>
          <span style={{ color: "#689595" }}>Planning Sheets</span>
        </div>
      </div>
    );
    switch (this.props.active) {
      // case "/folders":
      //   image = (
      //     <img
      //       src={folders}
      //       alt="folder/>"
      //       className="image"
      //       style={{ width: "100%" }}
      //     />
      //   );
      //   break;
      case "/members":
        image = <img src={members} alt="members" className="image" />;
        break;
      case "/starred":
        image = <img src={star} alt="star" className="image" />;
        break;
      case "/profile":
        image = <img src={profile} alt="profile" className="image" />;
        break;
      case "/projects":
        image = <img src={profile} alt="profile" className="image" />;
        break;
      default:
        image = null;
        break;
    }
    // console.log(this.OrganisationName);

    return (
      <>
        {this.props.active === "/registration-form" ||
        this.props.active === "/emailverification" ||
        this.props.active === "/emailverificationfailed" ||
        this.props.active === "/login-form" ||
        this.props.active === "/forget-password" ||
        this.props.active === "/new-password" ||
        this.props.active === "/otp" ||
        this.props.active === "/home" ? (
          ""
        ) : (
          <div className="sidepanel">
            {/* <Link to="/DragAndDrop"> */}
            <span
              style={{
                fontSize: "24px",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={this.gotoProjects}
            >
              MONOVER
            </span>
            {/* </Link> */}
            <br />
            <p className="space">
              {/* <b>{this.props.orgName || localStorage.getItem("orgName")}</b> */}
              <select
                    className="select"
                    style={{ maxWidth: "200px",paddingLeft:"10px" }}
                    type="select"
                    // value={subprojectId}
                    // name="subprojects"
                    onChange={(e) => {
                      console.log(e.target.value);
                      // console.log(ownedOrganisation)
                      let org = this.state.ownedOrganisation.filter((org)=>Number(org.id) === Number(e.target.value))
                      console.log(org[0].name)
                      this.props.dispatch({
                        type: "SetOrgName",
                        orgName: org[0].name,
                      });
                      this.selectedOrganisation(org[0].id, org[0].name);
                      // selectOrganisationAPI(organisation.id);
                      this.membersListAPI();
                    }}
                  >
                    <option>Select Organisation</option>
                    {this.state.ownedOrganisation.map((org) => (
                      org.name ===  localStorage.getItem("orgName") ? (
                        <option selected value={org.id}>
                         {org.name}
                        </option>
                      ) :(
                       
                      <option value={org.id}>
                        {org.name}
                      </option>
                      )
                    ))}
                    
                  </select>

              {/* <b>{this.state.Name_Of_Organisation}</b> */}
            </p>
            <Menu />
            {this.props.clicked && docs}
            {image}
            {/* <div style={{margin:"2rem"}}>
              <Row>
                <Card
                  style={{
                    textAlign: "center",
                    margin: "0rem 1rem",
                    borderRadius: "1.5rem",
                  }}
                >
                  <CardBody>
                    <CardText>ACP</CardText>
                  </CardBody>
                </Card>
              </Row>
            </div> */}
            {/* <span className="logout" onClick={this.handleLogout}>
              <img src={logout} alt="logout" style={{ marginRight: ".8rem" }} />
              LogOut
            </span> */}
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    active: state.active.active,
    orgName: state.active.orgName,
  };
};
export default connect(mapStateToProps, null)(Sidepanel);
