import React, { useState } from "react";
import axios from "axios"
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
const ProjectModal = (props) => {
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState('')
  const commonToggle = () => setCommonModal(!commonModal)
  const [title, setTitle] = useState();
  const token = localStorage.getItem("token");
  var formData = new FormData();
  
  const orgId = localStorage.getItem("orgId");

  async function addProject() {
    await axios
      .post(url + "/api/project/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("RESP", res);
        if(res.status===200)

        // alert(title + " added successfully !")
        props.projectListApi();
      })
      .catch((err) => {
        console.log("ERROR", err);
        setMsg("Error");
        setCommonModal(true);
        // alert("Error !")
      });
  }

  function sendData() {
    formData.append("organisation_id",orgId);
    formData.append("project_name", title);

    // formData.append("Description",description);

    // for (var key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }
    if(title===""){
      setMsg("Please enter the title!");
        setCommonModal(true);
      // alert("Please Enter The Tile !");
    }
    else{
      addProject();
    }
  }

  function handleClear(){
    setTitle("");
  }

  const closeBtn = (
    <button className="close" onClick={()=>{props.toggle();handleClear();}} style={{color:"red"}}>
      &times;
    </button>
  );
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle} close={closeBtn} style = {{padding : '4px 15px'}}>
          <b>Project Title</b>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Title"><strong>Project Title</strong></Label>
            <Input
              type="text"
              placeholder="Enter Project Title"
              id="Title"
              name={title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {/* <Label for="Description">Description</Label>
            <Input
              type="text"
              placeholder="Description"
              name={description}
              value={description}
              id="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            /> */}
          </FormGroup>
        </ModalBody>
        <ModalFooter style = {{padding : '4px 15px'}}>
          <Button
            color="primary"
            onClick={() => {
              props.toggle();
              sendData();
            }}
          >
           &nbsp;<strong> Add</strong>&nbsp;&nbsp;
          </Button>
          <Button color="secondary" onClick={()=>{props.toggle();handleClear()}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <CommonModal
      modal={commonModal}
      toggle={commonToggle}
      msg={msg}
      />
    </div>
  );
};

export default ProjectModal;
