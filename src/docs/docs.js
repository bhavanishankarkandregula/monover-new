import React, { Component } from "react";
import axios from "axios";
import "./docs.module.css";
import { url } from "../GlobalUrl";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardText,
  CardDeck,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { GrAdd } from "react-icons/gr";
import ProjectModal from "../components/CreateDocument/ProjectModal";

class Docs extends Component {
  state = {
    data: [],
    modal: false,
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log("docs", token);
    //console.log("Host",window.location.hostname);
    axios
      .get(url + "/api/project/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("RESULT", res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prev) {
    
    if(this.state.modal===true)
    this.componentDidMount();
  }

  handleProject(id, name) {
    localStorage.setItem("projectId", id);
    localStorage.setItem("projectName", name);
  }

  render() {
    return (
      <div>
        <Row>
          <CardDeck>
            {this.state.data.map((project) => (
              <Col sm={4} md={4} lg={3} style={{ marginBottom: "5%" }}>
                <NavLink
                  to={{
                    pathname: "/sub-projects",
                    aboutProps: {
                      projectTitle: project.project_name,
                      projectID: project.id,
                    },
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10%",
                    }}
                    key={project.id}
                    onClick={() => {
                      this.handleProject(project.id, project.project_name);
                    }}
                  >
                    <CardBody>
                      <CardTitle
                        tag="h5"
                        style={{
                          color: "blue",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display:"flex",
                          justifyContent:"space-between"
                        }}
                      >
                        {project.project_name}
                      </CardTitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </CardText>
                    </CardBody>
                  </Card>
                </NavLink>
              </Col>
            ))}
            <Col sm={4} md={4} lg={3} style={{ marginBottom: "5%",}}>
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
                      style={{ justifyContent: "center", textAlign: "center" }}
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
                    padding: "4rem",
                    position:"absolute",
                    boxShadow:
                      "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={this.toggle}
                >
                  <CardBody
                    style={{
                      padding: "45% 0%",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <CardText>
                      <GrAdd style={{fontSize:"3rem", position:"relative"}}/>
                    </CardText>
                  </CardBody>
                </Card>
              )}
            </Col>
          </CardDeck>
        </Row>
        <ProjectModal
          toggle={this.toggle}
          modal={this.state.modal}
          // subProjectId={documentId}
        />
      </div>
    );
  }
}

export default Docs;
