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
  const [formLabel, setFormLabel] = useState("");
  // const [formData, setFormData] = useState();
  const [detailsValidator, setdetailsValidator] = useState(false);

  function addInput() {
    // console.log("Label", formLabel, "Data", formData);
    if (formLabel) {
      props.toggle();
      let newArr = [...props.docContents, formLabel];

      // newArr[props.index][formLabel]= formData;

      props.setDocContents(newArr);
      // console.log(props.docContents);
      setFormLabel("");
      setdetailsValidator(false);
    } else if (!formLabel) {
      setdetailsValidator(true);
      // console.log("please enter details");
    }

    // props.setDocContents((prev) => {
    //     return {
    //         ...prev,
    //         [formLabel]:formData
    //     }
    // });
    // console.log({ formLabel: formData });
  }
  // onclick on cancel btn of model
  const cancelModel = () => {
    // console.log(props.docContents);
    setdetailsValidator(false);
    props.toggle();
    // props.setDocContents(props.docContents?.pop());
    // props.docContents.pop()
  };
  const closeBtn = (
    <button className="close" onClick={props.toggle} style={{ color: "red" }}>
      &times;
    </button>
  );
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} backdrop="static">
        {/* <ModalHeader toggle={props.toggle} close={closeBtn}>
          Add new detail
        </ModalHeader> */}
        <ModalBody>
          <FormGroup>
            <Label for="Field">
              {props.toggleAdvance ? (
                <strong>Enter Label </strong>
              ) : (
                <strong>Enter Value </strong>
              )}
            </Label>
            <Input
              type="text"
              placeholder="Field Name"
              id="Field"
              name={formLabel}
              // value={formLabel}
              onChange={(e) => {
                setFormLabel(e.target.value);
              }}
            />
            {detailsValidator && (
              <h6 style={{ color: "red", fontWeight: "bold", margin: "5px 0" }}>
                Please enter value!
              </h6>
            )}
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
          <Button
            className="w-100"
            color="primary"
            onClick={() => {
              // props.toggle();
              addInput();
            }}
          >
            <strong>&nbsp;Add &nbsp;</strong>
          </Button>
        </ModalBody>
        {/* <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              // props.toggle();
              addInput();
            }}
          >
            <strong>&nbsp;Add &nbsp;</strong>
          </Button> */}
        {/* <Button
            color="secondary"
            onClick={
              () => cancelModel()
              // props.toggle
            }
          >
            <strong> Cancel</strong>
          </Button> */}
        {/* </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default DocumentDetailsModal;
