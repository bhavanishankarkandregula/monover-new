import { Component } from "react";
import Top from "../../Top";
import classes from "../Projects.module.css";
import Member from "./Member/Member";
// import Add from "../../Add";
import ScreenTop from "../../mobileComp/ScreenTop";
import * as actions from "../../../store/actions/active";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardDeck,
  // CardImg,
  // CardSubtitle,
  CardText,
  // CardTitle,
  Col,
  Row,
  Spinner
} from "reactstrap";
import { GrAdd } from "react-icons/gr";
import MemberAddModal from "./MemberAddModal";
import axios from "axios";
import { url } from "../../../GlobalUrl";
import CommonModal from "../../CommonModal/CommonModal";

class Folders extends Component {
  state = {
    data: 1,
    modal: false,
    token: localStorage.getItem("token"),
    orgId: localStorage.getItem("orgId"),
    organisationMember: [],
    modal2: false,
    additional: "Cancel",
    msg: "Do you you want to remove this member?",
    errorMemberMessage: "",
    validEmail: "",
    is_loading:true
  };

  cancel = () => {
    this.setState({ modal2: !this.state.modal2 });
  };

  setErrorMessage = () => {
    this.setState({ errorMemberMessage: "Invitation cannot be Sent" });
  };

  setValidEmail = (value) => {
    var emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]+$";
    const check = (mailID) => {
      if (mailID.match(emailRegex)) {
        return true;
      } else {
        return false;
      }
    };
    console.log("valuesss", value);

    if (value === "") {
      this.setState({ validEmail: "" });
    } else if (!check(value)) {
      this.setState({ validEmail: "Not a valid email address" });
    } else {
      this.setState({ validEmail: "" });
    }

    this.setState({ validEmail: "Not a Valid Email Address" });
  };

  toggle = () => {
    this.setState({ errorMemberMessage: "" });
    this.setState({ validEmail: "" });
    this.setState({ modal: !this.state.modal });
    this.membersListAPI();
  };

  toggle2 = () => {
    this.setState({ modal2: !this.state.modal2 });
  };

  componentDidMount() {
    if (localStorage.getItem("orgId") === null) {
      alert("First select Organisation");

      window.location.replace("./Organisation");
    }

    this.membersListAPI();
  }

  async membersListAPI() {
    this.setState({is_loading:true})
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
        console.log(res.data);
        this.props.setMembers(res.data.length);
        localStorage.setItem("members_count", res.data.length);
        console.log("Members API", res.data);
        this.setState({ organisationMember: res.data });
        console.log(this.state.organisationMember);
        this.setState({is_loading:false})
        // window.location.reload();
      })
      .catch((err) => {
        console.log("Error Aaya", err);
      });
  }

  async removeMemberAPI(id) {
    console.log("Member", this.state.orgId);
    await axios
      .post(
        url + `/api/user/organisation/members/remove/`,
        { organisation_id: this.state.orgId, user_id: id },
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      )
      .then((res) => {
        console.log("remove API", res.data);
        this.setState({ msg: "member removed!" });
        // alert("member removed !")
        this.membersListAPI();
        this.toggle2();
      })
      .catch((err) => {
        console.log("Error Aaya", err);
        this.setState({ msg: "error" });
      });
  }

  removeMemberModal = (id) => {
    this.setState({ msg: "Do you you want to remove this member?" });
    console.log(this.state.msg);
    this.setState({ modal2: true });
    localStorage.setItem("remove_mem_id", id);
  };

  confirmRemove = () => {
    this.removeMember(localStorage.getItem("remove_mem_id"));
  };

  removeMember = (id) => {
    console.log("remove ID", id);
    console.log("remove");
    this.removeMemberAPI(id);
  };

  render() {
    console.log("this.state.orgId", this.state.orgId);

    return (
      <div className="main" style={{width:"100%",margin:"0px"}}>
        <ScreenTop />
        <Top />
        {this.state.is_loading ? (
            <div style={{display:"flex",margin:"auto",marginTop:"270px"}}>
              <Spinner animation="border" style={{fontSize:"20px"}}  role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <h3 style={{marginLeft:"20px"}}>Loading Members...</h3>
            </div>
          ) : (
        <div style={{margin:"1rem 3rem 3rem 3rem"}}>
          <div className={classes.middle}>
            <h3>Members</h3>
          </div>
          {/* <div className={classes.member}> */}
          <Row>
            {/* <CardDeck> */}
            {this.state.organisationMember.map((member, index) => (
              <Col
                style={{
                  width: "auto",
                  paddingRight: "15px",
                  paddingLeft: "8px",
                }}
                sm={3}
                md={3}
                lg={3}
              >
                {console.log("orgId", localStorage.getItem("token"))}
                <Member
                  first_name={member.first_name}
                  last_name={member.last_name}
                  profilePic={member.profile_picture}
                  id={member.id}
                  key={index}
                  // modal2={this.state.modal2}
                  removeMember={this.removeMemberModal}
                />
              </Col>
            ))}

            <Col
              style={{
                width: "auto",
                paddingRight: "15px",
                paddingLeft: "8px",
              }}
              sm={3}
              md={3}
              lg={3}
            >
              <div className="cardAddHover" onClick={this.toggle}>
                <CardBody>
                  <GrAdd style={{ fontSize: "3rem", position: "relative" }} />
                </CardBody>
              </div>
            </Col>

            {/* <Col sm={4} md={4} lg={3} style={{ marginBottom: "3%" }}>
                {this.state.data.length > 0 ? (
                  <Card
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #dde5ff",
                      borderRadius: "10%",
                      cursor: "pointer",
                      boxShadow:
                        "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                    }}
                    onClick={this.toggle}
                  >
                    <CardBody style={{ padding: "45% 0%" }}>
                      <CardText
                        style={{
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <GrAdd style={{ fontSize: "3rem" }} />
                      </CardText>
                    </CardBody>
                  </Card>
                ) : (
                  <Card
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #dde5ff",
                      borderRadius: "10%",
                      cursor: "pointer",
                      padding: "3rem 4rem",
                      position: "absolute",
                      boxShadow:
                        "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                    }}
                    onClick={this.toggle}
                  >
                    <CardBody
                      style={{
                        padding: "20% 0%",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <CardText>
                        <GrAdd
                          style={{ fontSize: "3rem", position: "relative" }}
                        />
                      </CardText>
                    </CardBody>
                  </Card>
                )}
              </Col> */}
            {/* </CardDeck> */}
          </Row>
          {/* </div> */}
        </div>
          )}
        <MemberAddModal
          modal={this.state.modal}
          toggle={this.toggle}
          membersListAPI={this.membersListAPI}
          errorMemberMessage={this.state.errorMemberMessage}
          setErrorMessage={this.setErrorMessage}
          validEmail={this.state.validEmail}
          setValidEmail={this.setValidEmail}
        />
        <CommonModal
          modal={this.state.modal2}
          toggle={this.confirmRemove}
          additional={this.cancel}
          msg={this.state.msg}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMembers: (num) => dispatch(actions.setMembers(num)),
  };
};

export default connect(null, mapDispatchToProps)(Folders);
