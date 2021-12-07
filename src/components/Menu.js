import React from "react"
import { NavLink } from "react-router-dom"
import projects from "../images/deselect/Document.png"
import star from "../images/deselect/Star.png"
import team from "../images/deselect/team.png"
// import folder from '../images/deselect/Folder.png';
import projects2 from "../images/projects.png"
import star2 from "../images/upload.png"
import upload2 from "../images/upload2.png"
import team2 from "../images/team.png"
// import projects from "../images/projects.png";
// import folder2 from '../images/Folder.png';
import { connect } from "react-redux"
import { VscOpenPreview } from "react-icons/all"

class Slider extends React.Component {
  render() {
    const orgNum =
      this.props.org ||
      parseInt(localStorage.getItem("joined_org")) +
      parseInt(localStorage.getItem("own_org"))
    const memNum =
      this.props.members || parseInt(localStorage.getItem("members_count"))
    //    console.log(this.props.members , localStorage.getItem('members_count'));
    return (
      <div className="list">
        {this.props.children}
        {/* <NavLink
              to="/document-list"
              activeClassName="active"
              exact
              style={{ textDecoration: "none" }}
            >
              {this.props.active === "/document-list" ? (
                <img src={projects2} alt="projects" />
              ) : (
                <img src={projects} alt="projects" />
              )}
              <span>
                <strong>Home</strong>
              </span>
            </NavLink> */}
        {/* <NavLink
              to="/starred"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              {this.props.active === "/starred" ? (
                <img src={star2} alt="star" />
              ) : (
                <img src={star} alt="star" />
              )}
              <span>
                <strong>Starred</strong>
              </span>
            </NavLink> */}
        {/* <NavLink
              to="/members"
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              {this.props.active === "/members" ? (
                <img src={team2} alt="projects" />
              ) : (
                <img src={team} alt="projects" />
              )}
              <span>
                <strong>
                  Members&nbsp;
                  {isNaN(memNum) || memNum == 0 ? "" : `(${memNum})`}
                </strong>
              </span>
            </NavLink> */}
        {/* <NavLink
          to="/Organisation"
          activeClassName="active"
          style={{ textDecoration: "none" }}
        >
          {this.props.active === "/Organisation" ? (
            <img src={team2} alt="projects" />
          ) : (
            <img src={team} alt="projects" />
          )}
          <span>
            <strong style={{ justifyContent: "space-between" }}>
              Organisation&nbsp;
              {isNaN(orgNum) || orgNum == 0 ? "" : `(${orgNum})`}{" "}
            </strong>
          </span>
        </NavLink>

        <NavLink
          to="/DragAndDrop"
          activeClassName="active"
          style={{ textDecoration: "none" }}
        >
          {this.props.active === "/DragAndDrop" ? (
            <img src={upload2} alt="projects" />
          ) : (
            <img src={star2} alt="projects" />
          )}
          <span>
            <strong>
              Upload */}
        {/* {isNaN(memNum) || memNum == 0 ? "" : `(${memNum})`} */}
        {/* </strong>
          </span>
        </NavLink>
        <NavLink
          to="/review"
          activeClassName="active"
          exact
          style={{ textDecoration: "none" }}
        >
          <VscOpenPreview size={20} />
          <span>
            <strong>Review</strong>
          </span>
        </NavLink> */}
      </div>
    )
  }
}

// NavLink.contextTypes = {
//     router: PropTypes.object
// };
const mapStateToProps = (state) => {
  return {
    active: state.active.active,
    org: state.active.org,
    members: state.active.members
  }
}

export default connect(mapStateToProps, null)(Slider)
