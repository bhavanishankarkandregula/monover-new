import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../GlobalUrl";
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

const MemberAddModal = (props) => {
  console.log("MODAL PROPS", props);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("orgId");
  const [modal, setModal] = useState(false);
  const [validEmail, setValidEmail] = useState("");
  const toggle = () => {
    setModal(!modal);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    props.setValidEmail(e.target.value);
  };

  var emailRegex =
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const is_email_valid = () => {
    if (email == "") {
      return true;
    }
    return emailRegex.test(email.toLowerCase().trim());
  };

  async function addMemberApi() {
    await axios
      .post(
        url + `/api/user/organisation/members/${orgId}/`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(msg);
        props.toggle();
        setMsg(res.data.message);
        console.log(msg);
        toggle();
        // alert(res.data.message);
      })
      .catch((error) => {
        // alert("Error !")
        // setMsg("Error");
        props.setErrorMessage();
        console.log(error);
      });
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
          <b> Member Email</b>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addMemberApi();
            }}
          >
            <FormGroup>
              <Label for="Title">
                <strong>Email</strong>
              </Label>
              <Input
                style={
                  props.errorMemberMessage === "Invitation cannot be Sent"
                    ? { border: "1px solid red" }
                    : null
                }
                type="email"
                placeholder="Add new member email"
                id="email"
                name=""
                onChange={handleEmail}
                required
              />
            </FormGroup>
          </form>

          <p
            style={{
              marginLeft: "6px",
              marginTop: "-10px",
              fontSize: "13.5px",
              color: "red",
            }}
          >
            {!is_email_valid() && "Enter valid email address"}
          </p>
          <p
            style={{
              marginLeft: "6px",
              marginTop: "-10px",
              fontSize: "13.5px",
              color: "red",
            }}
          >
            {props.errorMemberMessage}
          </p>
        </ModalBody>
        <ModalFooter style={{ padding: "4px 15px" }}>
          <Button onClick={addMemberApi} color="primary" type="submit">
            &nbsp;<strong> ADD</strong>&nbsp;&nbsp;
          </Button>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal} toggle={toggle}>
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

export default MemberAddModal;
