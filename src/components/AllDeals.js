
import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../GlobalUrl";
import ScreenTop from "./mobileComp/ScreenTop";
import Loader from './Loader'
import FilePreview from "./DragAndDrop/FilePreview6";
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
 import {MdCalendarViewMonth} from "react-icons/all"

import SubprojectModal from './DragAndDrop/subprojectModal'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import logo from '../images/landing/icon.svg' ;
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
import { useHistory } from "react-router";
const Deals = ({ match }) => {

    const projectId = match.params.id
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
                <div className='pt-3 pb-3'>
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
                <div style={{display:'flex',flexDirection:'row'}} className='d-flex flex-row justify-content-between'>
                <h2 className='' style={{fontSize:'26px',fontWeight:'bold',marginBottom:'26px'}}>{clientName}</h2>
                
                <div className='d-flex flex-row justify-content-between'style={{borderRadius:'5px',marginTop:'2px'}}>
{/* <div style={{marginRight:'100px'}}> */}

<MdCalendarViewMonth onClick={() => history.push(`/alldeals/${projectId}`)} style={{cursor:'pointer',marginTop:'1px',fontSize:32,color:'#b2bec3'}}  />
<ViewListIcon onClick={() => history.push(`/alldealstwo/${projectId}`)} style={{cursor:'pointer',fontSize:34,color:'#b2bec3',marginRight:'40px'}} />
{/* </div> */}


                                <div style={{ fontWeight: 'bold',marginTop:'5px',borderRadius:'8px', background: 'lightgray', marginLeft: 'auto',height:'28px',width:'158px' }}>
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
{(deals.length === 0) && <h3 style={{marginLeft:'300px'}} className='m-5 text-center'>No Deal</h3>}
                <Row style={{marginRight:'0px'}}>
               
                    {deals.map(deal => (
                        <Col key={deal.id} xs={12} md={4} >
                            <div className='bz-card' style={{marginTop:'0px',width:'420px',marginRight:'0px'}}>
                                <diiv className='d-flex flex-row justify-content-between'>
                                    <h3 style={{fontSize:'22px',fontWeight:'bold',marginTop:'17px',marginLeft:'13px'}}>{deal.sub_project_name}</h3>
                                    <div className='d-flex flex-row align-items-center' style={{marginRight:'9px',marginTop:'8px'}}>
                                    <img src={logo} style={{cursor:'pointer'}}  width='21px'></img>
                                        <Share item='folder' id={deal.id} />
                                        <SiMicrosoftexcel size={24} />
                                    </div>
                                </diiv>

                                {deal.documents.length <= 0 && <p>No Documents</p>}
                                <Row style={{marginLeft:'10px'}}>
                                {deal.documents.map(doc => (
                                    <div key={doc.id} style={{marginRight:'12px'}} >
                                        <FilePreview file={doc} />
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