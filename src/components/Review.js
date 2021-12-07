import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../GlobalUrl";
import ScreenTop from "./mobileComp/ScreenTop";
import Loader from "./Loader";
import FilePreview from "./DragAndDrop/FilePreview2";
import Top from "./Top";
import { useHistory } from "react-router";
import logo from "../images/landing/icon.svg";
import { Container, Tooltip, OverlayTrigger, Row, Col } from "react-bootstrap";
import Share from "./Share";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  FaChevronDown,
  AiOutlineFileZip,
  SiMicrosoftexcel,
  BiSort,
  BiMenuAltLeft,
  AiOutlineDatabase,
  BsCalculator,
  BsFilterSquare,
  BsReceiptCutoff,
  BsReceipt,
  IoCalculatorOutline,
  GrHost,
} from "react-icons/all";
import { Link } from "react-router-dom";
// import ReplyIcon from '@material-ui/icons/Reply';
import AddFolder2 from "../images/folder-add2.png";
import sharedFolder from "../images/shared-folder.png";
import ClientModal from "./comps/ClientModal";

const Review = () => {
  const history = useHistory();
  const [clients, setClients] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const handleClose = () => setShowClientModal(false);

  const alldocsId = useState([]);
  const alldocsPath = useState([]);

  const fetchClients = async () => {
    // setLoading(true)
    // const { data } = await axios.get(url + '/api/all-project', {

    const { data } = await axios.get(url + "/api/all-project", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setClients(data);
    // alert(data)
  };

  const [array, setArray] = useState([2, 5, 8, 12, 15, 18]);
  // console.log("ioioioooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",clients)
  const handlepush = (id) => {
    history.push({ pathname: "/productlist" });
  };
  useEffect(() => {
    fetchClients();
    setLoading(false);
    // ('.toast').toast(showData)
    // showData()
  }, []);

  // const showData=()=>{
  //     return(<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  //     <div class="toast-header">
  //       <img src="..." class="rounded mr-2" alt="..."/>
  //       <strong class="mr-auto">Bootstrap</strong>
  //       <small>11 mins ago</small>
  //       <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
  //         <span aria-hidden="true">&times;</span>
  //       </button>
  //     </div>
  //     <div class="toast-body">
  //       Hello, world! This is a toast message.
  //     </div>
  //   </div>)
  // }
  // useEffect(() => {
  //     folders.map(folder => {
  //         folder.docs_set.map(doc => {
  //             alldocsId.push(doc.id)
  //             alldocsPath.push(doc.file)
  //         })
  //     })
  //     documents.map((doc) => {
  //         alldocsId.push(doc.id);
  //         alldocsPath.push(doc.file);
  //     });
  //     localStorage.setItem("alldocs", JSON.stringify(alldocsId.slice(2)));
  //     localStorage.setItem("alldocsPath", JSON.stringify(alldocsPath.slice(2)));
  // }, [documents]);

  console.log("ffffffffffffffffff", clients);
  return (
    <div className="mained">
      {/* <ForwardRefExoticComponent /> */}

      {/* <div > */}
      {/* <div className='menu_bottom'>
   <ul>
      <li class=""><a href="#">home</a></li>
      <li><a href="#">about us</a></li>
      <li><a href="#">our services</a></li>
      <li><a href="#">contact us</a></li>
    </ul>
</div> */}
      <ScreenTop />
      <Top />
      {loading && <Loader />}
      {/* </div> */}
      <Container style={{ maxWidth: "98.4%" }}>
        <Row>
          <Col>
            <div style={{ marginTop: "30px" }}>
              <div
                className=""
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div>
                  <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>Add Client</Tooltip>}
                  >
                    <img
                      alt="folder-icon-add"
                      // className="c-pointer"
                      src={AddFolder2}
                      style={{
                        width: "52px",
                        cursor: "pointer",
                        height: "52px",
                        fontWeight: 800,
                      }}
                      onClick={() => {
                        setShowClientModal((prev) => !prev);
                      }}
                    />
                  </OverlayTrigger>
                  {/* <div>b</div> */}
                  <p className="text-center">
                    <b style={{ fontSize: 11, fontWeight: 700 }}>New Client</b>
                  </p>
                </div>

                <div className="" style={{ marginLeft: "32px" }}>
                  <Link
                    to="/SharedWithMe"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <OverlayTrigger
                      placement={"top"}
                      overlay={<Tooltip>Shared With Me</Tooltip>}
                    >
                      <img
                        alt="shared-folder"
                        // className="c-pointer"
                        src={sharedFolder}
                        style={{
                          width: "52px",
                          cursor: "pointer",
                          height: "52px",
                        }}
                      />
                    </OverlayTrigger>
                    <p className="text-center">
                      <b style={{ fontSize: 11, fontWeight: 700 }}>
                        Shared With Me
                      </b>
                    </p>
                  </Link>
                </div>
              </div>
              <div className="d-flex flex-end" style={{ borderRadius: "5px" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    background: "lightgray",
                    marginLeft: "auto",
                    height: "28px",
                    width: "158px",
                  }}
                >
                  <div style={{ marginTop: "0px" }}>
                    <BiSort />
                    <BiMenuAltLeft className="" />
                    <select
                      style={{
                        marginLeft: "6px",
                        marginRight: "6px",
                        fontSize: "13px",
                        borderRadius: "10px",
                        background: "lightgray",
                        borderColor: "lightgray",
                        fontWeight: 700,
                        WebkitAppearance: "none",
                      }}
                    >
                      <option>Most Recent</option>
                      <option>Date</option>
                      <option>Size</option>
                    </select>
                    {/* Most Recent */}
                    <FaChevronDown className="ml-2" />
                  </div>
                </div>
              </div>
            </div>

            {clients.length === 0 && documents.length === 0 && (
              <h3 className="m-5 text-center">No Documents</h3>
            )}
            {clients.map((client) => (
              <div
                // key={client.id}
                className="bz-card"
                style={{
                  minHeight: "1rem",
                  height: "205px",
                  marginBottom: "38px",
                  marginTop: "23px",
                  width: "100%",
                }}
              >
                {/* <b style={{display:'flex',justifyContent:'flex-end'}}>
                                <FaChevronDown size={23} /> 
                                    </b> */}
                <div className="d-flex flex-row justify-content-between">
                  <h4
                    style={{
                      fontWeight: "bold",
                      marginTop: "6px",
                      fontSize: 23,
                      cursor: "pointer",
                    }}
                    onClick={() => history.push(`/alldeals/${client.id}`)}
                  >
                    {client.project_name}
                  </h4>
                  {/* <div style={{display:'flex',justifyContent:'flex-end'}}>  */}
                  <FaChevronDown
                    style={{ marginTop: "13px", marginRight: "5px" }}
                    size={27}
                  />

                  {/* </div> */}

                  {/* <div className='d-flex flex-row align-items-center'>
                                           <AiOutlineFileZip size={25} onClick={()=>handlepush()} item='folder' id={client.id} />
                                         
                                            <Share item='folder' id={client.id} />
                                            <SiMicrosoftexcel size={25} item='folder' id={client.id} />
                                        </div> */}
                </div>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={11}>
                    <div className="d-flex " style={{ marginLeft: "189px" }}>
                      {client.sub_project.map((deal, index) => (
                        <div>
                          {index <= 2 ? (
                            <div>
                              {/* a === true ? a : b === true ? b : c */}

                              {index == 2 ? (
                                <div
                                  key={deal.id}
                                  className="pr-2 "
                                  style={{
                                    marginLeft: "10px",
                                    borderRight: "blank",
                                    borderLeft: "blank",
                                    width: "318px",
                                  }}
                                >
                                  <div>
                                    {deal.documents.map((doc, index) => (
                                      <div key={doc.id}>
                                        {index < 2 ? (
                                          <div>
                                            {index == 1 ? (
                                              <div style={{ marginTop: "8px" }}>
                                                {" "}
                                                <FilePreview file={doc} />{" "}
                                              </div>
                                            ) : null}
                                            {index == 1 ? (
                                              <div
                                                style={{
                                                  marginTop: "22px",
                                                  marginBottom: "4px",
                                                }}
                                              >
                                                {" "}
                                                <FilePreview file={doc} />{" "}
                                              </div>
                                            ) : null}
                                            {/* <FilePreview file={doc} > */}
                                            {/* {index == 1? <b Style={{}}></b>: null } */}
                                            {/* </FilePreview> */}
                                          </div>
                                        ) : null}
                                      </div>
                                    ))}

                                    <p
                                      className="text-center"
                                      style={{ fontWeight: 649 }}
                                    >
                                      {deal.sub_project_name}
                                      <span
                                        className="text-primary"
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "bold",
                                          marginLeft: "10px",
                                        }}
                                        onClick={() =>
                                          history.push(`/deals/${deal.id}`, {
                                            client: client,
                                          })
                                        }
                                      >
                                        (Show More)
                                      </span>
                                    </p>
                                  </div>{" "}
                                </div>
                              ) : (
                                //         :index==5?<div key={deal.id} className='pr-2 'style={{marginLeft:'10px',marginBottom:'32px',borderRight: 'blank', borderLeft: 'blank' ,width:'360px',height:'200px'  }}>
                                //             {deal.documents.map((doc, index) => (

                                //                 <div key={doc.id}  style={{marginTop: "8px", marginBottom: "24px"}}>
                                //                     {(index < 2) && <FilePreview file={doc} />}
                                //                 </div>
                                //             ))}
                                //             <p className='text-center' style={{ fontWeight: 'bold' }}>{deal.sub_project_name}<span className='text-primary'
                                //                 style={{ cursor: 'pointer' }} onClick={() => history.push(`/deals/${deal.id}`)}>(Show More)</span></p>
                                //         </div>
                                //         :index==8?<div key={deal.id} className='pr-2 'style={{marginLeft:'10px',marginBottom:'32px',borderRight: 'blank', borderLeft: 'blank' ,width:'360px',height:'200px'  }}>
                                //         {deal.documents.map((doc, index) => (

                                //             <div key={doc.id}  style={{marginTop: "8px", marginBottom: "20px"}}>
                                //                 {(index < 2) && <FilePreview file={doc} />}
                                //             </div>
                                //         ))}
                                //         <p className='text-center' style={{ fontWeight: 'bold' }}>{deal.sub_project_name}<span className='text-primary'
                                //             style={{ cursor: 'pointer' }} onClick={() => history.push(`/deals/${deal.id}`)}>(Show More)</span></p>
                                //     </div>
                                //         :index==11?<div key={deal.id} className='pr-2 'style={{marginLeft:'10px',marginBottom:'32px',borderRight: 'blank', borderLeft: 'blank' ,width:'360px',height:'200px'  }}>
                                //         {deal.documents.map((doc, index) => (

                                //             <div key={doc.id}  style={{marginTop: "8px", marginBottom: "20px"}}>
                                //                 {(index < 2) && <FilePreview file={doc} />}
                                //             </div>
                                //         ))}
                                //         <p className='text-center' style={{ fontWeight: 'bold' }}>{deal.sub_project_name}<span className='text-primary'
                                //             style={{ cursor: 'pointer' }} onClick={() => history.push(`/deals/${deal.id}`)}>(Show More)</span></p>
                                //     </div>
                                //     :index==14?<div key={deal.id} className='pr-2 'style={{marginLeft:'10px',marginBottom:'32px',borderRight: 'blank', borderLeft: 'blank' ,width:'360px',height:'200px'  }}>
                                //     {deal.documents.map((doc, index) => (

                                //         <div key={doc.id}  style={{marginTop: "8px", marginBottom: "20px"}}>
                                //             {(index < 2) && <FilePreview file={doc} />}
                                //         </div>
                                //     ))}
                                //     <p className='text-center' style={{ fontWeight: 'bold' }}>{deal.sub_project_name}<span className='text-primary'
                                //         style={{ cursor: 'pointer' }} onClick={() => history.push(`/deals/${deal.id}`)}>(Show More)</span></p>
                                // </div>
                                <div
                                  key={deal.id}
                                  className="pr-2 "
                                  style={{
                                    marginLeft: "10px",
                                    height: "138px",
                                    marginBottom: "0px",
                                    borderRight: "2.9px #b2bec3 solid",
                                    width: "318px",
                                  }}
                                >
                                  <div style={{ paddingTop: "6px" }}>
                                    {deal.documents.map((doc, index) => (
                                      <div key={doc.id}>
                                        {index < 2 ? (
                                          <div>
                                            {index == 1 ? (
                                              <div style={{ marginTop: "0px" }}>
                                                {" "}
                                                <FilePreview file={doc} />{" "}
                                              </div>
                                            ) : null}
                                            {index == 1 ? (
                                              <div
                                                style={{
                                                  marginTop: "22px",
                                                  marginBottom: "5px",
                                                }}
                                              >
                                                {" "}
                                                <FilePreview file={doc} />{" "}
                                              </div>
                                            ) : null}
                                            {/* <FilePreview file={doc} > */}
                                            {/* {index == 1? <b Style={{}}></b>: null } */}
                                            {/* </FilePreview> */}
                                          </div>
                                        ) : null}
                                      </div>
                                    ))}
                                    <p
                                      className="text-center"
                                      style={{ fontWeight: 649 }}
                                    >
                                      {deal.sub_project_name}
                                      <span
                                        className="text-primary"
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "bold",
                                          marginLeft: "10px",
                                        }}
                                        onClick={() =>
                                          history.push(`/deals/${deal.id}`)
                                        }
                                      >
                                        (Show More)
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              )}
                              {/* <div key={deal.id} className='pr-2 'style={{marginLeft:'10px',marginBottom:'32px',borderRight: '2.9px #b2bec3 solid', borderLeft: 'blank' ,width:'360px'  }}>
                                            {deal.documents.map((doc, index) => (
                                                
                                                
                                                <div key={doc.id}  style={{marginTop: "8px", marginBottom: "20px"}}>
                                                    {(index < 2) && <FilePreview file={doc} />}
                                                </div>
                                            ))}
                                            <p className='text-center' style={{ fontWeight: 'bold' }}>{deal.sub_project_name}<span className='text-primary'
                                                style={{ cursor: 'pointer' }} onClick={() => history.push(`/deals/${deal.id}`)}>(Show More)</span></p>
                                        </div> */}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        //   </div>:<div>no</div>}
                      ))}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <div
                      className="align-items-center"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <img
                        src={logo}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push(`/productlist/${client.id}`, { client })
                        }
                        item="folder"
                        id={client.id}
                        width="21px"
                      ></img>
                      {/* <GrHost size={23} onClick={()=>handlepush()} item='folder' id={client.id} /> */}

                      <Share size={23} item="folder" id={client.id} />
                      <SiMicrosoftexcel
                        size={23}
                        item="folder"
                        id={client.id}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <ClientModal
        show={showClientModal}
        handleClose={handleClose}
        fetchClients={fetchClients}
      />
    </div>
  );
};

export default Review;
