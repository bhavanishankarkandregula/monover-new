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

const DocumentDetailsModal = (props) => {
  const [formLabel, setFormLabel] = useState();
  const [formData, setFormData] = useState();

  function addInput() {
    // console.log("Label", formLabel, "Data", formData);
    let newArr = [...props.docContents, [formLabel, formData]];

    // newArr[props.index][formLabel]= formData;

    props.setDocContents(newArr)
    console.log(props.docContents);


    // props.setDocContents((prev) => {
    //     return {
    //         ...prev,
    //         [formLabel]:formData
    //     }
    // });
    // console.log({ formLabel: formData });
  }

  const closeBtn = (
    <button className="close" onClick={props.toggle} style={{ color: "red" }}>
      &times;
    </button>
  );
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle} close={closeBtn}>
          Add new detail
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Field"><strong>Enter Change Name</strong></Label>
            <Input
              type="text"
              placeholder="Field Name"
              id="Field"
              name={formLabel}
            //   value={formLabel}
              onChange={(e) => {
                setFormLabel(e.target.value);
              }}
            />
            {/* <Label for="Data" style={{ marginTop: "8px" }}><strong>Data</strong></Label>
            <Input
              type="text"
              placeholder="Data"
              name={formData}
              value={formData}
              id="Data"
              onChange={(e) => {
                setFormData(e.target.value);
              }}
            /> */}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              props.toggle();
              addInput();
            }}
          >
            <strong>&nbsp;Add &nbsp;</strong>
          </Button>
          <Button color="secondary" onClick={props.toggle}>
            <strong> Cancel</strong>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DocumentDetailsModal;
