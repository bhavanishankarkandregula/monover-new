import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { url } from '../../GlobalUrl'
import { ToastContainer, toast } from 'react-toastify';
import CommonModal from "../CommonModal/CommonModal";
import { Nav, OverlayTrigger, Tooltip, Modal, ListGroup, Button } from 'react-bootstrap'
import {
  FaFolderOpen, RiUserShared2Line, FaUserCircle,
  AiOutlineCopy, IoTrashOutline,
  CgFileRemove, TiTickOutline, FaUserAltSlash, CgAddR, GrTemplate
} from 'react-icons/all'
import { IconButton } from "@material-ui/core";
import Share from '../Share'
import { Link } from 'react-router-dom'


const DisplayBar = (props) => {
  console.log("props.title", props.title)
  var TitleText = props.title;
  var changeText = props.text;
  const textInput = useRef("");
  const titleInput = useRef("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const [editText, seteditText] = useState(changeText);
  const [projectTitle, setProjectTitle] = useState(TitleText);
  const [starStyle, setStarStyle] = useState("fa fa-star-o fa-lg");
  const [smShow, setSmShow] = useState(false);
  const [starOfProject, setStarOfProject] = useState("fa fa-star-o fa-lg")
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState('')
  const commonToggle = () => setCommonModal(!commonModal)
  const [additional, setAdditional] = useState('');
  const [sharedDocTitle, setSharedDocTitle] = useState('')
  const [sharedDocFolder, setSharedDocFolder] = useState(null)

  //  console.log("Hello", props);


  const displaytoggle = () => {
    setIsOpen(!isOpen);
  };
  const displayTitletoggle = () => {
    setIsTitleOpen(!isTitleOpen);
  };

  // console.log("editText", editText);

  const delData = () => {
    setAdditional('Cancel')
    setMsg("Are you sure you want to delete this data!");
    setCommonModal(true);
    // let con = window.confirm("You Want to Delete Data");

    // if (con === true) {
    //   props.handleDelete();
    // }
  };

  const cancel = () => {
    setCommonModal(false)
  }

  const del = () => {
    setCommonModal(false)
    props.handleDelete()

  }

  useEffect(() => {
    if (props.setProjectName) {
      // console.log(props.isStarSubProject);
      props.isStarSubProject && setStarStyle("fa fa-star fa-lg");
      !props.isStarSubProject && setStarStyle("fa fa-star-o fa-lg");
    }
    if (props.setDocName) {
      // console.log(localStorage.getItem("docStarred"));
      localStorage.getItem("docStarred") == "true" &&
        setStarStyle("fa fa-star fa-lg");
      !localStorage.getItem("docStarred") == "true" &&
        setStarStyle("fa fa-star fa-lg");
    }
  }, [props.isStarSubProject]);

  function handleStarred() {
    if (starStyle === "fa fa-star-o fa-lg") {
      if (props.setProjectName) {
        props.starSubProject();
      }
      if (props.setDocName) {
        props.starDoc();
      }

      setStarStyle("fa fa-star fa-lg");
    } else if ("fa fa-star fa-lg") {
      if (props.setProjectName) {
        props.removeStarSubProject();
      }
      if (props.setDocName) {
        props.removeStarDoc();
      }

      setStarStyle("fa fa-star-o fa-lg");
    }
  }

  // function handleStarredProject(){
  //   if (starStyle === "fa fa-star-o fa-lg") {
  //     setStarStyle("fa fa-star fa-lg");
  //   } else if ("fa fa-star fa-lg") {
  //     setStarStyle("fa fa-star-o fa-lg");
  //   }
  // }

  const updateComponentValue = () => {
    setIsOpen(false);
    // console.log(textInput.current.value);
    seteditText(textInput.current.value);

    if (textInput.current.value === "") {
      // alert("This Field is Empty !");
      setMsg("This field is empty!");
      setCommonModal(true);
    }
    else if (props.setSubProjectName) {
      props.setSubProjectName(textInput.current.value);
      props.editSubProjectNameApi(textInput.current.value);
    }
  };
  const updateTitleComponentValue = () => {
    setIsTitleOpen(false);
    // console.log(textInput.current.value);
    setProjectTitle(titleInput.current.value);

    if (titleInput.current.value === "") {
      setMsg("This field is empty!");
      setCommonModal(true);
    }
    else {

      if (props.setDocName) {
        props.setDocName(titleInput.current.value);
        props.editDocNameApi(titleInput.current.value);
      }
      if (props.setProjectName) {
        props.setProjectName(titleInput.current.value);
        props.editProjectNameApi(titleInput.current.value);
      }
    }
  };

  const moveApi = () => {
    props.subProjectListApi("move");
  }

  const copyApi = () => {
    props.subProjectListApi("copy");
  }

  const returnProject = () => {
    return (
      <>
        <input
          type="text"
          defaultValue={TitleText}
          ref={titleInput}
          style={{ padding: "5px", paddingLeft: "15px", borderRadius: "10px" }}
        />
        <Button
          outline
          color="primary"
          style={{
            padding: "0.3rem 0.5rem",
            marginLeft: "1rem",
          }}
          onClick={displayTitletoggle}
        >
          {/* <FiX/> */}
          Cancel
        </Button>
        <Button
          outline
          color="primary"
          style={{
            padding: "0.3rem 0.5rem",
            // border:"1px solid black",
            // borderRadius: "0.6rem",
            marginLeft: "1rem",
          }}
          onClick={updateTitleComponentValue}
        >
          {/* <TiTick/> */}
          Change
        </Button>
      </>
    );
  };

  const returnDefaultProjectView = () => {
    return (
      <div
        style={{
          display: "inline-block",
          cursor: "pointer",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          maxWidth: "15rem",
          overflow: "hidden",
        }}
      >
        <FaFolderOpen /><strong> {props.folderName}</strong><span style={{ color: '#1F75FE' }}> / </span>
        <strong onClick={displayTitletoggle}>
          {projectTitle === "" ? TitleText : projectTitle}
        </strong>
      </div>
    );
  };

  const returnEditView = () => {
    return (
      <>
        <input
          type="text"
          defaultValue={editText}
          ref={textInput}
          style={{ padding: "5px", paddingLeft: "15px", borderRadius: "10px" }}
        />
        <Button
          outline
          color="primary"
          style={{
            padding: "0.3rem 0.5rem",
            marginLeft: "1rem",
          }}
          onClick={displaytoggle}
        >
          {/* <FiX/> */}
          Cancel
        </Button>
        <Button
          outline
          color="primary"
          style={{
            padding: "0.3rem 0.5rem",
            // border:"1px solid black",
            // borderRadius: "0.6rem",
            marginLeft: "1rem",
          }}
          onClick={() => {
            updateComponentValue();
          }}
        >
          {/* <TiTick/> */}
          Change
        </Button>
      </>
    );
  };

  const returnDefaultView = () => {
    return (
      <div
        style={{
          display: "inline-block",
          cursor: "pointer",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          maxWidth: "8rem",
          overflow: "hidden",
        }}
      >
        <strong onClick={displaytoggle}>
          {editText === "" ? changeText : editText}
        </strong>
      </div>
    );
  };

  const [isDocApproved, setIsDocApproved] = useState()

  const fetchSharedDoc = async () => {
    const { data } = await axios.get(`${url}/api/shared-documents/${props.documentId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    setSharedDocFolder(data.sub_project.map(f => f.sub_project_name))
    setSharedDocTitle(data.document_name)
    setIsDocApproved(data.is_approved)
  }


  useEffect(() => {
    fetchSharedDoc()
  }, [])


  const makeApprove = async (id) => {
    let bodyFormData = new FormData();
    bodyFormData.append('document_id', id)
    await axios.post(`${url}/api/approve/document/`, bodyFormData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    )
      .then(function (response) {
        setIsDocApproved(curr => !curr)
        if (response.data.message === 'Approved') {
          toast.success('Document approved!')
          fetchSharedDoc()
        } else {
          toast("Document unapproved")
          fetchSharedDoc()
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }


  const approveUI = () => {
    if (isDocApproved) {
      return (
        <div className='mr-3 mt-1 d-flex flex-row'>
          {props.sharedDetails.map(user => (
            <OverlayTrigger
              placement={"top"}
              overlay={<Tooltip>Shared by</Tooltip>}
            >
              <div className='ml-3 mr-2'>
                <div className='d-flex justify-content-around'>
                  {user.shared_by.profile_picture ?
                    <img src={user.shared_by.profile_picture}
                      style={{ height: '30px', width: '30px', borderRadius: '50%' }} /> : <FaUserCircle size={30} />}
                  <div className='mt-2' style={{ fontSize: '13px', fontWeight: '700' }}>{user.shared_by.first_name} {user.shared_by.last_name}</div>
                </div>
                <div style={{ fontSize: '9px' }}>{user.shared_by.email}</div>
              </div>
            </OverlayTrigger>
          ))}
          <OverlayTrigger
            placement={"top"}
            overlay={<Tooltip>Doc is Aproved</Tooltip>}
          >
            <Button className='ml-3' variant='outline-success' size='sm' onClick={() => makeApprove(props.documentId)}><TiTickOutline /> Approved</Button>
          </OverlayTrigger>
        </div>
      )
    } else {
      return (
        <div className='ml-3 mr-3 mt-1 d-flex flex-row'>
          {props.sharedDetails.map(user => (
            <OverlayTrigger
              placement={"top"}
              overlay={<Tooltip>Shared by</Tooltip>}
            >
              <div className='ml-3 mr-2'>
                <div className='d-flex justify-content-around'>
                  {user.shared_by.profile_picture ?
                    <img src={user.shared_by.profile_picture}
                      style={{ height: '30px', width: '30px', borderRadius: '50%' }} /> : <FaUserCircle size={30} />}
                  <div className='mt-2' style={{ fontSize: '13px', fontWeight: '700' }}>{user.shared_by.first_name} {user.shared_by.last_name}</div>
                </div>
                <div style={{ fontSize: '9px' }}>{user.shared_by.email}</div>
              </div>
            </OverlayTrigger>
          ))
          }
          <Button variant='outline-primary' size='sm'
            onClick={() => makeApprove(props.documentId)}> Approve</Button>
        </div >
      )
    }
  }

  return (
    <>
      <ToastContainer />
      {(props.title || props.text) && (
        <div
          // className='shadow p-2 pl-3 mb-5 bg-white rounded border'
          style={{ marginBottom: "50px", marginTop: "10px", }}
        >

          {/* <span style={{ display: "flex", alignItems: "center" }}> */}

          <Nav className='d-flex justify-content-between shadow bg-white rounded border pt-3 pb-3'>
            <Nav.Item>
              {props.shared ? (
                <h3
                  className='m-3'
                  style={{ display: 'inline' }}
                >
                  <span style={{ marginRight: '0.8rem' }}><FaFolderOpen /> {sharedDocFolder}<span style={{ color: '#1F75FE' }}> / </span> {sharedDocTitle}</span>
                </h3>
              ) : (
                <h3
                  // onClick={() => {
                  //   window.history.back();
                  // }}
                  className="m-3"
                  style={{ cursor: "pointer", display: "inline" }}
                >
                  <span style={{ marginRight: "0.8rem" }}>
                    {isTitleOpen ? returnProject() : returnDefaultProjectView()}
                  </span>
                </h3>
              )}
              {/* <i
                class={starStyle}
                style={{
                  cursor: "pointer",
                  color: "gold",
                  fontSize: "1.6em",
                  marginRight: "0.8em",
                }}
                onClick={() => {
                  handleStarredProject();
                }}
              /> */}
              {/* <span style={{ display: "flex", alignItems: "center" }}> */}
              {/* <strong style={{ marginTop: "-0.5rem" }}>&nbsp;/&nbsp;</strong> */}
              {/* <span style={{ marginRight: "0.8rem" }}>
                {isOpen ? returnEditView() : returnDefaultView()}
              </span>
            </span> */}
              <span
                style={{ float: "right", display: "inline", marginTop: "-5px" }}
              >
                {props.text !== "" && (
                  <i
                    class={starStyle}
                    style={{
                      cursor: "pointer",
                      color: "gold",
                      fontSize: "1.6em",
                      marginRight: "0.8em",
                    }}
                    onClick={() => {
                      handleStarred();
                    }}
                  />
                )}
              </span>
            </Nav.Item>
            {props.shared ? approveUI() : (
              <Nav.Item>
                <div className='d-flex flex-row'>
                <Link
                    to={`/useastemplateimage2/${props.documentId}`}
                  >
                    <OverlayTrigger
                      placement={"top"}
                      overlay={<Tooltip>Use as Template</Tooltip>}
                    >
                      <IconButton className="pl-3 pr-2" onClick={delData}>
                        <GrTemplate color='black' />
                      </IconButton>
                    </OverlayTrigger>
                  </Link>
                  
                  <Link
                    to={`/annotate-doc/${props.documentId}`}
                  >
                    <OverlayTrigger
                      placement={"top"}
                      overlay={<Tooltip>Add Field</Tooltip>}
                    >
                      <IconButton className="pl-3 pr-2" onClick={delData}>
                        <CgAddR color='black' />
                      </IconButton>
                    </OverlayTrigger>
                  </Link>

                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>({props.numApproved}/{props.numShared})</Tooltip>}
                  >
                    <IconButton className="pl-3" onClick={() => setSmShow(true)}>
                      <RiUserShared2Line color='black' />
                    </IconButton>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>Delete</Tooltip>}
                  >
                    <IconButton className="pl-3 pr-2" onClick={delData}>
                      <IoTrashOutline color='black' />
                    </IconButton>
                  </OverlayTrigger>

                  <Share className="px-4" id={props.documentId} item='document' />

                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>Move</Tooltip>}
                  >
                    <IconButton className="pl-2 pr-2" onClick={() => moveApi()}>
                      <CgFileRemove color='black' />
                    </IconButton>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>Copy</Tooltip>}
                  >

                    <IconButton className="pr-2" onClick={() => copyApi()}>
                      <AiOutlineCopy color='black' />
                    </IconButton>
                  </OverlayTrigger>
                </div>

              </Nav.Item>
            )}
          </Nav>
          {/* </span> */}
          <CommonModal modal={commonModal} toggle={del} additional={cancel} msg={msg} />
          {!props.shared ? (
            <div style={{ maxHeight: '30vh', overflowY: 'scroll' }}>
              <Modal
                size='sm'
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <h6>
                    Approved by {props.numApproved} {(props.numApproved === 0 || props.numApproved === 1) ? 'user' : 'users'} out of {props.numShared}
                  </h6>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup>
                    {!props.numShared && <p className='text-center'>Not yet shared</p>}
                    {props.sharedTo.map(p => (
                      <ListGroup.Item key={p.id} style={{ background: props.approvedBy.find(a => a.first_name === p.user.first_name) ? '#addfad' : null }}><div className='d-flex justify-content-start'>{p.user.profile_picture ? <img src={p.user.profile_picture}
                        style={{ height: '40px', width: '40px', borderRadius: '50%' }} /> : <FaUserCircle size={35} />}
                        <div className='flex-column ml-3'>
                          <div>{p.user.first_name} {p.user.last_name}</div>
                          <div style={{ fontSize: '10px' }}>{p.user.email}</div>
                        </div>
                      </div></ListGroup.Item>
                    ))}
                    <p style={{ color: 'crimson' }} className='text-center m-2'><FaUserAltSlash /> Unregistered users</p>
                  </ListGroup>
                  {props.unregistredUsers.map(u => (
                    <div key={u.id} className='text-center border mb-1' style={{ fontSize: '12px' }}>{u.user}</div>
                  ))}
                </Modal.Body>
              </Modal>
            </div>
          ) : null}


        </div>
      )}
    </>
  );
};

export default DisplayBar;
