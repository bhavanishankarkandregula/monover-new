

import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../GlobalUrl";
import ScreenTop from "./mobileComp/ScreenTop";
import Loader from './Loader'

import Top from "./Top";
import {
    Container,
    Tooltip,
    OverlayTrigger,
    Row,
    Col,
} from "react-bootstrap";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import FilePreview from "./DragAndDrop/FilePreview5";
import {
    FaChevronDown,
    AiOutlineFileZip,
 
    BiSort,
    BiMenuAltLeft
} from "react-icons/all";
import {
    SiMicrosoftexcel,
} from "react-icons/all";
import AddFolder2 from "../images/folder-add2.png";
import Share from "./Share";
import SubprojectModal from './DragAndDrop/subprojectModal'
import { useHistory } from "react-router";
import logo from '../images/landing/icon.svg' ;
const Deals = ({ match }) => {
    const projectId = match.params.id
    const [deals, setDeals] = useState([])
    const [clientName, setClientName] = useState('')
    const [loading, setLoading] = useState(false)
    const [subProjectModal, setSubProjectModal] = useState(false);
    // alert(projectId)
// console.log(JSON.stringify(localStorage.getItem('token')))
// const [token,setToken]=useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM0ODQwODUxLCJqdGkiOiJjYjM1YzA5ZjBhMzY0MzgyYTJkNzg5NGZkZDdlMjMyYSIsInVzZXJfaWQiOjN9.4MrNUeXMoQCLexQhLNo3WU3MO3HUWoD6hPykGETZBHs")
var history=useHistory()

// console.log("projectiddddddddddddddddddddddddddddddddddddddddd",match.history)
// alert(projectId)
    const fetchDeals = async () => {
        setLoading(true)

var id=projectId

const { data } = await axios.get(`${url}/api/document/list_documents/?id=${id}`, {
    // "id": projectId
}, {
    headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    
})
var r=data.documents.documents
var name=data.documents.sub_project_name
setDeals(r)
setClientName(name)
console.log("ttttttttttttttttttyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyytt",r)
console.log("ttttttttttttttttttyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyytt",name)
// window.location.reload()
    //  const { data } = await axios.get(`${url}/api/document/list_documents/`, {

    //         headers: {
              
    //              Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //     console.log("bhkuyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyytt",data)
    //     setClientName(data)
    //     setDeals(data.sub_project)
    //     setLoading(false)
     }


// console.log("bhkuyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyytt",clientName)
// console.log("popopo",deals)
// console.log("bhkuyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyytt",deals)
    useEffect(() => {
        fetchDeals()
    }, [])

    const subProjectToggle = () => {
        setSubProjectModal(!subProjectModal);
    };

    return (
        <>
      <div  className='mained'>
            <ScreenTop />
            <Top />
            {/* {loading && <Loader />} */}
        {/* </div> */}
        <Container style={{maxWidth:'98.4%'}}>
      
      
                <Row>
                    <Col>
                        <div style={{marginTop:'30px'}}>
                            <div className=''style={{display:'flex',flexDirection:'row'}}>
                                <div>
                                    <OverlayTrigger
                                        placement={"top"}
                                        overlay={<Tooltip>Add Deal</Tooltip>}
                                    >
                                        <img
                                            alt="folder-icon-add"
                                            // className="c-pointer"
                                            src={AddFolder2}
                                            style={{ width: "52px", cursor: "pointer", height: "52px",fontWeight:800 }}
                                            onClick={() => {
                                                subProjectToggle()
                                            }}
                                        />
                                    </OverlayTrigger>
                                    {/* <div>b</div> */}
                                    <p className='text-center'><b style={{fontSize:11,fontWeight:700}}>New Deal</b></p>
                                </div>

                                {/* <div className=''style={{marginLeft:'32px'}}>
                                    <Link to='/SharedWithMe' style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <OverlayTrigger
                                            placement={"top"}
                                            overlay={<Tooltip>Shared With Me</Tooltip>}
                                        >
                                            <img
                                                alt="shared-folder"
                                                // className="c-pointer"
                                                // src={sharedFolder}
                                                style={{ width: "52px", cursor: "pointer", height: "52px", }}
                                            />
                                        </OverlayTrigger>
                                        <p className='text-center'><b style={{fontSize:11,fontWeight:700}}>Shared With Me</b></p>
                                    </Link>
                                </div> */}
                            </div>
                            <div className='d-flex flex-end'style={{borderRadius:'5px'}}>
                                <div style={{ fontWeight: 'bold',borderRadius:'8px', background: 'lightgray', marginLeft: 'auto',height:'28px',width:'158px' }}>
                                   <div style={{marginTop:'0px'}}>
                                    <BiSort />
                                    <BiMenuAltLeft className='' />
                                    <select style={{marginLeft:'6px',marginRight:'6px',fontSize:'13px',borderRadius:'10px',background:'lightgray',borderColor:'lightgray',fontWeight:700,WebkitAppearance:'none'}}>
                                        <option>Most Recent</option>
                                        <option>Date</option>
                                        <option>Size</option>
                                        </select>
                                    {/* Most Recent */}
                                    <FaChevronDown className='ml-2' />
                                </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* {((clients.length === 0) && documents.length === 0) && <h3 className='m-5 text-center'>No Documents</h3>}
                        {clients.map(client => ( */}
                            <div
                           
                            
                                className="bz-card"
                                style={{ minHeight: "1rem",height:'450px', marginBottom: "38px", marginTop: "20px", width: "100%" }}
                            >
                               
                                <div className='d-flex flex-row justify-content-between'>
                                    <h4 style={{ fontWeight: 'bold',marginTop:'6px',fontSize:23,marginLeft:'2px'}}>{clientName}</h4>
                                    {/* <div style={{display:'flex',justifyContent:'flex-end'}}>  */}
                                    {/* <FaChevronDown style={{marginTop:'13px',marginRight:'5px'}} size={27} />  */}
                                    
                                    <div className='align-items-center' style={{display:'flex',flexDirection:'row'}}>
                                           {/* <AiOutlineFileZip size={23} item='folder'  /> */}
                                           <img src={logo} style={{cursor:'pointer'}}  width='21px'></img>
                                            <Share size={23} item='folder'  />
                                            <SiMicrosoftexcel size={23} item='folder' />
                                        </div>
                                       
                                </div>
                                {/* <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12}> */}
                             
                           
                             {(deals.length === 0) && <h3  className='m-5 text-center'><b style={{marginLeft:'10px',marginTop:'70px'}}>No Documents</b></h3>}

                                   <div  className=''style={{marginLeft:'1px',marginLeft:'20px',display:'flex',flexDirection:'row',flexWrap: "wrap",whiteSpace: "nowrap",width:'100%',marginTop:'42px',height:"138px",marginBottom:'0px'  }}>
                                  
                                            {deals.map((doc, index) => (
                                                
                                        
                                           <div style={{marginBottom:'22px',flex: 1}}>
                                                 

                                                        <FilePreview file={doc}   />
                                                 
                                                   
                                                
                                              </div>  
                                            ))}

                                           </div>
                           
                                 
                                   
                                
                                {/* </Grid>
                              
                                </Grid> */}
                            </div>
                            
                       
                        
                      
                    </Col>
                </Row>
            
            </Container>


            <SubprojectModal
                toggle={subProjectToggle}
                modal={subProjectModal}
                projectId={projectId}
                subProjectListApi={fetchDeals}
            />
        </div>
        </>
    )
}

export default Deals
