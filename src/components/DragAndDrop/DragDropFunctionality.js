import React, {
  Component,
  useState,
  Redirect,
  useCallback,
  useEffect,
} from "react";
import ScreenTop from "../mobileComp/ScreenTop";
import Top from "../Top";
import { url } from "../../GlobalUrl";
import {
  RiDragDropLine,
  HiOutlineDocumentDuplicate,
  RiDeleteBin4Line,
} from "react-icons/all";
import { Button, Row } from "react-bootstrap";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import FileUploadApp from "../FileUpload/FileUploadApp";

function DragDrop(props) {
  const [file, setFiles] = useState([]);
  const [res, setRes] = useState([]);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("orgId");
  var fileData = new FormData();
  var allfiles = new FormData();
  const [height, setheight] = useState(45);

  // console.log(token, orgId);

  // this.getRootProps== useDropzone({ onDrop });

  // { this.getRootProps, this.getInputProps, this.isDragActive } = useDropzone({ onDrop });

  const onDelete = (dfile) => {
    // let a = [];
    // a = res.filter((file) => file.name !== dfile);
    // console.log('a',(a))
    // console.log('d',typeof(dfile))
    setRes((res) => {
      const l = res.filter((file) => file.name !== dfile);
      console.log("li", l);
      return l;
    });
    setFiles((file) => {
      const b = file.filter((f) => f !== dfile);
      console.log(b);
      return b;
    });
    setCount((count) => {
      return count + 1;
    });
  };

  const onDrop = useCallback((files) => {
    // console.log('hello',files)
    // console.log("hello");
    let fileList = file;
    let resultList = res;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;

      fileList.push(files[i].name);
      resultList.push(files[i]);

      if (resultList.length > 11) {
        setheight((height) => {
          return height + 4;
        });
      }
    }
    console.log("r", resultList);

    setFiles(fileList);
    setRes(resultList);
    setCount((count) => {
      return count + 1;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    console.log(file);
  }, [setRes, setCount]);

  // handleDrop = (files) => {
  //   console.log(orgId)
  //   let fileList = this.state.files
  //   let resultList = this.state.result
  //   for (var i = 0; i < files.length; i++) {
  //     if (!files[i].name) return
  //     fileList.push(files[i].name)
  //     resultList.push(files[i])
  //   }
  //   this.setState({ files: fileList })
  //   this.setState({ result: resultList })
  // }

  let sendProjectData = () => {
    var fileData = new FormData();

    for (let element of res) {
      fileData.append("file", element, element.name);
    }

    // console.log('allfiles',allfiles);
    fileData.append("subproject", "newproject");
    fileData.append("document_name", "chirag");
    fileData.append("organisation_id", orgId);
    // for (var key of fileData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    addProject(fileData);
  };

  let addProject = async (fileData) => {
    await axios
      .post(url + "/api/document/", fileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("documentApiResponse", res);
        props.history.push("/DisplayDocuments");
        handleClear();
      })
      .catch((err) => {
        console.log("documentApiError", err);
        handleClear();
      });
  };

  //     async function sendDocumentData() {
  //     await axios
  //       .post(url + "/api/document/", files, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log("DocumentApiResponse", res);
  //       })
  //       .catch((err) => {
  //         console.log("DocumentApiError", err);
  //       });
  //   }

  let handleClear = () => {
    setFiles([]);
    setRes([]);
  };

  // <div {...getRootProps()}>
  //   <input {...getInputProps()} />
  //   {isDragActive ? (
  //     <p>Drop the files here ...</p>
  //   ) : (
  //     <p>Drag 'n' drop some files here, or click to select files</p>
  //   )}
  // </div>

  return (
    <div class="main" style={{width:"100%"}}>
      <ScreenTop />
      <Top />
      <FileUploadApp />
      {/* <div
        style={{
          textAlign: "center",
          margin: "1.5rem auto",
          marginBottom: "0px",
        }}
      >
        <Row>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div
                style={{
                  height: "45vw",
                  width: "40vw",
                  backgroundColor: "rgb(0, 26, 102)",

                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    left: 0,
                    textAlign: "center",
                    color: "white",
                    fontSize: "2vw",
                    fontWeight: "bolder",
                  }}
                >
                  <div>DROP HERE :)</div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  height: `${height}vw`,
                  width: "40vw",
                  backgroundColor: "lightblue",

                  position: "relative",
                }}
              >
                {file.map((file1, i) => (
                  <div
                    style={{
                      backgroundColor: "rgba(0, 64, 128,1)",
                      color: "white",
                      border: "1px solid black",
                      padding: "10px",
                      marginLeft: "0px",
                      paddingLeft: "0px",
                      textAlign: "left",
                      // borderRadius: "45%",
                      fontSize: "1.25vw",
                      zIndex: "6",
                      position: "relative",
                    }}
                    key={i}
                  >
                    <HiOutlineDocumentDuplicate
                      style={{ marginRight: "1vw", marginLeft: "1vw" }}
                      fontSize={"2vw"}
                    />
                    {file1}
                    <RiDeleteBin4Line
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(file1);
                      }}
                      style={{ float: "right", color: "rgb(255, 0, 0)" }}
                      fontSize={"2vw"}
                    />
                  </div>
                ))}
                <div style={{ zIndex: 1 }}>
                  <RiDragDropLine
                    style={{ top: "13vw", position: "absolute", left: "38%" }}
                    fontSize={"10vw"}
                  />
                </div>
                <p
                  style={{
                    fontSize: "2vw",
                    marginBottom: "10vw",
                    fontWeight: "bolder",
                    top: "23vw",
                    position: "absolute",
                    left: "20%",
                  }}
                >
                  DROP AND DROP FILES HERE<br></br>OR<br></br>CLICK HERE TO
                  UPLOAD
                </p>
              </div>
            )}
            <br></br>
          </div>
        </Row>

        <Row></Row>
      </div>
      <Button
        style={{
          textAlign: "center",
          margin: "30px auto",
          marginBottom: "40px",
        }}
        onClick={() => {
          sendProjectData();
        }}
        variant="outline-success"
      >
        Submit */}
      {/* </Button>{" "} */}
    </div>
  );
}

export default DragDrop;
