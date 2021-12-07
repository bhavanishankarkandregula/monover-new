import React, { useEffect, useState } from "react";
import "../../App.css";
import ScreenTop from "../mobileComp/ScreenTop";
import Top from "../Top";
import DisplayBar from "../Navlinks/DisplayBar";
import "./Document.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { url } from "../../GlobalUrl";
import {
  Card,
  CardTitle,
  CardText,
  CardDeck,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import SubprojectModal from "./SubprojectModal";
import { GrAdd } from "react-icons/gr";

const SubProjects = (props) => {
  const [docu, setDocu] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    callApi();
  }, [modal === false]);

  const token = localStorage.getItem("token");
  const projectId = localStorage.getItem("projectId");

  async function callApi() {
    console.log("DATA", props);

    // console.log(projectId);
    await axios
      .get(url + "/api/project/" + projectId + "/subproject/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Document", res.data);
        setDocu(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubProject = (subprojectId, sub_project_name) => {
    localStorage.setItem("subProjectId", subprojectId);
    localStorage.setItem("subProjectName", sub_project_name);
  };

  console.log(props);
  const projectName = localStorage.getItem("projectName");
  return (
    <div className="main">
      <ScreenTop />
      <Top />

      <DisplayBar title="Projects" text="{projectName}" />

      <div>
        <Row>
          <CardDeck>
            {docu.length > 0 &&
              docu.map((subProject) => (
                <Col sm={4} md={4} lg={3} style={{ marginBottom: "5%" }}>
                  <NavLink
                    to={{
                      pathname: "/document-list",
                      aboutProps: {
                        selectedid: subProject.sub_project_name,
                        documentID: subProject.id,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      style={{
                        backgroundColor: "#FEFCFF",
                        boxShadow:
                          "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                        borderRadius: "10%",
                      }}
                      onClick={() =>
                        handleSubProject(
                          subProject.id,
                          subProject.sub_project_name
                        )
                      }
                    >
                      <CardBody>
                        <CardTitle
                          tag="h5"
                          style={{
                            color: "#4E53BA",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {subProject.sub_project_name}
                        </CardTitle>
                        <CardText style={{ color: "black" }}>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </CardText>
                      </CardBody>
                    </Card>
                  </NavLink>
                </Col>
              ))}
            <Col sm={4} md={4} lg={3} style={{ marginBottom: "5%" }}>
              {docu.length > 0 ? (
                <Card
                  style={{
                    backgroundColor: "#FEFCFF",
                    border: "1px solid #dde5ff",
                    borderRadius: "10%",
                    cursor: "pointer",
                    boxShadow:
                      "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={toggle}
                >
                  <CardBody style={{ padding: "45% 0%" }}>
                    <CardText
                      style={{ justifyContent: "center", textAlign: "center" }}
                    >
                      <GrAdd style={{ fontSize: "3rem" }} />
                    </CardText>
                  </CardBody>
                </Card>
              ) : (
                <Card
                  style={{
                    backgroundColor: "#FEFCFF",
                    border: "1px solid #dde5ff",
                    borderRadius: "10%",
                    cursor: "pointer",
                    padding: "4rem",
                    position: "absolute",
                    boxShadow:
                      "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={toggle}
                >
                  <CardBody
                    style={{
                      padding: "45% 0%",
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
            </Col>
          </CardDeck>
        </Row>
      </div>
      <SubprojectModal
        toggle={toggle}
        modal={modal}
        projectId={projectId}
        docu={docu}
        setDocu={setDocu}
      />
    </div>
  );
};

export default SubProjects;
