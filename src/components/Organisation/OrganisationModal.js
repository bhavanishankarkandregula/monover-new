import React, { useState } from "react";
import axios from "axios";
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
const ProjectModal = (props) => {
  const [orgName, setOrgName] = useState("");
  const [msg, setMsg] = useState("");
  console.log(props);
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);


  const toggle = () => {
    setModal(!modal);
    props.organisationListAPI();
    
  };
  // var formData = new FormData();

  async function addOrganition() {
    console.log(orgName);
    await axios
      .post(
        url + "/api/organisation/",
        { name: orgName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("RESP", res);
        // alert(orgName + "added successfully");
        setMsg(orgName + " added successfully");
        setModal(true);
        console.log("Added Organisation", orgName);
        handleClear();
        
        
      })
      .catch((err) => {
        console.log("ERROR", err);
        handleClear();
      });
  }

  const check = (e)=>{
    console.log(e.key);
  }

  function sendData() {
    // formData.append("organition", orgName);

    if (orgName === "") {
      alert("Please Enter The organition name !");
    } else {
      var i;
      for (i = 0; i < props.ownedOrganisation.length; i++) {
        if (orgName === props.ownedOrganisation[i].name) {
          alert("Organisation already exists");
          return;
        }
      }
      addOrganition();
      props.toggle();
    }
  }
  function handleClear() {
    setOrgName("");
    props.toggle();
  }

  const closeBtn = (
    <button className="close" onClick={props.toggle} style={{ color: "red" }}>
      &times;
    </button>
  );
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader
          toggle={props.toggle}
          close={closeBtn}
          style={{ padding: "4px 15px" }}
        >
          <b> Organisation</b>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendData();
            }}
          >
            <FormGroup>
              <Label for="Title">
                <strong>Organisation Name</strong>
              </Label>
              <Input
                type="text"
                placeholder="Enter organisation name"
                id="organition"
                name={orgName}
                value={orgName}
                onChange={(e) => {
                  setOrgName(e.target.value);
                }}
              />
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter style={{ padding: "4px 15px" }}>
          <Button
            color="primary"
            onClick={() => {
              props.toggle();
              sendData();
            }}
          >
            &nbsp;<strong> Add</strong>&nbsp;&nbsp;
          </Button>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal}  toggle={toggle}>
        <ModalBody>{msg}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle} style={{ fontSize: "12px" }}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProjectModal;
