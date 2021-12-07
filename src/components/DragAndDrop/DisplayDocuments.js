import React, { Component, useState, useEffect } from "react";
import RectangleSelection from "react-rectangle-selection";
import ScreenTop from "../mobileComp/ScreenTop";
import Top from "../Top";
import FolderImage from "../../images/folder-icon.png";
import "./DisplayDocuments.css";
import PdfIcon from "../../images/pdf-icon.png";
import ImageIcon from "../../images/image-file.png";
import WordIcon from "../../images/word-file.png";
import TextIcon from "../../images/text-file.png";
import InvalidIcon from "../../images/file3.jpeg";
import AddFolder from "../../images/folder-add2.png";
import IconButton from '@material-ui/core/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'

import {
  FcFolder,
  AiFillFolderOpen,
  GrCheckboxSelected,
  BiSelectMultiple,
  GrSelect,
} from "react-icons/all";
import { Nav, Button, Badge, Form, Spinner, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { Draggable, Droppable } from "react-drag-and-drop";
import { url } from "../../GlobalUrl";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import SubprojectModal from "./subprojectModal";
import FilesModal from "./FilesModal";
import { isURL } from "./FilePreview";
import FilePreview from "./FilePreview";

const token = localStorage.getItem("token");
const PROJECT_ID = null;

const DisplayDocuments = () => {
  const [data, setData] = useState([]);
  const [folder, setFolder] = useState([]);
  const [icon, setIcon] = useState("");
  const [draggedFiles, setDraggedFiles] = useState({});
  const [subProjectModal, setSubProjectModal] = useState(false);
  // const [commonModal, setCommonModal] = useState(false);
  // const [origin, setOrigin] = useState("");
  // const [target, SetTarget] = useState("");
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectMulti, setSelectMulti] = useState(false)
  const [choosedFolder, setChoosedFolder] = useState(null)
  const [editSubProjectModal, setEditSubProjectModal] = useState(false);
  const [subProjectId, setSubProjectId] = useState("");
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [origin, setOrigin] = useState("");
  const [target, SetTarget] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [subprojectName, setSubProjectName] = useState("");
  const alldocsId = useState([]);
  const alldocsPath = useState([]);
  const [modal, setModal] = useState(false)
  // const [msg, setMsg] = useState("")
  // const [commonModal, setCommonModal] = useState(false);
  // const [msg, setMsg] = useState("");

  const [is_docs_loading, set_docs_loading] = useState(true);
  const [is_folders_loading, set_folders_loading] = useState(true);
  const [is_submitting, set_submitting] = useState(false);
  const [suggestedDocs, setSuggestedDocs] = useState([]);
  const [suggestedFile, setSuggestedFile] = useState([]);
  const [folderIdToRemove, setFolderIdToRemove] = useState();
  const [fileToRemove, setFileToRemove] = useState();
  const [clients, setClients] = useState([])

  // Modal states
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  /////////////

  const alert = useAlert();
  const history = useHistory();

  const fetchClients = async () => {
    const { data } = await axios.get(url + '/api/all-project', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    setClients(data)
  }

  const getSuggestedDocs = async () => {
    return axios
      .get(url + "/api/suggested/document/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("suggested data", res.data);
        setSuggestedDocs(res.data);
      })
      .catch((error) => {
        //  setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    ((window.innerWidth <= 800)) && setTimeout(() => { modalToggler() }, 500)
    fetchClients()
  }, [])


  const setSelectFolder = (folder) => {
    setChoosedFolder(folder);
    setTimeout(() => { setShow(false) }, 200)
  }



  const check = (e) => {
    console.log(e.key);
  }

  useEffect(() => {
    getSuggestedDocs();

    // return axios
    //   .get(url + "/api/suggested/document/", {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("suggested data", res.data);
    //     setSuggestedDocs(res.data);
    //   });
  }, []);

  let getDocuments = async () => {
    // const response = await fetch(`${url}/api/document/`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // const res = await response.json()
    // console.log("res", res)
    // setData(res)
    // return res
    set_docs_loading(true);

    return axios
      .get(`${url}/api/filter/document/`)
      .then((res) => {
        // console.log(res.data)
        setData(res.data);
        set_docs_loading(false);
        getSuggestedDocs();
      })
      .catch((err) => {
        console.error(err);
        getDocuments();
      });
  };
  useEffect(() => {
    data.map((doc) => {
      alldocsId.push(doc.id);
      alldocsPath.push(doc.file);
    });
    localStorage.setItem("alldocs", JSON.stringify(alldocsId.slice(2)));
    localStorage.setItem("alldocsPath", JSON.stringify(alldocsPath.slice(2)));
  }, [data]);

  let createArray = () => { };

  let getFolder = async () => {
    return axios
      .get(`${url}/api/subproject/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        getFolder();
      });
  };
  const subProjectToggle = () => {
    setSubProjectModal(!subProjectModal);
  };

  const editSubProjectToggle = () => {
    setEditSubProjectModal(!editSubProjectModal);
  };

  const commonToggle = () => setCommonModal(!commonModal);

  async function handleDelete(subProjectId) {
    axios
      .delete(url + `/api/subproject/${subProjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMsg("sub project deleted successfully!");
        setCommonModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const load_previous_documents = ({ sub_project_id }) => {
    return axios
      .get(url + `/api/subproject/${sub_project_id}/document/`)
      .then((res) => {
        return {
          sub_project_id: sub_project_id,
          documents: res.data,
        };
      })
      .catch((err) => {
        throw err;
      });
  };

  async function subProjectListApi() {
    //  setLoading(true);
    //  if (projectId) {
    set_folders_loading(true);
    await axios
      // .get(url + "/api/filter/sub/project/", {
      .get(url + "/api/cu-subproject/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("subprojectList", res.data)
        setCommonModal(true);
        setFolder(res.data)



        const promises = res.data.map((sub_project) => {
          return load_previous_documents({ sub_project_id: sub_project.id });
        });
        return Promise.all(promises);
      })
      .then((data) => {
        // console.log(data);
        const obj = data.reduce((init, item) => {
          return {
            ...init,
            [item.sub_project_id]: item.documents,
          };
        }, {});
        setDraggedFiles({
          ...draggedFiles,
          ...obj,
        });
        set_folders_loading(false);
      })
      .catch((error) => {
        //  setLoading(false);
        console.log(error);
      });
    //  }
  }

  useEffect(() => {
    getDocuments();
    getSuggestedDocs();
    createArray();
    // getFolder();
    subProjectListApi();

  }, []);

  const handleSelectFile = (checked, fileId) => {
    // console.log(checked, fileId)
    const existingFiles = JSON.parse(JSON.stringify(selectedFiles));
    if (checked) existingFiles.push(fileId);
    else {
      const index = existingFiles.indexOf(fileId);
      existingFiles.splice(index, 1);
    }

    setSelectedFiles(existingFiles);
    // console.log("hello", selectedFiles);
  };
  const addSuggestedDocs = (fileId, folderId) => {
    // console.log(fileId, folderId);
    // console.log(data, data.filter((item) => item.id == fileId)[0]);

    // console.log("kkkkkkkk", suggestedDocs);

    // setSuggestedDocs(() => {
    //   suggestedDocs.map((doc) => {
    //     if (Number(doc.id) === Number(folderId)) {
    //       if (doc) {
    //         doc.suggested_docs.filter((d) => d.id !== fileId);
    //         console.log("filtered doc", doc);
    //       }
    //     }
    //     return doc;
    //   });
    // });

    // suggestedDocs.map((doc) => {
    //   console.log("documents", doc.id, folderId);
    //   if (Number(doc.id) === Number(folderId)) {
    //     console.log("docs", doc);
    //     // suggest[0] ? suggest[0].suggested_docs : [];
    //     if (doc) {
    //       doc.suggested_docs.map((d) => {
    //         if (d.id === fileId) {
    //           console.log("yeahhhh", d);
    //         }
    //       });
    //     }
    //   }
    // });

    setDraggedFiles((prevState) => ({
      ...prevState,
      [folderId.toString()]: [
        ...(folderId in draggedFiles ? draggedFiles[folderId] : []),
        data.filter((item) => item.id == fileId)[0],
      ],
    }));

    setData(data.filter((item) => item.id != fileId));

    if (selectedFiles.includes(fileId)) {
      console.log("trueeeeeeeeeeeee");
      handleSelectFile(false, fileId);
    }
    console.log("selectedFiles", selectedFiles);
  };

  const SuggestedDoc = (folderId) => {
    const suggest = suggestedDocs.filter((doc) => doc.id === folderId);
    const ids = [];
    let suggestedfiles = [];
    if (draggedFiles[folderId]) {
      draggedFiles[folderId].map((file) => {
        ids.push(file.id);
      });
    }
    if (suggest[0]) {
      console.log("draggedFiles", draggedFiles[folderId], ids);
      const sfiles = suggest[0].suggested_docs;
      sfiles.length > 0 &&
        sfiles.map((file) => {
          if (!ids.includes(file.id)) {
            suggestedfiles.push(file);
          }
        });
      return suggestedfiles;
    }
    return [];
  };

  const onDrop = ({ file }, folder) => {
    // keep == as itself, don't change to ===

    const folderId = folder.id


    const f = data.filter((file1) => Number(file1.id) === Number(file))
    // console.log( "yoooooooooooooooo",f[0].document_name)

    toast.success(`${f[0].document_name} moved to ${folder.sub_project_name}`)

    setDraggedFiles((prevState) => ({
      ...prevState,
      [folderId.toString()]: [
        ...(folderId in draggedFiles ? draggedFiles[folderId] : []),
        data.filter((item) => item.id == file)[0],
      ],
    }));
    setData(data.filter((item) => item.id != file));
    if (selectedFiles.includes(file)) {
      handleSelectFile(false, file);
    }

    console.log("datttttttaaaaaaa", data)
  };


  const onCheck = (file, folder) => {



    if (folder) {
      const folderId = folder.id;
      toast.success(`${file.document_name} moved to ${folder.sub_project_name}`)
      // keep == as itself, don't change to ===
      setDraggedFiles((prevState) => ({
        ...prevState,
        [folderId.toString()]: [
          ...(folderId in draggedFiles ? draggedFiles[folderId] : []),
          data.filter((item) => item.id == file.id)[0],
        ],
      }));
      setData(data.filter((item) => item.id != file.id));
      if (selectedFiles.includes(file.id)) {
        handleSelectFile(false, file.id);
      }
    }


  };


  // console.log(selectedFiles)

  const onSubmit = () => {
    set_submitting(true);
    let promises = [];
    Object.entries(draggedFiles).forEach(([subprojectId, documents]) => {
      const sub_promises = documents.map((doc) => {
        return axios.post(`${url}/api/move/document/`, {
          subproject_id: subprojectId,
          document_id: doc.id,
        });
      });
      promises = [...promises, ...sub_promises];
    });

    return Promise.all(promises)
      .then(() => {
        set_submitting(false);
        history.push("/review");
        return toast.success("Moved files to respective folders successfully");
      })
      .catch((err) => {
        set_submitting(false);
        console.error(err);
        return toast.error("Failed to move files");
      });
  };

  const cancel = () => {
    setModal(!modal)
  }

  const toggle = () => {
    setModal(!modal)
    console.log("olderIdToRemove", folderIdToRemove, fileToRemove)

    setData([...data, fileToRemove]);
    setDraggedFiles({
      ...draggedFiles,
      [folderIdToRemove.toString()]: draggedFiles[folderIdToRemove].filter(
        (item) => item.id !== fileToRemove.id
      ),
    });
    // console.log(msg);
    // if (msg == "Password Changed!!") {
    //   window.location.replace("/profile")
    // } else {
    // history.push("/login-form")
    // }
  }

  const revertFile = (file, folderId) => {
    // console.log(file);
    setMsg("Are you sure you want to undo this file back to the documents?")
    setModal(true)
    setFolderIdToRemove(folderId)
    setFileToRemove(file);
    // if (
    //   !window.confirm(
    //     "Are you sure you want to undo this file back to the documents?"
    //   )
    // )
    //   return null;
    // // console.log(draggedFiles, file, folderId, draggedFiles[folderId]);
    setData([...data, file]);
    setDraggedFiles({
      ...draggedFiles,
      [folderId.toString()]: draggedFiles[folderId].filter(
        (item) => item.id !== file.id
      ),
    });
  };

  const handleDragOnClick = (folderId) => {
    if (selectedFiles.length < 1)
      return window.alert("Please select the documents");
    let index = 0;
    setTimeout(() => {
      onDrop({ file: selectedFiles[index] }, folderId);
      ++index;
    }, 500);
    // selectedFiles.map((fileId) => {
    //   console.log(fileId)
    //   return onDrop({ file: fileId }, folderId)
    // })
  };

  const FileIcon = ({ extension, fileURL }) => {
    if (extension === "jpg" || extension === "jpeg" || extension === "png")
      return (
        <img
          src={isURL(fileURL) ? fileURL : url + fileURL}
          width={80}
          alt="file"
        />
      );
    else if (extension === "pdf")
      return <img src={PdfIcon} width={80} alt="file" />;
    else if (extension === "doc" || extension === "docx")
      return <img src={WordIcon} width={80} alt="file" />;
    else if (extension === "txt")
      return <img src={TextIcon} width={80} alt="file" />;
    return <img src={InvalidIcon} width={80} alt="file" />;
  };

  const modalToggler = () => {
    setShow(true)
    setSelectMulti(true)
  }

  return (
    <div className="w-100">
      <ScreenTop />
      <Top />

      <ToastContainer
        className="mt-3 ml-5"
        style={{
          width:
            (window.innerWidth <= 800) && "80%"
        }}
        autoClose={4000}
      />

      <div
        style={{
          margin: "0px auto",
          textAlign: "center",
          marginBottom: "20px",
          height: "80vh",
        }}
        className="row w-100 justify-content-center"
      >
        <div className="col-11 col-md-7" style={{ height: "80vh", overflowY: 'scroll', borderRight: '1px #ccc solid' }}>
          {is_docs_loading ? (
            <div style={{ marginTop: "250px" }}>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <h4>Loading...</h4>
            </div>
          ) : (
            <div className="row">
              <div
                className="col-12"
                style={{ textAlign: "left", marginTop: "20px", }}
              >
                <Nav className='d-flex justify-content-between shadow bg-white rounded border' style={{ height: "69px" }} >
                  <Nav.Item className=" d-flex flex-column justify-content-center" >
                    <h3 className=" px-3 d-flex flex-column justify-content-center" >Documents</h3>
                  </Nav.Item>
                  <Nav.Item className="mr-2 ml-3">
                    {(!selectMulti && !choosedFolder) ? <IconButton style={{ backgroundColor: 'transparent' }} onClick={modalToggler}><BiSelectMultiple /><p className='mt-2 onhover' style={{ fontSize: '13px', fontWeight: '500' }}>Select Multiple Files</p></IconButton> :
                      <IconButton onClick={modalToggler}><BiSelectMultiple color='green' /><p className='mt-2 text-success' style={{ fontSize: '13px', fontWeight: '500' }}>{!choosedFolder ? 'Select Multiple Files' : `${choosedFolder.sub_project_name}`}</p></IconButton>}
                  </Nav.Item>
                </Nav>
                {(selectMulti && choosedFolder && (data.length > 0)) ?
                  (<h4
                    style={{
                      fontSize: "17px",
                      margin: "23px",
                      marginRight: "5px",
                      marginLeft: "0px"
                    }}
                  >


                    Select documents to move them into <AiFillFolderOpen size={24} color='red' /><span style={{ color: 'red' }}>{choosedFolder.sub_project_name}</span>


                  </h4>)
                  : (<h4
                    style={{
                      fontSize: "17px",
                      margin: "23px",
                      marginRight: "5px",
                      marginLeft: "5px"
                    }}
                  >

                    {
                      data.length > 0 ? (
                        (!(window.innerWidth <= 800)) && "You can drag these documents and drop them to the folders on right section"
                      ) : (
                        "All the files are dragged into the folders. Click submit to proceed further"
                      )
                    }

                  </h4>)}
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "1.2rem", textTransform: "uppercase" }}><GrSelect size='1.4rem' />{choosedFolder ? `  ${choosedFolder.sub_project_name} is selected` : '  Select folder to move the documents'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className='d-flex flex-wrap'>
                      {selectMulti && folder.map((f, i) => (
                        <div key={i} className='m-3'>
                          <IconButton onClick={() => setSelectFolder(f)}>{!choosedFolder ? <FcFolder /> : choosedFolder.id === f.id ? <AiFillFolderOpen color='skyblue' /> : <FcFolder />}</IconButton>
                          <p className='text-muted text-center'>{f.sub_project_name}</p>
                        </div>
                      ))}
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
              <div className="col-12" >
                <div className="row " style={{ margin: "0px -5px" }}>
                  {data.map((file, i) => {
                    // console.log("data", file);
                    // let extension = file.document_name.substring(
                    //   file.document_name.lastIndexOf(".") + 1
                    // );
                    return (
                      <Draggable
                        style={{ zIndex: "2", padding: "0px", width: "50%" }}
                        key={i}
                        type="file"
                        data={file.id}
                        className="col-xs-6 col-md-3 my-1 my-md-2"
                      >
                        {/* {(selectMulti && choosedFolder) && <Badge variant='dark' key={i} value={file} onClick={() => onCheck(file, choosedFolder.id)}>Move</Badge>} */}
                        <div onClick={() => onCheck(file, choosedFolder)} className="b-card px-0 my-2 mr-1 mx-md-2 pt-3" style={{ backgroundColor: "whitesmoke", height: "100%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }} >
                          <FilePreview
                            from={"doc"}
                            file={file}
                            is_draggable={true}
                            selectMulti={selectMulti}
                            choosedFolder={choosedFolder}

                          />
                          {/* <Link to={`/document-details/${file.id}`}><p>{file.document_name}</p></Link> */}
                        </div>
                        {/* <div className="b-card">
                      <div>
                        <FileIcon fileURL={file.file} extension={extension} />
                      </div>
                      <div className="text-left lead small">
                        {file.document_name.length < 20
                          ? file.document_name
                          : file.document_name.slice(0, 20) + "..."}
                      </div>
                    </div> */}
                      </Draggable>
                    );
                  })}
                </div>

              </div>

            </div>
          )}
        </div>
        <div

          className="col-10 col-md-5 mt-md-1"
          style={folder.length > 4 ? { height: "80vh", overflowY: "scroll" } : null}
          style={{ marginTop: "100px" }}

        >
          {false && is_folders_loading ? (
            <div>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <h4>Loading...</h4>
            </div>
          ) : (
            <div className="row mt-3">

              <div className="col-12 h3" style={{ textAlign: "left" }}>
                <Nav className='shadow p-3 mb-3 bg-white rounded border' style={{ height: "69px" }} >
                  <Nav.Item>Deals</Nav.Item>
                </Nav>
                <h4
                  style={{
                    fontSize: "17px",
                    margin: "23px",
                    marginRight: "5px",
                    marginLeft: "0px"
                  }}
                >
                  Here is the deals list you can move the document
                </h4>
              </div>
              {folder.map((f, i) => {
                // console.log("folderId", f.id, f.sub_project_name)
                // const suggest = suggestedDocs.filter((doc) => doc.id === f.id);
                // // console.log("suggest", suggest);

                // const sfiles = suggest[0] ? suggest[0].suggested_docs : [];
                // console.log("suggest", sfiles);
                return (

                  <Droppable
                    key={i}
                    types={["file"]}
                    onDrop={(file) => onDrop(file, f)}
                    className="col-6 mb-3 col-md-3 m-md-3"
                  >
                    {/* {(doc = suggestedDocs.filter())} */}
                    {/* {suggestedDocs.filter((doc) => {
                            if (doc.id === f.id) {
                              setSuggestedFile(doc.suggested_docs);
                            }
                          })} */}
                    {/* {console.log("suggestedDocs", suggestedDocs)} */}
                    <FilesModal
                      addSuggestedDocs={addSuggestedDocs}
                      revertFile={revertFile}
                      setModal={setModal}
                      suggestedFile={SuggestedDoc(f.id)}
                      folder_id={f.id.toString()}
                      folder_name={f.sub_project_name.toString()}
                      files={
                        f.id.toString() in draggedFiles &&
                          draggedFiles[f.id.toString()].length
                          ? draggedFiles[f.id.toString()]
                          : []
                      }
                      folder_details={f}
                    />
                  </Droppable>

                );
              })}
              <div
                onClick={() => {
                  subProjectToggle();
                }}
                className="col-6 mb-3 col-md-3 m-md-3"
                style={{ textAlign: "center" }}
              >
                <img
                  alt="folder-icon-add"
                  className="c-pointer"
                  src={AddFolder}
                  style={{ marginTop: "-16px", height: "85px", width: "85px", padding: "0px" }}
                />
                <h6 style={{ paddingLeft: "10px", fontWeight: 'inherit' }}>Add Deals</h6>
              </div>

              <SubprojectModal
                toggle={subProjectToggle}
                modal={subProjectModal}
                clients={clients}
                subProjectListApi={subProjectListApi}
                fetchClients={fetchClients}
              />
            </div>
          )}
        </div>
      </div>
      <div className="text-center mb-5 mt-3" style={{ marginBottom: "100px" }}>
        <Button

          disabled={
            !Object.values(draggedFiles).some(
              (v) => Array.isArray(v) && v.length > 0
            ) || is_submitting
          }
          onClick={onSubmit}
          variant="primary"
        >
          {is_submitting ? "Submitting" : "Submit"}
        </Button>
      </div>
      <Modal onSubmit={(e) => check(e)} isOpen={modal} toggle={toggle}>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            onClick={toggle}
            style={{ fontSize: "12px" }}
          >
            Okay
          </Button>
          <Button
            variant="outline-primary"
            onClick={cancel}
            style={{ fontSize: "12px" }}
          >
            Cancel
          </Button>
          {/* {verify && <Button color="primary" onClick={()=>{toggle();verificationEmailApi();}} style={{fontSize:"12px"}}>
                Resend Verification email
              </Button>} */}
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default DisplayDocuments;
