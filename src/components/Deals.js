

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
import Select from 'react-select';

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

const deleteDeal = async (dealId) => {
    setLoading(true)
    await axios
      .delete(
        url + `/api/document/${dealId}/`,
        {
          
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        console.log("PATCH RESPONSE", res.data);
        fetchDeals()
       
      })
      .catch((err) => {
        console.log("patch req err", err);
      });
    //   alert("Deai ID: "+ dealId)
      setLoading(false)


}





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

    const mostRecentOptions = []
    mostRecentOptions.push({value: 1, label: 'Date'})
    mostRecentOptions.push({value: 2, label: 'Size'})
      

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
                                   <Select
                                        classNamePrefix="select"
                                        defaultValue={{value: "0", label:"Most Recent"}}
                                        name="most_recent_deals"
                                        options={mostRecentOptions}
                                        onChange={(e) => console.log("Most Recent: " + e.value)}
                                    />
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
                                           <OverlayTrigger placement={"top"} overlay={<Tooltip>Catalog</Tooltip>}>
                                           <img src={logo} style={{cursor:'pointer'}}  width='21px'></img>
                                           </OverlayTrigger>
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
                                                 

                                                        <FilePreview file={doc} deletedeal={deleteDeal}  />
                                                 
                                                   
                                                
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
