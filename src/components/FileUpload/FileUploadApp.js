import React, { useState } from "react"
import FileUpload from "./fileUploadComponent"
import axios from "axios"
import { Button, Row } from "react-bootstrap"
import { url } from "../../GlobalUrl"
import { useHistory } from "react-router"

function FileUploadApp(props) {
  const token = localStorage.getItem("token")
  const orgId = localStorage.getItem("orgId")
  const [is_submitting, set_submitting] = useState(false)
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  })
  const [files_key, set_key] = useState(new Date().toISOString())
  const history = useHistory()
  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!orgId)
      return window.alert("Please select organisation and come back here !!!")
    var fileData = new FormData()

    for (let element of newUserInfo.profileImages) {
      fileData.append("file", element, element.name)
      console.log(element.name)
    }
    fileData.append("subproject", "newproject")
    fileData.append("document_name", "chirag")
    fileData.append("organisation_id", orgId)
    addProject(fileData)
  }

  let addProject = async (fileData) => {
    set_submitting(true)
    console.log("filedata",fileData)
    await axios
      .post(url + "/api/document/", fileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log("documentApiResponse", res)
        history.push("/DisplayDocuments")
        // window.history.push("/DisplayDocuments");
        handleClear()
      })
      .catch((err) => {
        console.log("documentApiError", err)
        window.alert("Error while uploading document")
        handleClear()
      })
  }

  let handleClear = () => {
    set_submitting(false)
    setNewUserInfo({
      profileImages: []
    })
    clear_files_also()
  }

  const clear_files_also = () => {
    set_key(new Date().toISOString())
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FileUpload
          label="Profile Image(s)"
          multiple
          key={files_key}
          updateFilesCb={updateUploadedFiles}
          clear_files_also={clear_files_also}
        />
        <div className="text-center">
          {
            newUserInfo.profileImages.length > 0 && (
              <Button
                style={{
                  textAlign: "center",
                  margin: "30px auto",
                  marginBottom: "40px"
                }}
                disabled={!newUserInfo.profileImages.length || is_submitting}
                variant="primary"
                type="submit"
              >
                {is_submitting ? "Submitting" : "Submit"}
              </Button>
            )
          }

        </div>

        {/* <button type="submit">Create New User</button> */}
      </form>
    </div>
  )
}

export default FileUploadApp
