import React, { useState } from "react";
import {
  Modal,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Button,
  Tooltip,
} from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { url } from "../GlobalUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IoShareSocialOutline,
  MdSend,
  FaPlusCircle,
  FcCancel,
  IoCloseCircleOutline,
  AiOutlinePlus,
} from "react-icons/all";

const Share = (props) => {
  const [emailError, setEmailError] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);

  //Modal Toggle
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow((prev) => !prev);
    setEmailError(null);
  };

  const handleShow = () => setShow(true);

  const [fields, setFields] = useState([{ value: null }]);

  function handleChange(i, event) {
    setEmailError(null);
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    validationHandler();
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  const validationHandler = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    fields.map((val) => {
      if (re.test(val.value)) {
        setEmailError(null);
        setIsEmailValid((prev) => !prev);
        shareHandler();
      } else {
        setEmailError("Please provide valid emails");
        setIsEmailValid((prev) => !prev);
      }
    });
  };

  var bodyFormData = new FormData();
  let email = [];
  let id = [props.id];

  const notifySuccess = () => toast.success("Email sent successfully!");
  const notifyError = () => toast.error("Something went wrong!");

  const shareHandler = async () => {
    // handleClose()

    // console.log("fields",fields)
    fields.map((val) => {
      email.push(val.value);
    });
    // console.log("fie",email)
    if (props.item === "folder") {
      bodyFormData.append("user", JSON.stringify(email));
      bodyFormData.append("subproject", JSON.stringify(id));
    } else {
      bodyFormData.append("user", JSON.stringify(email));
      bodyFormData.append("document", JSON.stringify(id));
    }
    await axios
      .post(`${url}/api/shared/documents/`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        if (response.data.message === "Done") {
          notifySuccess();
        }
      })
      .catch(function (response) {
        notifyError();
        console.log(response);
      });
  };

  return (
    <div>
      <OverlayTrigger placement={"top"} overlay={<Tooltip>Share</Tooltip>}>
        <IconButton onClick={handleShow}>
          <IoShareSocialOutline color="black" />
        </IconButton>
      </OverlayTrigger>
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite via Email</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "50vh", overflowY: "scroll" }}>
          {fields.map((field, idx) => {
            return (
              <div key={`${field}-${idx}`}>
                <div className="d-flex  justify-content-center flex-row">
                  <InputGroup className="mb-3 border rounded">
                    {/* <div className="d-flex align-items-center justify-content-center"> */}
                    <InputGroup.Prepend>
                      <InputGroup.Text className="border-0" id="basic-addon1">
                        @
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      className="border-0"
                      type="email"
                      required
                      placeholder="Enter email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleChange(idx, e)}
                    ></FormControl>
                    <IoCloseCircleOutline
                      className="my-auto mr-2"
                      size={26}
                      color="red"
                      onClick={() => handleRemove(idx)}
                    />
                    {/* </div> */}
                  </InputGroup>
                </div>
              </div>
            );
          })}
          <div className="text-danger mb-2" style={{ fontSize: "15px" }}>
            {emailError}
          </div>
          <Button variant="outline-primary w-100" onClick={() => handleAdd()}>
            <FaPlusCircle className="mt-n1" size={18} color="#00BFFF" /> Add
            Email
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Cancel <FcCancel size={25} />
          </Button>
          <Button variant="outline-primary" onClick={validationHandler}>
            Send <MdSend color="#00BFFF" size={25} />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Share;
