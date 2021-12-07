import React, { useState, useEffect } from "react"
import axios from "axios"
import { url } from "../../GlobalUrl"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Row,
  Col,
  Spinner,
  FormGroup,
  Label
} from "reactstrap"
import "./DocumentList.css"
import CommonModal from "../CommonModal/CommonModal"

const AddSubProject = (props) => {
  var formData = new FormData()
  const [title, setTitle] = useState()
  const [projectId, setPorjectId] = useState(props.projectId)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const [commonModal, setCommonModal] = useState(false)
  const [msg, setMsg] = useState("")
  const [subprojectId, setSubProjectId] = useState(props.subProjectId)
  const [projectName, setProjectName] = useState(props.projectName)
  const [subProjectData, setSubProjectData] = useState({})
  const orgId = localStorage.getItem("orgId")
  const commonToggle = () => setCommonModal(!commonModal)

  useEffect(() => {
    setPorjectId(props.projectId)
  }, [props.projectId])

  useEffect(() => {
    subProjectListApi()
  }, [projectId])

  async function subProjectListApi() {
    if (projectId) {
      await axios
        .get(url + "/api/project/" + projectId + "/subproject/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log("subprojectList called")
          setSubProjectData(res.data)
          setSubProjectId(res.data[0].id)
          setProjectName(res.data[0].sub_project_name)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  async function addSubProject(props) {
    await axios
      .post(url + "/api/subproject/", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        // console.log("RESP", res);
        if (res.status === 200) {
          setMsg(title + " added successfully !")
          setCommonModal(true)
          subProjectListApi()
        }
      })
      .catch((err) => {
        console.log("ERROR", err)
        setMsg("Error!")
        setCommonModal(true)
      })
  }

  const closeBtn = (
    <button
      className="close"
      onClick={() => {
        props.toggle()
        // handleClear();
      }}
      style={{ color: "red" }}
    >
      &times;
    </button>
  )

  function sendData() {
    if (props.projectId) {
      formData.append("project", projectId)
    }
    formData.append("sub_project_name", title)
    formData.append("organisation_id", orgId)

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1])
    }
    if (title === "" || props.projectId === "") {
      alert("Please Type sub-project name !")
    } else {
      addSubProject()
    }
  }

  return (
    <React.Fragment>
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle} size="md">
          <ModalHeader toggle={props.toggle} close={closeBtn}>
            <h4>Add SubProject</h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  marginRight: "5rem",
                  fontSize: "16px",
                  marginTop: "10px"
                }}
              >
                <Label for="Title">
                  <strong>Select Project</strong>
                </Label>
              </span>
              <Row>
                <Col sm={6} md={6} lg={6}>
                  {props.projectData && props.projectData.length > 0 && (
                    <>
                      {/* <h6 style={{ width: "18rem" }}>Select Project</h6> */}
                      <select
                        type="select"
                        value={projectId}
                        name="projects"
                        className="dropDown"
                        onChange={(e) => {
                          setPorjectId(e.target.value)
                        }}
                        style={{
                          maxWidth: "170px",
                          minWidth: "170px",
                          overflowX: "hidden",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {props.projectData.map((project, index) => (
                          <option
                            value={project.id}
                            selected={projectId === project.id ? true : false}
                            key={index}
                          >
                            {project.project_name}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </Col>
              </Row>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="Title">
                <strong>SubProject Title</strong>
              </Label>
              <Input
                type="text"
                placeholder="Enter Subproject Title"
                id="Title"
                name={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                props.toggle()
                sendData()
              }}
            >
              &nbsp;<strong> Add</strong> &nbsp;
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                props.toggle()
                // handleClear();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {loading && (
        <Spinner
          color="info"
          style={{
            position: "fixed",
            margin: "25%",
            height: "3rem",
            width: "3rem"
          }}
        ></Spinner>
      )}
      <CommonModal modal={commonModal} toggle={commonToggle} msg={msg} />
    </React.Fragment>
  )
}

export default AddSubProject
