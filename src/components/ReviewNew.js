import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../GlobalUrl";
import { useAlert } from "react-alert";
import ScreenTop from "./mobileComp/ScreenTop";
import Top from "./Top";
import { Link } from "react-router-dom";
import { IconButton } from '@material-ui/core'
import Loader from "./Loader";
import Share from './Share'
import sharedFolder from '../images/shared-folder.png'
import {
    Container,
    Row,
    OverlayTrigger,
    Tooltip, DropdownButton, Dropdown
} from "react-bootstrap";
import {
    SiMicrosoftexcel,
} from "react-icons/all";
import FilePreview from "./DragAndDrop/FilePreview2";
import SubprojectModal from "./DragAndDrop/subprojectModal";
import AddFolder2 from "../images/folder-add2.png";
import './Review.css'
import PreviewFile from "./DragAndDrop/PreviewFile";

const token = localStorage.getItem("token");
const PROJECT_ID = 17;
function Review() {
    const alert = useAlert();

    const [sub_projects, set_sub_projects] = useState([]);
    const [subProjectModal, setSubProjectModal] = useState(false);
    const projectId = localStorage.getItem("projectId");
    const [sub_projects_loading, set_sub_projects_loading] = useState(false);
    const [documents, setDocuments] = useState({});
    const [loading, set_loading] = useState(true);
    const alldocsId = useState([]);
    const alldocsPath = useState([]);
    const [autosort, setautosort] = useState(false);


    const subProjectToggle = () => {
        setSubProjectModal(!subProjectModal);
    };




    const autoSort = () => {
        setautosort(!autosort)
    }

    const get_sub_projects = () => {
        set_loading(true);
        return axios
            .get(url + "/api/filter/sub/project/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                // console.log(res.data);
                set_sub_projects(res.data);
                return Promise.all(
                    res.data.map((sub_proj) => {
                        // alldocsId.push((sub_proj = []));
                        const alldocs = get_documents(
                            sub_proj.id,
                            sub_proj.sub_project_name
                        );
                        return alldocs;
                    })
                );
            })
            .then(async () => {
                return set_loading(false);
            })
            .catch((err) => {
                console.error(err);
                set_loading(true);
                get_sub_projects();
                // alert.error("Failed to load sub projects")
            });
    };

    const handleDocument = (documentId, starred) => {
        localStorage.setItem("documentId", documentId);
        localStorage.setItem("docStarred", starred);
        // setSubProjectId();
    };

    const get_documents = (sub_project_id, sub_proj_name) => {
        return axios
            .get(url + `/api/subproject/${sub_project_id}/document/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setDocuments((prev) => ({
                    ...prev,
                    [sub_project_id]: res.data,
                }));

                // res.data.map((doc) => {
                //   alldocsId.ge
                // });
            })
            .catch((err) => {
                get_documents();
                alert.error(`Failed to load documents for ${sub_proj_name}`);
                return err;
            });
    };
    useEffect(() => {
        get_sub_projects();
    }, []);

    useEffect(() => {
        // console.log("length", sub_projects.length);
        sub_projects.map((sub) => {
            // console.log("subprojects", sub);
            if (sub.id in documents && Array.isArray(documents[sub.id])) {
                documents[sub.id].map((doc) => {
                    // console.log("d", doc);
                    alldocsId.push(doc.id);
                    alldocsPath.push(doc.file);
                });
            }
        });
        localStorage.setItem("alldocs", JSON.stringify(alldocsId.slice(2)));
        localStorage.setItem("alldocsPath", JSON.stringify(alldocsPath.slice(2)));
    }, [sub_projects, documents]);


    return (
        <div className="main" style={{ width: "100%" }}>
            <ScreenTop />
            <Top />
            <div style={{ width: "100%" }}>
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <div


                                style={{ width: '100%' }}
                            >
                                <div className='d-flex justify-content-between flex-md-row flex-column'>
                                    <div className=' d-flex flex-column justify-content-center align-items-center'>
                                        <OverlayTrigger
                                            placement={"top"}
                                            overlay={<Tooltip>Add Folder</Tooltip>}
                                        >
                                            <img
                                                alt="folder-icon-add"
                                                className="c-pointer"
                                                src={AddFolder2}
                                                style={{ marginTop: "24px", width: "100px", cursor: "pointer", height: "100px", }}
                                                onClick={() => {
                                                    subProjectToggle();
                                                }}
                                            />
                                        </OverlayTrigger>
                                        <p className='text-center'><b>New Deal</b></p>
                                    </div>

                                    {/* share folder funtionality */}

                                    {/* <div className='ml-5'>
                    <Link to='/SharedWithMe' style={{ color: 'inherit', textDecoration: 'none' }}>
                      <OverlayTrigger
                        placement={"top"}
                        overlay={<Tooltip>Shared With Me</Tooltip>}
                      >
                        <img
                          alt="shared-folder"
                          className="c-pointer"
                          src={sharedFolder}
                          style={{ marginTop: "40px", width: "100px", cursor: "pointer", height: "100px", }}
                        />
                      </OverlayTrigger>
                      <p className='text-center'><b>Shared With Me</b></p>
                    </Link>
                  </div> */}

                                    {/* <div className="d-flex align-items-center">
                      <h3 style={{textAlign:"center"}} >Whole Sale Heating Supply</h3>
                  </div> */}

                                    <div className='d-flex justify-content-center align-items-center flex-column'>
                                        <OverlayTrigger
                                            placement={"top"}
                                            overlay={<Tooltip>Let system sort documents automatically for you</Tooltip>}

                                        >
                                            {/* {
                      autosort ? (
                        <img onClick={() => autoSort()} style={{ width: "85px", backgroundColor: "rgb(207, 246, 253)", cursor: "pointer", borderRadius: "50%", height: "85px", marginRight: "30px", marginTop: "45px" }} src="https://icon-library.com/images/15809-200.png" />
                      ) : (
                        <img onClick={() => autoSort()} style={{ width: "85px", cursor: "pointer", height: "85px", marginRight: "30px", marginTop: "45px" }} src="https://icon-library.com/images/15809-200.png" />
                      )
                    } */}
                                            <DropdownButton
                                                // style={{ marginTop: '80px' }}
                                                variant="outline-primary"
                                                title="Sort By"
                                                id="input-group-dropdown-4"
                                                align="end"
                                            >
                                                <Dropdown.Item href="#">Most Recent</Dropdown.Item>
                                                <Dropdown.Item href="#">Size</Dropdown.Item>
                                                <Dropdown.Item href="#">Date Added</Dropdown.Item>
                                            </DropdownButton>
                                        </OverlayTrigger>
                                        {/* <p>Auto Sort</p> */}
                                    </div>

                                </div>


                            </div>

                            <div>



                                <SubprojectModal
                                    toggle={subProjectToggle}
                                    modal={subProjectModal}
                                    projectId="17"
                                    subProjectListApi={get_sub_projects}
                                />

                            </div>

                            <div>
                                <div
                                    className="bz-card py-0"
                                    style={{ minHeight: "13rem", marginBottom: "20px", marginTop: "20px", width: "100%", paddingLeft: "16px", paddingRight: "16px" }}
                                >

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div style={{ overflow: "hidden", width: "80%" }}>
                                            <h2 style={{ margin: "20px", overflow: 'hidden', textOverflow: "ellipsis" }} className="mx-0 px-0 ml-md-4">
                                                <Link to={`#`} style={{ color: "black" }}>
                                                    abcde
                                                </Link>
                                            </h2>
                                        </div>

                                        <div className='d-flex justify-content-between mr-md-3'>
                                            <div className='mr-3 px-0' >
                                                <Share item='folder' />
                                            </div>

                                            <Link
                                                to={`#`}
                                            >
                                                <OverlayTrigger
                                                    placement={"top"}
                                                    overlay={<Tooltip>Excel</Tooltip>}

                                                >
                                                    <IconButton>
                                                        <SiMicrosoftexcel color='black' />
                                                    </IconButton>
                                                </OverlayTrigger>
                                            </Link>
                                        </div>
                                    </div>


                                    <div className='row' >
                                        <div className='col-12 col-md-4 flex-column justify-content-center align-items-center' >
                                            {/* <PreviewFile/> */}
                                        </div>
                                    </div>



                                </div>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Review;
