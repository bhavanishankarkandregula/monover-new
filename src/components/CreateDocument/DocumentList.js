import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "reactstrap";
import ScreenTop from "../mobileComp/ScreenTop";
import Top from "../Top";
import "../../App.css";
import "./DocumentList.css";
import subProjectIcon from "../../images/projects.png";
import projectIcon from "../../images/deselect/Folder.png";
import whitefolderIcon from "../../images/WhiteFolder.svg";
import { url } from "../../GlobalUrl";
import axios from "axios";
import ProjectModal from "./ProjectModal";
import SubprojectModal from "./SubprojectModal";
import AddDocumentModal from "./AddDocumentModal";
import DisplayBar from "../Navlinks/DisplayBar";
//import ProjectSidepanel from "./ProjectSidePanel";
//import CommonModal from "./CommonModal";
import Add from "../Add";
import DocumentSlider from "../CreateDocument/DocumentSlider";
import CommonModal from "../CommonModal/CommonModal";
import AddSubProject from "./AddSubProject";

const DocumentList = (props) => {
  const [documents, setDocuments] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [subProjectData, setSubProjectData] = useState([]);
  const [currentShow, setCurrentShow] = useState("rec");
  const [projectId, setProjectId] = useState("");
  const [subProjectId, setSubProjectId] = useState("");
  const [ActiveSubProjectId, setActiveSubProjectId] = useState("");
  const [currentid, setCurrentId] = useState("");
  const [activeProjectName, setActiveProjectName] = useState("");
  const [activeSubProjectName, setActiveSubProjectName] = useState("");
  const [selectSortType, setSelectSortType] = useState("date");
  // const [filterType, setFilterType] = useState("all");
  // const [defaultOpen, setDefaultOpen] = useState();
  // const [modal, setModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [subProjectModal, setSubProjectModal] = useState(false);
  const [docModal, setDocModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStarSubProject, setIsStarSubProject] = useState(false);
  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("orgId");
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState("");

  // const toggle = () => setModal(!modal);
  const projectToggle = () => setProjectModal(!projectModal);
  const subProjectToggle = () => {
    if (activeProjectName) {
      setSubProjectModal(!subProjectModal);
    } else {
      setMsg("Please select a project!");
      commonToggle();
    }
  };
  const docToggle = () => setDocModal(!docModal);
  const commonToggle = () => setCommonModal(!commonModal);

  useEffect(() => {
    if (!orgId) {
      alert("Please select your organisation");
      window.location.replace("/Organisation");
    }
  }, []);

  useEffect(() => {
    projectListApi();
    recentDocApi();
  }, []);

  useEffect(() => {
    subProjectListApi();
  }, [projectId]);

  useEffect(() => {
    documentListApi();
  }, [projectId, subProjectId]);

  async function recentDocApi() {
    setLoading(true);
    axios
      .get(url + `/api/recent/documents/${orgId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("RecentDoc++", res.data);
        setLoading(false);
        setRecentData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function handleDelete() {
    setLoading(true);
    axios
      .delete(url + `/api/subproject/${subProjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setMsg("sub project deleted successfully!");
        setCommonModal(true);
        // alert("sub project deleted successfully!");
        setSubProjectId("");
        setActiveSubProjectName("");
        setActiveSubProjectId("");
        setDocuments([]);
        // console.log("Del Sub project res", res);
        subProjectListApi();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  async function projectListApi() {
    setLoading(true);
    axios
      .get(url + `/api/projects/${orgId}/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("ProjectList", res.data);
        setLoading(false);
        setProjectData(res.data);
        if (projectId === "") {
          setProjectId(res.data[0].id);
          // setActiveProjectName(res.data[0].project_name);
          // setCurrentId(res.data[0].id);
          if (res.data[0].sub_project) {
            setSubProjectId(res.data[0].sub_project[0]);
            //  setActiveSubProjectId(res.data[0].sub_project[0]);
          } else {
            setSubProjectId("");
            setActiveSubProjectId("");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function editProjectNameApi(data) {
    setLoading(true);
    await axios
      .patch(
        url + `/api/project/${projectId}/`,
        { project_name: data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setMsg("project name updated !");
        setCommonModal(true);
        // alert("project name updated ! ");
        setLoading(false);
        projectListApi();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("project name edit Error !");
      });
  }

  async function subProjectListApi() {
    setLoading(true);
    if (projectId) {
      await axios
        .get(url + "/api/project/" + projectId + "/subproject/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("subprojectList", res.data);
          setLoading(false);
          setSubProjectData(res.data);

          // setActiveSubProjectId(res.data[0].id);

          // if (subProjectId === "") {
          //   setSubProjectId(res.data[0].id);
          //    setActiveSubProjectName(res.data[0].sub_project_name);
          // }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  async function editSubProjectNameApi(data) {
    setLoading(true);
    await axios
      .patch(
        url + `/api/subproject/${subProjectId}/`,
        { sub_project_name: data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // alert("subproject name updated ! ");
        setMsg("subproject name updated !");
        setCommonModal(true);
        setLoading(false);
        subProjectListApi();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("subproject name edit Error !");
      });
  }

  async function documentListApi() {
    // console.log("subprojectId", subProjectId);
    setLoading(true);
    if (subProjectId) {
      await axios
        .get(url + `/api/subproject/${subProjectId}/document/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("DocuemntList", res.data);
          setDocuments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("DOC", err);
          setLoading(false);
        });
    }
  }

  function handleSortSubProject(type) {
    if (projectData && type === "name") {
      projectData.sort((a, b) => (a.project_name > b.project_name ? 1 : -1));
    } else if (projectData && type === "date") {
      projectData.sort((a, b) => (a.date_created > b.date_created ? -1 : 1));
    }
  }

  // function handleDocType(value) {
  //   setCurrentShow(value);
  // }

  async function starProject() {
    projectId &&
      (await axios
        .post(
          `${url}/api/starred/`,
          {
            Projects: `${projectId}`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setMsg(res.data[0].message);
          setCommonModal(true);
          // alert(res.data[0].message);
        })
        .catch((e) => {
          alert(e.message);
        }));
  }

  async function starSubProject() {
    subProjectId &&
      localStorage.getItem("orgId") &&
      (await axios
        .post(
          `${url}/api/starred/`,
          {
            organisation_id: `${localStorage.getItem("orgId")}`,
            subprojects: `${ActiveSubProjectId}`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          setMsg(res.data[0].message);
          setCommonModal(true);
          // alert(res.data[0].message);
        })
        .catch((e) => {
          alert(e.message);
        }));
  }

  async function removeStarSubProject() {
    subProjectId &&
      localStorage.getItem("orgId") &&
      (await axios
        .post(
          `${url}/api/remove/starred/`,
          {
            organisation_id: `${localStorage.getItem("orgId")}`,
            subprojects: `${subProjectId}`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setMsg(res.data[0].message);
          setCommonModal(true);
          // alert(res.data[0].message);
        })
        .catch((e) => {
          alert(e.message);
        }));
  }

  return (
    <>
      {/* <ProjectSidepanel projectData={projectData} setProjectId={setProjectId} /> */}

      <div
        className="main"
        style={{ width: "100%", margin: "0 2rem 3rem 2rem" }}
      >
        <ScreenTop />

        <Top />

        {loading && (
          <Spinner
            color="info"
            style={{
              position: "fixed",
              zIndex: "9999",
              margin: "25%",
              height: "3rem",
              width: "3rem",
            }}
          ></Spinner>
        )}

        <div
          // className="container"
          style={{ marginLeft: "0%", paddingLeft: "1%" }}
        >
          {/* <div >
            <table className="table table-bordered " style={{ width: "10rem", textAlign: "center" }} >
              <tr>
                <th
                  onClick={() => { handleDocType("rec") }}
                  style={{
                    cursor: "pointer",
                    padding: "3px",
                    backgroundColor: currentShow === "rec" ? "#B7DBFF" : "",
                    color: currentShow === "rec" ? "blue" : "black",
                  }}
                >
                  &nbsp;Recents&nbsp; </th>

                <th
                  onClick={() => { handleDocType("doc") }}
                  style={{
                    padding: "3px",
                    cursor: "pointer",
                    backgroundColor: currentShow === "doc" ? "#B7DBFF" : "",
                    color: currentShow === "doc" ? "blue" : "black",

                  }}
                >
                  Documents </th>
              </tr>
            </table>
          </div> */}
          <h3
            style={{ fontWeight: "700", fontSize: "35px", marginLeft: "-1rem" }}
            class="homeTitle"
          >
            Home
          </h3>

          {currentShow === "rec" && recentData.length > 0 && (
            <div>
              <div className="documentButton">
                <h5 style={{ marginLeft: "-1rem", marginTop: "1rem" }}>
                  Documents
                </h5>
                <button
                  onClick={() => {
                    // toggle();
                    // setDefaultOpen(3);
                    docToggle();
                  }}
                >
                  Add document
                </button>
              </div>
              <DocumentSlider documents={recentData} />
            </div>
          )}

          {currentShow === "doc" && (
            <>
              <Row>
                <div>
                  <div className="documentButton">
                    <h5>
                      {/* {activeSubProjectName}'s */}
                      Documents ({documents ? documents.length : ""})
                    </h5>
                    <button
                      onClick={() => {
                        docToggle();
                      }}
                    >
                      Add document
                    </button>
                  </div>
                </div>
                {/* <Col></Col> */}
                {/* <div>
                    <select
                      className="dropDown"
                      value={selectSortType}
                      name="select"
                      id="exampleSelect"
                      onChange={(e) => {
                        setFilterType(e.target.value);
                      }}
                    >
                      <option value="1">ALL</option>
                      <option value="2">This Week</option>
                      <option value="3">Previous Week</option>
                      <option value="4">This Month</option>
                      <option value="5">Previous Month</option>
                      <option value="6">Previous 3 Month</option>
                    </select>
                </div> */}
              </Row>

              <DocumentSlider documents={documents} />
            </>
          )}
        </div>

        {/* <hr style={{ border: "1px solid #cccccc" }} /> */}
        <br />

        <div
          className="container"
          style={{ marginLeft: "0%", paddingLeft: "0%" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <DisplayBar
              title={activeProjectName}
              text={activeSubProjectName}
              handleDelete={handleDelete}
              setProjectName={setActiveProjectName}
              setSubProjectName={setActiveSubProjectName}
              editProjectNameApi={editProjectNameApi}
              editSubProjectNameApi={editSubProjectNameApi}
              starProject={starProject}
              starSubProject={starSubProject}
              isStarSubProject={isStarSubProject}
              removeStarSubProject={removeStarSubProject}
            />
            {/* <h5>
              {activeProjectName}/
              <span contentEditable="true">{activeSubProjectName}</span>
            </h5> */}
            <br />
            <br />
            {/* <Col sm={8} md={8} lg={8} /> */}
            <div style={{ marginLeft: "auto" }}>
              <Col>
                <span>
                  <select
                    className="dropDown"
                    value={selectSortType}
                    name="select"
                    id="exampleSelect"
                    onChange={(e) => {
                      setSelectSortType(e.target.value);
                      handleSortSubProject(e.target.value);
                    }}
                  >
                    <option value="name">By Name</option>
                    <option value="date">By Date</option>
                  </select>
                </span>
              </Col>
            </div>
          </div>
          <h3 style={{ fontSize: "1.25rem", marginLeft: "10px" }}>Projects</h3>
          <div className="Projectrow ">
            {/* <div
              className="col-sm-2 mx-3 my-2 add project projectCard"
              style={{
                backgroundColor: "#bfffe6",
                color: "#6C8B89",
              }}
              onClick={() => {
                projectToggle();
                // setDefaultOpen(1);
              }}
            >
              <br /> */}
            {/* <br/> */}
            {/* <i className="fa fa-plus fa-2x"></i>
              <p>ADD PROJECT</p>
              <br />
            </div> */}

            {projectData.length > 0 &&
              projectData.map((project) => (
                <>
                  <div
                    key={project.id}
                    className="col-sm-2 mx-3 my-2 add project projectCard"
                    style={{
                      // fontWeight: "500",
                      // //border: "1px solid #cccccc",
                      // margin: "1%",
                      // marginBottom: "0%",
                      // cursor: "pointer",
                      // whiteSpace: "nowrap",
                      // borderRadius: "30px",
                      // overflow: "hidden",
                      // textOverflow: "ellipsis",
                      // //textAlign: "center",
                      // padding: "1%",
                      backgroundColor:
                        currentid === project.id ? "#007fff" : "#bfffe6",
                      color: currentid === project.id ? "white" : "#6C8B89",
                    }}
                    onClick={() => {
                      // setCurrentShow("doc")
                      localStorage.setItem("activeProjectId", project.id);
                      setProjectId(project.id);
                      setCurrentId(project.id);
                      setActiveProjectName(project.project_name);
                    }}
                  >
                    <br></br>
                    {/* <img
                      src={
                        currentid === project.id ? whitefolderIcon : projectIcon
                      }
                      alt="subproject"
                      style={{ height: "36.7px", width: "36.7px" }}
                    /> */}
                    <i className="fa fa-folder iconSize"></i>
                    <p
                      style={{
                        fontSize: "1rem",
                        marginTop: "0.4rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {project.project_name}
                    </p>
                    <br></br>
                  </div>
                  <>
                    {/* {project.id === currentid && (
                      <div
                        className="col-sm-2 mx-3 my-2 add subproject-card"
                        style={
                          {
                            // fontWeight: "500",
                            // margin: "1%",
                            // marginBottom: "0%",
                            // cursor: "pointer",
                            // borderRadius: "30px",
                            // height: "162px",
                            // width: "162px",
                            // minWidth: "162px",
                            // maxWidth: "162px",
                            // minHeight: "162px",
                            // maxHeight: "162px",
                            // overflow: "hidden",
                            // padding: "1%",
                            // textAlign: "center",
                            // color: "#6C8B89",
                            // backgroundColor: "#E7F5F5",
                          }
                        }
                        onClick={() => {
                          // toggle();
                          // setDefaultOpen(2);
                          subProjectToggle();
                        }}
                      >
                        <br />
                        <i className="fa fa-plus fa-2x"></i>
                        <p>ADD SUB-PROJECT</p>
                      </div>
                    )} */}
                  </>

                  <>
                    {subProjectData.length > 0 &&
                      project.id === currentid &&
                      subProjectData.map((subProject) => (
                        <div
                          className="col-sm-2 mx-3 my-2 add subproject-card"
                          key={subProject.id}
                          style={{
                            boxShadow:
                              ActiveSubProjectId === subProject.id
                                ? "1px 0px 18px -5px rgba(0,0,0,0.75)"
                                : "",
                            fontWeight: "500",
                            border:
                              ActiveSubProjectId === subProject.id
                                ? "1px solid #b3b3b3"
                                : "",
                            // //border: "1px solid #cccccc",
                            // margin: "1%",
                            // marginBottom: "0%",
                            // cursor: "pointer",
                            // whiteSpace: "nowrap",
                            // borderRadius: "30px",
                            // height: "162px",
                            // width: "162px",
                            // overflow: "hidden",
                            // minWidth: "162px",
                            // maxWidth: "162px",
                            // minHeight: "162px",
                            // maxHeight: "162px",
                            // textOverflow: "ellipsis",
                            // textAlign: "center",
                            // padding: "1%",
                            // //color :  (ActiveSubProjectId === subProject.id) ? "#D6FFFF" : "#6C8B89",
                            // color: "#6C8B89",
                            // backgroundColor: "#E7F5F5",

                            // //backgroundColor: (ActiveSubProjectId === subProject.id) ? "#0080FF" : "#E7F5F5",
                          }}
                          onClick={() => {
                            setIsStarSubProject(subProject.starred);
                            setCurrentShow("doc");
                            setSubProjectId(subProject.id);
                            setActiveSubProjectId(subProject.id);
                            setActiveSubProjectName(
                              subProject.sub_project_name
                            );
                          }}
                        >
                          <br />
                          {/* <img
                            src={subProjectIcon}
                            alt="subproject"
                            style={{
                              opacity: "0.5",
                              height: "36.7px",
                              width: "36.7px",
                            }}
                          /> */}
                          <i className="fa fa-folder-open iconSize"></i>
                          <p
                            style={{
                              fontSize: "1rem",
                              marginTop: "0.2rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {subProject.sub_project_name}
                          </p>
                        </div>
                      ))}
                  </>
                </>
              ))}
          </div>
        </div>

        <br />
        <br />
        <br />

        <span>
          <Add
            projectToggle={projectToggle}
            subProjectToggle={subProjectToggle}
            docToggle={docToggle}
          />
        </span>

        {/* <CommonModal
          toggle={toggle}
          modal={modal}
          projectId={projectId}
          subProjectId={subProjectId}
          defaultOpen={defaultOpen}
        /> */}
        <ProjectModal
          toggle={projectToggle}
          modal={projectModal}
          projectListApi={projectListApi}
        />

        <SubprojectModal
          toggle={subProjectToggle}
          modal={subProjectModal}
          projectId={projectId}
          subProjectListApi={subProjectListApi}
        />
        <AddSubProject
          toggle={subProjectToggle}
          modal={subProjectModal}
          subProjectId={subProjectId}
          documentListApi={documentListApi}
          subProjectListApi={subProjectListApi}
          projectData={projectData}
          projectId={projectId}
          projectName={activeProjectName}
        />

        <AddDocumentModal
          toggle={docToggle}
          modal={docModal}
          subProjectId={subProjectId}
          documentListApi={documentListApi}
          projectData={projectData}
          projectId={projectId}
          projectName={activeProjectName}
        />

        <CommonModal modal={commonModal} toggle={commonToggle} msg={msg} />
      </div>
    </>
  );
};

export default DocumentList;
