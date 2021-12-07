

import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../GlobalUrl";
import ScreenTop from "./mobileComp/ScreenTop";
import Loader from './Loader'
import FilePreview from "./DragAndDrop/FilePreview7";
import Top from "./Top";
import {
    Container,
    Tooltip,
    OverlayTrigger,
    Row,
    Col,
} from "react-bootstrap";
import {
    SiMicrosoftexcel,
} from "react-icons/all";
import AddFolder2 from "../images/folder-add2.png";
import Share from "./Share";

import { MdCalendarViewMonth } from "react-icons/all";
import SubprojectModal from './DragAndDrop/subprojectModal'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import {
    FaChevronDown,
    AiOutlineFileZip,
    
    // SiMicrosoftexcel,
    BiSort,
    BiMenuAltLeft,AiOutlineDatabase,
  
    BsCalculator,
    BsFilterSquare,
    BsReceiptCutoff,
    BsReceipt,
    IoCalculatorOutline,
    GrHost

} from "react-icons/all";
import logo from '../images/landing/icon.svg' ;
import { useHistory } from "react-router";
const Deals = ({ match }) => {

    const projectId = match.params.projectId
    var history=useHistory()
    const [deals, setDeals] = useState([])
    const [clientName, setClientName] = useState('')
    const [loading, setLoading] = useState(false)
 const [subProjectModal, setSubProjectModal] = useState(false);
  console.log("pre",projectId)
//  alert(projectId)
    const fetchDeals = async () => {
        setLoading(true)
        const { data } = await axios.get(`${url}/api/project/${projectId}/list_projects`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log("data",data)
        setClientName(data.data.project_name)
        setDeals(data.data.sub_project)
        setLoading(false)
    }

// console.log("clientname",clientName)
// console.log("deals",deals)

    useEffect(() => {
        fetchDeals()
    }, [])

    const subProjectToggle = () => {
        setSubProjectModal(!subProjectModal);
    };

    return (
        <>
        <div className='main' style={{ width: '100%' }}>
            <ScreenTop />
            <Top />
            {loading && <Loader />}
            <Container style={{maxWidth:'98.4%'}}>
                <div style={{display:'flex',flexDirection:'row'}}>
                <div className='' style={{marginTop:'30px'}}>
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
                    <p ><b style={{fontSize:11,fontWeight:700}}>New Deal</b></p>
                </div>
                <div>
                <h2 className='' style={{fontSize:'29px',marginTop:'35px',marginLeft:'430px',fontWeight:'bold'}}>{clientName}</h2>
                </div>
                </div>
                <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'18px'}}>
                
                
                <div className='d-flex  'style={{borderRadius:'5px',marginTop:'0px'}}>
{/* <div style={{marginRight:'100px'}}> */}

<MdCalendarViewMonth onClick={() => history.push(`/alldeals/${projectId}`)} style={{cursor:'pointer',marginTop:'1px',fontSize:33,color:'#b2bec3'}}  />
<ViewListIcon onClick={() => history.push(`/alldealstwo/${projectId}`)} style={{cursor:'pointer',fontSize:35,color:'#b2bec3',marginRight:'40px'}} />
{/* </div> */}


                                <div style={{ fontWeight: 'bold',marginTop:'5px',borderRadius:'8px', background: 'lightgray', marginLeft: 'auto',height:'28px',width:'158px' }}>
                               
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
                <Row style={{marginRight:'0px'}}>
                    {deals.map(deal => (
                        <Col key={deal.id} xs={12}  >
                            <div className='bz-card' style={{marginTop:'0px',height:'250px',width:'101%',marginRight:'0px',marginBottom:'45px'}}>
                                <diiv className='d-flex flex-row'>
                                    <h2 style={{fontSize:'23px',fontWeight:'bold',marginTop:'7px',marginLeft:'20px',width:'240px'}}>{deal.sub_project_name}</h2>
                                    <div className='d-flex flex-row align-items-center' style={{marginRight:'13px',marginLeft:'80px',marginTop:'0px'}}>
                                    <img src={logo} style={{cursor:'pointer'}}  width='21px'></img>
                                        <Share item='folder' id={deal.id} />
                                        <SiMicrosoftexcel size={24} />
                                    </div>
                                </diiv>
                                {deal.documents.length <= 0 && <p>No Documents</p>}
                                <Row style={{marginLeft:'25px',marginRight:'0px',marginTop:'20px'}}>
                                {deal.documents.map((doc,index) => (
                                    <div>
                                     {/* {index>=1? */}
                                    <div key={doc.id} style={{marginBottom:'26px',marginLeft:'0px',marginRight:'31px'}} >
                                        <FilePreview file={doc} />
                                    </div>
                                     {/* :<div key={doc.id} style={{marginBottom:'26px',marginRight:'20px',marginLeft:'20px'}} >
                                     <FilePreview file={doc} />
                                 {/* </div>} */}
                                     {/* </div> */}
                                     </div>
                                ))}
                                </Row>
                            </div>
                        </Col>
                    ))}
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