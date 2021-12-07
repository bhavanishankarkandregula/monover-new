import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../GlobalUrl";
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
} from "reactstrap";
//import pdfIcon from "../../images/pdf-file-svg.svg";
import "./DocumentList.css";
import CommonModal from "../CommonModal/CommonModal";

const AddDocumentModal = (props) => {
  const [imageFile, setImageFile] = useState([]);
  const [imageName, setImageName] = useState([]);
  const [imageSrcUrl, setImageSrcUrl] = useState([]);
  const [projectId, setPorjectId] = useState(props.projectId);
  const [subprojectId, setSubProjectId] = useState(props.subProjectId);
  const [projectName, setProjectName] = useState(props.projectName);
  const [subProjectData, setSubProjectData] = useState({});
  const [loading, setLoading] = useState(false);
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState('')
  const commonToggle = () => setCommonModal(!commonModal)
  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("orgId");
  var formData = new FormData();

  // console.log("ADDDOCmodal", projectId);

  useEffect(() => {
    subProjectListApi();
  }, [projectId]);

  useEffect(() => {
    setPorjectId(props.projectId);
  }, [props.projectId]);

  useEffect(() => {
    setSubProjectId(props.subProjectId);
  }, [props.subProjectId]);

  async function uploadImageFile() {
    setLoading(true);
    await axios
      .post(url + "/api/document/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setMsg("Document added successfully!");
          setCommonModal(true);
          // alert("Document added successfully !");
          // console.log("Document Upload kiya",res.data);
          props.documentListApi();
        }
        handleClear();
      })
      .catch((err) => {
        setLoading(false);
        alert("Error !");
        handleClear();
      });
  }

  function sendData() {
   
    if (props.subProjectId) {
      formData.append("subproject", subprojectId);
    }
    formData.append("organisation_id", orgId);

    for (let i = 0; i < imageFile.length; i++) {
      console.log('yo',imageFile[i], imageName[i]);
      formData.append("file", imageFile[i], imageName[i]);
    }

    // for (var key of formData.entries()) {
    //   console.log("888", key[0] + ', ' + key[1]);
    // }

    if (imageName.length === 0 || imageFile.length === 0) {
      alert("Please Select Documents !");
    } else {
      uploadImageFile();
    }
  }

  const handleImage = (e) => {
    setImageSrcUrl([]);
    setImageName([]);
    setImageFile([]);

    for (let i = 0; i < e.target.files.length; i++) {
      setImageFile((old) => [...old, e.target.files[i]]);
      setImageName((old) => [...old, e.target.files[i].name]);

      // if (
      //   e.target.files[i].name.split(".")[
      //     e.target.files[i].name.split(".").length - 1
      //   ] === "pdf"
      // ) {
      //   setImageSrcUrl((old) => [...old, pdfIcon]);
      // } else {
        setImageSrcUrl((old) => [
          ...old,
          URL.createObjectURL(e.target.files[i]),
        ]);
      // }
    }
    // console.log("FILEA", e.target.files);
    // console.log("NAME", e.target.files.name);
  };

  const handleClear = () => {
    setImageFile([]);
    setImageName([]);
    setImageSrcUrl([]);
  };

  const closeBtn = (
    <button
      className="close"
      onClick={() => {
        props.toggle();
        handleClear();
      }}
      style={{ color: "red" }}
    >
      &times;
    </button>
  );

  async function subProjectListApi() {
    if (projectId) {
      await axios
        .get(url + "/api/project/" + projectId + "/subproject/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("subprojectList", res.data);
          setSubProjectData(res.data);
          setSubProjectId(res.data[0].id);
          setProjectName(res.data[0].sub_project_name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // console.log(imageFile);

  return (
    <React.Fragment>
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle} size="md">
          <ModalHeader toggle={props.toggle} close={closeBtn}>
            <span>Select Document</span>
            <Row>
              <Col sm={6} md={6} lg={6}>
                {props.projectData && props.projectData.length > 0 && (
                  <>
                    <h6 style={{ width: "18rem" }}>Select Project</h6>
                    <select
                      type="select"
                      value={projectId}
                      name="projects"
                      className="dropDown"
                      onChange={(e) => {
                        setPorjectId(e.target.value);
                      }}
                      style={{
                        maxWidth: "200px",
                        minWidth: "200px",
                        overflowX: "hidden",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {props.projectData.map((project,index) => (
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
              <Col sm={6} md={6} lg={6}>
                {subProjectData && subProjectData.length > 0 && (
                  <>
                    <h6>Select Sub Project</h6>
                    <select
                      type="select"
                      value={subprojectId}
                      name="subprojects"
                      className="dropDown"
                      style={{
                        maxWidth: "200px",
                        minWidth: "200px",
                        overflowX: "hidden",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      onChange={(e) => {
                        setSubProjectId(e.target.value);
                      }}
                    >
                      {subProjectData.map((subProject,index) => (
                        <option
                          value={subProject.id}
                          // selected= {subprojectId === subProject.id ?true :false }
                          key={index}
                        >
                          {subProject.sub_project_name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody style={{ height: "60vh", overflowY: "auto" }}>
            {imageSrcUrl.length === 0 ? (
              <div style={{ padding: "5%", textAlign: "center" }}>
                <h5>Select Document</h5>
              </div>
            ) : (
              <>
                {imageSrcUrl.map((docUrl, index) => (
                  <>
                    {" "}
                    {imageFile &&
                    imageFile[index] &&
                    imageFile[index].name.split(".")[
                      imageFile[index].name.split(".").length - 1
                    ] === "pdf" ? (
                      <embed
                        src={docUrl }
                        type="application/pdf"
                        style={{
                          height: "100%",
                          width: "100%",
                          minHeight: "15rem",
                          position: "relative",
                        }}
                      />
                    ) : (
                      <img
                        src={docUrl}
                        alt="Upload Form Image"
                        style={{
                          height: "100%",
                          width: "100%",
                          minHeight: "15rem",
                          position: "relative",
                        }}
                      />
                    )}
                    <p></p>
                    <hr />
                  </>
                ))}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Input
              type="file"
              name="project_name"
              accept="image/*,application/pdf"
              onChange={handleImage}
              multiple
            ></Input>
            <Button
              color="primary"
              onClick={() => {
                props.toggle();
                sendData();
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
            width: "3rem",
          }}
        ></Spinner>
      )}
      <CommonModal
      modal={commonModal}
      toggle={commonToggle}
      msg={msg}
      />
    </React.Fragment>
  );
};

export default AddDocumentModal;
