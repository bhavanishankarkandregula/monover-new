import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LoginModal = (props) => {
  console.log("PRops",props);
  
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalBody style={{fontSize:"24px",textAlign:"center"}}>
          {props.setMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle} style={{fontSize:"12px"}}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginModal;
