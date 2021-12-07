import axios from "axios"
import React, { useState } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap"
import { url } from "../../GlobalUrl"
import CommonModal from "../CommonModal/CommonModal"

const EditprojectModal = (props) => {
  const [commonModal, setCommonModal] = useState(false)
  const [msg, setMsg] = useState("")

  const [title, setTitle] = useState("")
  const { subProjectListApi } = props

  // console.log("subprojectmodal",props);

  let subProjectId = props.subProjectId
  var formData = new FormData()

  const commonToggle = () => setCommonModal(!commonModal)

  async function editSubProjectNameApi(data) {
    // setLoading(true);
    if (title === "" || props.projectId === "") {
      return alert("Enter valid sub project name !")
    }
    props.toggle()
    await axios
      .patch(
        url + `/api/subproject/${subProjectId}/`,
        { sub_project_name: data },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then((res) => {
        // alert("subproject name updated ! ");
        setMsg("subproject name updated !")
        setCommonModal(true)
        handleClear()
        // setLoading(false);
        subProjectListApi()
      })
      .catch((err) => {
        console.log(err)
        // setLoading(false);
        alert("subproject name edit Error !")
      })
  }

  // async function addSubProject(props) {
  //   console.log(title);
  //   await axios
  //     .post(url + "/api/subproject/", formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       // console.log("RESP", res);
  //       if (res.status === 200) {
  //         setMsg(title + " added successfully !");
  //         setCommonModal(true);
  //         // alert(title +" added successfully !")
  //         subProjectListApi();
  //       }
  //       handleClear();
  //     })
  //     .catch((err) => {
  //       console.log("ERROR", err);
  //       setMsg("Error!");
  //       setCommonModal(true);
  //       // alert("Error !");
  //       handleClear();
  //     });
  // }

  // function sendData() {
  //   formData.append("project", props.projectId);
  //   formData.append("sub_project_name", title);

  //   // for (var key of formData.entries()) {
  //   //   console.log(key[0] + ', ' + key[1]);
  //   // }
  //   if (title === "" || props.projectId === "") {
  //     alert("Please Type sub-project name !");
  //   } else {
  //     addSubProject();
  //   }
  // }

  function handleClear() {
    setTitle("")
  }

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
          style={{ padding: "4px 15px" }}
        >
          <b>EDIT SUB PROJECT {props.subprojectName} NAME TO:</b>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              editSubProjectNameApi(title)
            }}
          >
            <FormGroup>
              <Label for="Title">
                <strong>New Title</strong>
              </Label>
              <Input
                type="text"
                placeholder="Enter new Subproject Title"
                id="Title"
                name={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter style={{ padding: "4px 15px" }}>
          <Button
            onClick={() => editSubProjectNameApi(title)}
            color="primary"
            type="submit"
          >
            &nbsp;<strong> Change</strong> &nbsp;
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
    </div>
  )
}

export default EditprojectModal
