import axios from "axios"
import React, { useState, useEffect } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { url } from "../../GlobalUrl"
import CommonModal from "../CommonModal/CommonModal"
import CommonModal1 from "../CommonModal/CommanModel1"
import Checks, { isAlphabets, isEmpty } from "./Checks"
import ClientModal from '../../components/comps/ClientModal'







import logo from '../../images/landing/icon.svg' ;
import {
    Container,
    Tooltip,
    OverlayTrigger,
    Row,
    Col,
} from "react-bootstrap";
import Share from '../Share'

import {
    FaChevronDown,
    AiOutlineFileZip,
    SiMicrosoftexcel,
    BiSort,
    BiMenuAltLeft,AiOutlineDatabase,

    BsCalculator,
    BsFilterSquare,
    BsReceiptCutoff,
    BsReceipt,
    IoCalculatorOutline,
    GrHost

} from "react-icons/all";
import { Link } from 'react-router-dom'
// import ReplyIcon from '@material-ui/icons/Reply';
import AddFolder2 from "../../images/folder-add2.png";
import sharedFolder from '../../images/shared-folder.png'



const SubprojectModal = (props) => {
  const [commonModal, setCommonModal] = useState(false)
  const [commonModal1, setCommonModal1] = useState(false)
  const [msg, setMsg] = useState("")
const [message,setMessage]=useState('')
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [showClientModal, setShowClientModal] = useState(false)
  // console.log("subprojectmodal",props);
  const handleClose = () => setShowClientModal(false);

  // var formData = new FormData();




  const { subProjectListApi } = props
const {fetchClients} = props



  useEffect(() => {
    if (props.projectId) {
      setClient(props.projectId)
    }
  }, [])


  const token = localStorage.getItem("token")

  console.log("drrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",client)

  const commonToggle = () => setCommonModal(!commonModal)
  const commonToggle1 = () => setCommonModal1(!commonModal1)
  async function addSubProject() {
   console.log("op",title)
    await axios
      .post(url + "/api/cu-subproject/", {
         "sub_project_name": title,
         "project_id": client
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        // console.log("RESP", res);
        if (res.status === 200) {
          setMsg(title + " folder added successfully !")
          setCommonModal(true)
          // alert(title +" added successfully !")
          subProjectListApi()
        }
        handleClear()
      })
      .catch((err) => {
        console.log("ERROR", err)
        setMsg("Error!")
        setCommonModal(true)
        // alert("Error !");
        handleClear()
      })
  // }
  }
  function sendData() {

    var err = false;
    if ( title == '') {

      setMessage("Please Enter Deal  Name ")
      setCommonModal1(true)
      err=true
    } 
    if(client == '') {
      setMsg("Please Select Client Name")
      setCommonModal(true)
      err=true
  

    }if(!err) {
      addSubProject()
      props.toggle()
    }
  }

  function handleClear() {
    setTitle('')
    setClient('')
    props.toggle()
  }

  // window.$(document).ready(function () {
  //   window.$("#Title").keypress(function (e) {
  //     if (e.keyCode === 13) {
  //       props.toggle();
  //       sendData();
  //     }
  //   });
  // });

  const closeBtn = (
    <button
      className="close"
      onClick={() => {
        props.toggle()
        handleClear()
      }}
      style={{ color: "red" }}
    >
      &times;
    </button>
  )
  return (
    <div>
     
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader
          toggle={props.toggle}
          close={closeBtn}
          style={{ padding: "4px 10px" }}
        >
          <b>Create New Deal</b>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendData()
            }}
          >
            <FormGroup>
              <Input
                type="text"
                placeholder='Enter Deal folder title'
                id="Title"
                name={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                required
              />
            </FormGroup >
            {!props.projectId && (
        
                <Input type="select" name="selectMulti" id="exampleSelectMulti"multyple 
             
                  onChange={(e) => setClient(e.target.value)}
                >
                  <option defaultValue="">Select client</option>
                  {props.clients.map(client => (
                    <option key={client.id} value={client.id}>{client.project_name}</option>
                  ))}
                </Input>
           
            )}
          </form>
          <div  style={{marginLeft:'0px',display:'flex',justifyContent:'flex-end',marginRight:'4px'}} >
        {/* <div style={{display:'flex',justifyContent:'flex-end'}}> */}
                                    {/* <OverlayTrigger
                                        placement={"top"}
                                        overlay={<Tooltip>Add Client</Tooltip>}
                                    >
                                        <img
                                            alt="folder-icon-add"
                                            // className="c-pointer"
                                            src={AddFolder2}
                                            style={{ width: "37px", cursor: "pointer", height: "37px",fontWeight:800 }}
                                            onClick={() => {
                                                setShowClientModal(prev => !prev)
                                            }}
                                        />
                                    </OverlayTrigger> */}
                                    {/* <div>b</div> */}
                           {/* </div>
                           <div> */}
                                    <p     onClick={() => {
                                                setShowClientModal(prev => !prev)
                                            }}><b style={{fontSize:14,cursor:'pointer',fontWeight:500,color:'#0070ff'}}>New Client</b></p>
                                {/* </div> */}
                                </div>
        </ModalBody>
        
        <ModalFooter style={{ padding: "14px 15px" }}>
          <Button
            type="submit"
            onClick={() => {
              sendData()
            }}
            id="addButton"
            color="primary"
          >
            &nbsp;<strong> Add</strong> &nbsp;
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              handleClear()
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <CommonModal modal={commonModal} toggle={commonToggle} msg={msg} />
      <CommonModal1 modal={commonModal1} toggle={commonToggle1} message={message} />
      <ClientModal show={showClientModal}
      fetchClients={fetchClients}
      handleClose={handleClose} />
    </div>
  )
}

export default SubprojectModal
