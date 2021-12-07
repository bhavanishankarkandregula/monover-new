import React, { useState } from "react";
import { url } from "../../GlobalUrl";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const CommonModal = (props) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [subProjectTitle, setSubProjectTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [openTab, setOpenTab] = useState(1);
  const token = localStorage.getItem("token");
  var projectFormData = new FormData();
  var subProjectFormData = new FormData();
  var docFormData = new FormData();
  const orgId = localStorage.getItem("orgId");

  async function addProject() {
    await axios
      .post(url + "/api/project/", projectFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("projectApiResponse", res);
        handleClear();
      })
      .catch((err) => {
        console.log("projectApiError", err);
        handleClear();
      });
  }

  function sendProjectData() {
    projectFormData.append("organisation_id", orgId);
    projectFormData.append("project_name", projectTitle);

    if (projectTitle === "") {
      alert("Please Enter Project Name !");
    } else {
      addProject();
    }
  }

  async function addSubProject() {
    //console.log("+++++",subProjectFormData);
    await axios
      .post(url + "/api/subproject/", subProjectFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("subProjectApiResponse", res);
        handleClear();
      })
      .catch((err) => {
        console.log("subProjectApiError", err);
        handleClear();
      });
  }

  function sendSubProjectData() {
    subProjectFormData.append("project", props.projectId);
    subProjectFormData.append("sub_project_name", subProjectTitle);

    console.log("++++", props.projectId, subProjectTitle);

    if (subProjectTitle === "" || props.projectId === "") {
      alert("Please SubProject Name");
    } else if (subProjectTitle && props.projectId) addSubProject();
  }

  async function sendDocumentData() {
    // console.log("DOC",docFormData);

    await axios
      .post(url + "/api/document/", docFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("DocumentApiResponse", res);
        handleClear();
      })
      .catch((err) => {
        console.log("DocumentApiError", err);
        handleClear();
      });
  }

  function handleDocumentData() {
    docFormData.append("subproject", props.subProjectId);
    docFormData.append("document_name", imageName);
    docFormData.append("file", imageFile);

    // for (var key of docFormData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    if (imageName === "" || imageFile === null || props.subProjectId === "") {
      alert("Please Select From Image !");
    } else if (imageName && imageFile && props.subProjectId) sendDocumentData();
  }

  const handleImage = (e) => {
    console.log("+++", e.target);
    setImageFile(e.target.files[0]);
    if (e.target.files[0]) {
      setImageName(e.target.files[0].name);
      setImageSrc(URL.createObjectURL(e.target.files[0]));
    }
    console.log("FILE", imageFile);
    console.log("NAME", imageName);
  };

  const handleClear = () => {
    setImageFile("");
    setImageName("");
    setImageSrc("");
    setProjectTitle("");
    setSubProjectTitle("");
    setOpenTab(1);
  };

  const closeBtn = (
    <button className="close" onClick={props.toggle} style={{ color: "red" }}>
      &times;
    </button>
  );

  console.log("DefaultOpen", props.defaultOpen);

  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} size="md">
        <ModalHeader toggle={props.toggle} close={closeBtn}>
          <Nav tabs>
            {props.defaultOpen === 1 && (
              <NavItem>
                <NavLink
                  href="#"
                  onClick={() => {
                    setOpenTab(1);
                  }}
                >
                  <span style={{ fontSize: "15px" }}>Add Project</span>
                </NavLink>
              </NavItem>
            ) }
              {props.defaultOpen === 2 && (<NavItem>
                <NavLink
                  href="#"
                  onClick={() => {
                    setOpenTab(2);
                  }}
                >
                  <span style={{ fontSize: "15px" }}>Add SubProject</span>
                </NavLink>
              </NavItem>
            )}
            {props.defaultOpen === 3 && (<NavItem>
              <NavLink href="#" onClick={() => { setOpenTab(3) }} ><span style={{ fontSize: "15px" }}>Add Document</span></NavLink>
            </NavItem>)}
          </Nav>
        </ModalHeader>
        <ModalBody>
          {props.defaultOpen === 1 && (
            <FormGroup>
              <Label for="Title">
                <strong>Project Title</strong>
              </Label>
              <Input
                type="text"
                placeholder="Project Title"
                id="ProjectTitle"
                name={projectTitle}
                value={projectTitle}
                onChange={(e) => {
                  setProjectTitle(e.target.value);
                }}
              />
            </FormGroup>
          )}

          {props.defaultOpen === 2 && (
            <FormGroup>
              <Label for="Title">
                <strong>Sub Project Title</strong>
              </Label>
              <Input
                type="text"
                placeholder="Enter Subproject Title"
                id="SubProject Title"
                name={subProjectTitle}
                value={subProjectTitle}
                onChange={(e) => {
                  setSubProjectTitle(e.target.value);
                }}
              />
            </FormGroup>
          )}
          {imageSrc === ""
            ? props.defaultOpen === 3 && (
                <div
                  style={{
                    color: "black",
                    backgroundColor: "",
                    padding: "5%",
                    textAlign: "center",
                  }}
                >
                  <h5>Select Document</h5>
                </div>
              )
            : props.defaultOpen === 3 && (
                <img
                  src={imageSrc}
                  alt="Upload Form Image"
                  style={{
                    height: "100%",
                    width: "100%",
                    minHeight: "15rem",
                    position: "relative",
                  }}
                />
              )}
        </ModalBody>
        <ModalFooter>
          {props.defaultOpen === 1 && (
            <>
              <Button
                color="primary"
                onClick={() => {
                  props.toggle();
                  sendProjectData();
                }}
              >
                &nbsp;<strong> ADD</strong>&nbsp;&nbsp;
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  props.toggle();
                  handleClear();
                }}
              >
                Cancel
              </Button>
            </>
          )}

          {props.defaultOpen === 2 &&
            <>
              <Button
                color="primary"
                onClick={() => {
                  props.toggle();
                  sendSubProjectData();
                }}
              >
                &nbsp;<strong> ADD</strong> &nbsp;
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  props.toggle();
                  handleClear();
                }}
              >
                Cancel
              </Button>
            </>
          
            }

            {
              props.defaultOpen === 3 &&
            <>
              <Input
                type="file"
                name="project_name"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  handleImage(e);
                }}
              ></Input>
              <Button
                color="primary"
                onClick={() => {
                  props.toggle();
                  handleDocumentData();
                }}
              >
                Upload
              </Button>{" "}
              <Button
                color="secondary"
                onClick={() => {
                  props.toggle();
                  handleClear();
                }}
              >
                Cancel
              </Button>
            </>
          }
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CommonModal;
