import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { url } from "../../GlobalUrl";
import CommonModal from "../CommonModal/CommonModal";
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
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState('')
  const commonToggle = () => setCommonModal(!commonModal);
  const [title, setTitle] = useState();
  const { subProjectListApi } = props;
  const [showClientModal, setShowClientModal] = useState(false)
  // console.log("subprojectmodal",props);
  const handleClose = () => setShowClientModal(false);
  const token = localStorage.getItem("token");
  var formData = new FormData();

  async function addSubProject(props) {
    await axios
      .post(url + "/api/subproject/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("RESP", res);
        if (res.status === 200) {
          setMsg(title + " added successfully !");
          setCommonModal(true);
          // alert(title +" added successfully !")
          subProjectListApi();
        }
        handleClear();
      })
      .catch((err) => {
        console.log("ERROR", err);
        setMsg("Error!");
        setCommonModal(true);
        // alert("Error !");
        handleClear();
      });
  }

  function sendData() {
    formData.append("project", 1);
    formData.append("sub_project_name", title);

    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    if (title === "" || props.projectId === "") {
      alert("Please Type sub-project name !");
    }
    else {
      addSubProject();
    }
  }

  function handleClear() {
    setTitle("");
  }

  const closeBtn = (
    <button className="close" onClick={() => { props.toggle(); handleClear(); }} style={{ color: "red" }}>
      &times;
    </button>
  );
  return (
    <div>

      <Modal isOpen={props.modal} toggle={props.toggle}>
    
        <ModalHeader toggle={props.toggle} close={closeBtn} style={{ padding: '4px 15px' }} >
          {/* <b>Sub Project Title</b> */}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Title"><strong>SubProject Title</strong></Label>
            <Input
              type="text"
              placeholder="Enter Subproject Title"
              id="Title"
              name={title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

          </FormGroup>
        </ModalBody>
        <ModalFooter style={{ padding: '4px 15px' }}>
          <Button
            color="primary"
            onClick={() => {
              props.toggle();
              sendData();
            }}
          >
            &nbsp;<strong> Add</strong> &nbsp;
          </Button>
          <Button color="secondary" onClick={() => { props.toggle(); handleClear() }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <CommonModal
        modal={commonModal}
        toggle={commonToggle}
        msg={msg}
      />
        <ClientModal show={showClientModal} handleClose={handleClose} />
       
    </div>
  );
};

export default SubprojectModal;
