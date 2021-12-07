import React, { useState, useContext } from "react";
//import { Button } from "reactstrap";
import { UserContext } from "../UserContext";
// import starIcon from "../../images/deselect/Star.png";
// import search from "../../images/Search.png";
import projectIcon from '../../images/deselect/Folder.png';
//import profile from "../images/sidepanel/profile.png";
import ProjectModal from "./ProjectModal";

const ProjectSidepanel = (props) => {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useContext(UserContext);
  const [totalProjects, setTotalProjects] = useState(props.projectData.length);
  const [currentid, setCurrentId] = useState(1);
  const [currentlength, setCurrentLength] = useState(10);

  const toggle = () => setModal(!modal);

  function gotoProjects() {
    window.location.replace('/projects');
  }

  // function handleProjectName(e){
  //   console.log(e.currentTarget.getAttribute('id'));

  // }
  function showMore() {
    setTotalProjects(props.projectData.length);
    // console.log("TOTAL",totalProjects);
    // console.log("CURRENT",currentlength);

    if (currentlength < totalProjects) {
      if (currentlength + 10 < totalProjects)
        setCurrentLength(currentlength + 10);
      else
        setCurrentLength(totalProjects);
    }
  }

function handleProjectSearch(e){

  console.log("project-Search",e.target.value);

}


  return (
    <>
      <div style={{ marginLeft: "1%", position: "relative" }}>
        <span
          style={{
            fontSize: "24px",
            fontWeight: "700",
            cursor: "pointer"
          }}
          onClick={gotoProjects}
        >
          MONOVER
            </span>
        <br />
        <p className="space" style={{ color: "#24a0ed" }}><b>{userData.organisation_name}</b></p>

        <ul className="list-group">

          <li style={{ listStyleType: "none" }}>
            <div class="input-group rounded" style={{marginBottom:"5px"}}>
              <input 
              type="search" 
              class="form-control rounded" 
              placeholder="Search Projects" 
              aria-label="Search"
              aria-describedby="search-addon" 
              style={{boxShadow:"none",border:"none"}}
              onChange={handleProjectSearch}
            />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fa fa-search" style={{cursor:"pointer"}}></i>
              </span>
            </div>
          </li>
          {
            props.projectData && props.projectData.length > 0 && props.projectData.map((project, index) => (
              <>
                {index < currentlength ?
                  <li
                    key={index}
                    id={project.id}
                    className="list-group-item list-group-item-action"
                    style={{
                      cursor: "pointer",
                      fontWeight: "500",
                      borderBlock: "none",
                      border:"none",
                      // backgroundColor: (currentid === project.id) ? "#cccccc" : "",
                      color: (currentid===project.id)?"blue":"",
                    }}
                    onClick={() => { props.setProjectId(project.id); setCurrentId(project.id) }}
                  >
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><img src={projectIcon} alt='projects' />{" "}{project.project_name}</span>
                  </li> : null
                }
              </>
            )
            )}
          <>
            {currentlength >= totalProjects ? null :
              <li className="list-group-item"
                style={{
                  borderColor: "",
                  backgroundColor: "#cccccc",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "750",
                  cursor: "pointer"
                }}
              >
                <span onClick={showMore}>More</span>
              </li>
            }
          </>
        </ul>
        <br />
      </div>
      <ProjectModal
        toggle={toggle}
        modal={modal}
      />
    </>
  );
}

export default (ProjectSidepanel);
