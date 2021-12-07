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
import plus_img from "../images/plus.png"
import './Review.css'
import PreviewFile from "./DragAndDrop/PreviewFile";

const token = localStorage.getItem("token");
const PROJECT_ID = 17;


function Catalogue() {
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
        // set_loading(true);
        // return axios
        //   .get("", {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   })
        //   .then((res) => {
        //     console.log(res.data);
        //   })
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
                                <div className='d-flex justify-content-start'>
                                    <div className='mt-3'>
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

                                    {/*Share with me folder*/}

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





                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-2' >
                                    <div className="d-flex align-items-start">
                                        <h4>Whole Sale Heating Supply</h4>
                                        <div className="grey_background ml-4"  > Star Clients Pricing </div>
                                    </div>
                                    <div>
                                        <OverlayTrigger
                                            placement={"top"}
                                            overlay={<Tooltip>Let system sort documents automatically for you</Tooltip>}

                                        >
                                            <DropdownButton
                                                //   style={{ marginTop: '80px' }}
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
                                    </div>
                                </div>


                            </div>
                            <div className="row py-4" >


                                <div className="col-md-4 col-12 p-2" style={{height:'180px'}} >
                                    
                                    
                                    <div className='bz-card' style={{width:'100%'}} >

                                    <div className="row m-0">
                                        <strong>Product 1</strong>
                                    </div>
                                    <div className="row">
                                        <div className='col-4 d-flex align-items-center justify-content-center' >
                                            <img width={100}  src={AddFolder2} alt='product_img' />
                                        </div>
                                        <div className=' p-2 col-6 d-flex flex-column justify-content-between align-items' >
                                            <div className='no_scrollbar' style={{ maxHeight:'76px', overflowY:'scroll'}} >
                                            <div className='d-flex justify-content-between'>
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
   
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            </div>

                                            <div>
                                                <button
                                                    className='d-flex align-items-center justify-content-center'
                                                    style={{ background: 'rgb(180, 180, 180)', width: '100px', height: '25px', borderRadius: '5px', borderColor: 'grey' }} >
                                                    <img style={{ width: '15px' }} src={plus_img} alt="plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-2' >

                                        </div>
                                    </div>
                                    </div>



                                </div>

                                <div className="col-md-4 col-12 p-2" style={{height:'180px'}} >
                                    
                                    
                                    <div className='bz-card' style={{width:'100%'}} >

                                    <div className="row m-0">
                                        <strong>Product 1</strong>
                                    </div>
                                    <div className="row">
                                        <div className='col-4 d-flex align-items-center justify-content-center' >
                                            <img width={100}  src={AddFolder2} alt='product_img' />
                                        </div>
                                        <div className=' p-2 col-6 d-flex flex-column justify-content-between align-items' >
                                            <div className='no_scrollbar' style={{ maxHeight:'76px', overflowY:'scroll'}} >
                                            <div className='d-flex justify-content-between'>
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
   
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            </div>

                                            <div>
                                                <button
                                                    className='d-flex align-items-center justify-content-center'
                                                    style={{ background: 'rgb(180, 180, 180)', width: '100px', height: '25px', borderRadius: '5px', borderColor: 'grey' }} >
                                                    <img style={{ width: '15px' }} src={plus_img} alt="plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-2' >

                                        </div>
                                    </div>
                                    </div>



                                </div>

                                <div className="col-md-4 col-12 p-2" style={{height:'180px'}} >
                                    
                                    
                                    <div className='bz-card' style={{width:'100%'}} >

                                    <div className="row m-0">
                                        <strong>Product 1</strong>
                                    </div>
                                    <div className="row">
                                        <div className='col-4 d-flex align-items-center justify-content-center' >
                                            <img width={100}  src={AddFolder2} alt='product_img' />
                                        </div>
                                        <div className=' p-2 col-6 d-flex flex-column justify-content-between align-items' >
                                            <div className='no_scrollbar' style={{ maxHeight:'76px', overflowY:'scroll'}} >
                                            <div className='d-flex justify-content-between'>
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
   
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            </div>

                                            <div>
                                                <button
                                                    className='d-flex align-items-center justify-content-center'
                                                    style={{ background: 'rgb(180, 180, 180)', width: '100px', height: '25px', borderRadius: '5px', borderColor: 'grey' }} >
                                                    <img style={{ width: '15px' }} src={plus_img} alt="plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-2' >

                                        </div>
                                    </div>
                                    </div>



                                </div>

                                <div className="col-md-4 col-12 p-2" style={{height:'180px'}} >
                                    
                                    
                                    <div className='bz-card' style={{width:'100%'}} >

                                    <div className="row m-0">
                                        <strong>Product 1</strong>
                                    </div>
                                    <div className="row">
                                        <div className='col-4 d-flex align-items-center justify-content-center' >
                                            <img width={100}  src={AddFolder2} alt='product_img' />
                                        </div>
                                        <div className=' p-2 col-6 d-flex flex-column justify-content-between align-items' >
                                            <div className='no_scrollbar' style={{ maxHeight:'76px', overflowY:'scroll'}} >
                                            <div className='d-flex justify-content-between'>
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
   
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            </div>

                                            <div>
                                                <button
                                                    className='d-flex align-items-center justify-content-center'
                                                    style={{ background: 'rgb(180, 180, 180)', width: '100px', height: '25px', borderRadius: '5px', borderColor: 'grey' }} >
                                                    <img style={{ width: '15px' }} src={plus_img} alt="plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-2' >

                                        </div>
                                    </div>
                                    </div>



                                </div>

                                <div className="col-md-4 col-12 p-2" style={{height:'180px'}} >
                                    
                                    
                                    <div className='bz-card' style={{width:'100%'}} >

                                    <div className="row m-0">
                                        <strong>Product 1</strong>
                                    </div>
                                    <div className="row">
                                        <div className='col-4 d-flex align-items-center justify-content-center' >
                                            <img width={100}  src={AddFolder2} alt='product_img' />
                                        </div>
                                        <div className=' p-2 col-6 d-flex flex-column justify-content-between align-items' >
                                            <div className='no_scrollbar' style={{ maxHeight:'76px', overflowY:'scroll'}} >
                                            <div className='d-flex justify-content-between'>
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
   
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            </div>

                                            <div>
                                                <button
                                                    className='d-flex align-items-center justify-content-center'
                                                    style={{ background: 'rgb(180, 180, 180)', width: '100px', height: '25px', borderRadius: '5px', borderColor: 'grey' }} >
                                                    <img style={{ width: '15px' }} src={plus_img} alt="plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-2' >

                                        </div>
                                    </div>
                                    </div>



                                </div>

        
                                <div className="col-md-4 col-12 p-2" style={{height:'180px'}} >
                                    
                                    
                                    <div className='bz-card' style={{width:'100%'}} >

                                    <div className="row m-0">
                                        <strong>Product 1</strong>
                                    </div>
                                    <div className="row">
                                        <div className='col-4 d-flex align-items-center justify-content-center' >
                                            <img width={100}  src={AddFolder2} alt='product_img' />
                                        </div>
                                        <div className=' p-2 col-6 d-flex flex-column justify-content-between align-items' >
                                            <div className='no_scrollbar' style={{ maxHeight:'76px', overflowY:'scroll'}} >
                                            <div className='d-flex justify-content-between'>
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
   
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            <div className='d-flex justify-content-between' >
                                                <div > <strong> Price(1-100) </strong> </div>
                                                <div> <strong> $ 1000 </strong> </div>
                                            </div>
                                            </div>

                                            <div>
                                                <button
                                                    className='d-flex align-items-center justify-content-center'
                                                    style={{ background: 'rgb(180, 180, 180)', width: '100px', height: '25px', borderRadius: '5px', borderColor: 'grey' }} >
                                                    <img style={{ width: '15px' }} src={plus_img} alt="plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='col-2' >

                                        </div>
                                    </div>
                                    </div>



                                </div>




                            </div>









                            <SubprojectModal
                                toggle={subProjectToggle}
                                modal={subProjectModal}
                                projectId="17"
                                subProjectListApi={get_sub_projects}
                            />

                        </>

                    )}
                </div>
            </div>
        </div >
    );
}

export default Catalogue;
