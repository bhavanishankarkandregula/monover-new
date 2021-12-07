import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ScreenTop from "../mobileComp/ScreenTop";
import "./DocumentDetails.css";
import "../../App.css";
import { url } from "../../GlobalUrl";
import { Col, Row, Spinner } from "reactstrap";
import { Modal, Button, Image } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import DocumentDetailsModal from "./DocumentDetailsModal";
import DisplayBar from "../Navlinks/DisplayBar";
import Top from "../Top";
import { saveAs } from "file-saver";
import CommonModal from "../CommonModal/CommonModal";
import { Redirect, useParams } from "react-router";
import { useAlert } from "react-alert";
import {
  BsArrowRight,
  BsArrowLeft,
  FcFolder,
  AiFillFolderOpen,
  FaTimes,
  GrZoomIn,
  GrZoomOut,
  TiTickOutline,
} from "react-icons/all";
import preview from "../../images/preview.jpg";
import { ToastContainer, toast } from "react-toastify";
import Boundingbox from "react-bounding-box";

const DocumentDetails = (props) => {
  const sharedDocId = props.match.params.document_id;
  const isShared = props.match.params.shared;
  const [docContents, setDocContents] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [objectData, setObjectData] = useState({});
  const [modal, setModal] = useState(false);
  const [docName, setDocName] = useState("");
  const [projectId, setProjectId] = useState(
    localStorage.getItem("activeProjectId")
  );
  const [docIndex, setDocIndex] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [subProjectData, setSubProjectData] = useState({});
  const [myDoc, setMyDoc] = useState({});
  const [show, setShow] = useState(false);
  const [subprojectId, setSubProjectId] = useState(1);
  const [folderName, setFolderName] = useState();
  const [csvlink, setcsvlink] = useState("");
  const [action, setAction] = useState("");
  const token = localStorage.getItem("token");
  const params = useParams();
  const documentId = localStorage.getItem("documentId") || params.document_id;
  const orgId = localStorage.getItem("orgId");
  const [docCount, setdocCount] = useState();
  const [commonModal, setCommonModal] = useState(false);
  const [msg, setMsg] = useState("");
  const alert = useAlert();
  const commonToggle = () => setCommonModal(!commonModal);
  const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
  const iframeRef = useRef(null);
  const ref = useRef(null);
  let idArray = localStorage.getItem("alldocs")
    ? JSON.parse(localStorage.getItem("alldocs"))
    : [];
  let pathArray = localStorage.getItem("alldocsPath")
    ? JSON.parse(localStorage.getItem("alldocsPath"))
    : [];
  const [currentDoc, setCurrentDoc] = useState(0);
  const [nextDoc, setNextDoc] = useState(0);
  const [showPrevNextButtons, setShowPrevNextButtons] = useState(false);
  const [is_doc_loading, set_doc_loading] = useState(true);
  const [choosedFolderId, setChoosedFolderId] = useState("");
  const [sharedDoc, setSharedDoc] = useState(null);
  const [sharedDocName, setSharedDocName] = useState("");
  const [zoom, setZoom] = useState(false);
  const [docForm, setDocForm] = useState(null);
  const [changeField, setChangeField] = useState(null);
  useEffect(() => {
    if (idArray.includes(Number(params.document_id))) {
      setShowPrevNextButtons(true);
    } else {
      setShowPrevNextButtons(false);
    }
  });

  const [formArray, setFormArray] = useState([]);
  const docArray = [];
  let boxArray = [];
  let map1 = [];
  const koo = [];
  const [finalBoxArray, setFinalBoxArray] = useState([]);
  const Boundingparams = {
    options: {
      colors: {
        normal: "rgba(rgb(255,0,0,1)",
        selected: "rgba(rgb(255,66,0,1)",
        unselected: "rgba(rgb(255,230,0,1)",
      },
      style: {
        maxWidth: "100%",
        maxHeight: "90vh",
      },
      //showLabels: false
    },
  };
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const handleCloseProducts = () => setShowProducts(false);
  const handleShowProducts = (product) => {
    getProducts();
    setShowProducts(true);
    setChangeField(product);
  };

  async function documentDetailsApi() {
    const width = 996;
    const height = 556;
    set_doc_loading(true);
    await axios
      .get(url + `/api/document/${documentId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const myDoc = res.data;
        console.log(
          "docdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
          myDoc
        );
        if (myDoc.document_content?.ExpenseDocuments) {
          for (
            let i = 0;
            i <
            myDoc.document_content?.ExpenseDocuments[0].SummaryFields.length;
            i++
          ) {
            let boundingArray = [];
            let docObject = new Object();
            docObject.left =
              myDoc.document_content?.ExpenseDocuments[0].SummaryFields[i]
                .ValueDetection.Geometry.BoundingBox.Left * width;
            docObject.top =
              myDoc.document_content?.ExpenseDocuments[0].SummaryFields[i]
                .ValueDetection.Geometry.BoundingBox.Top * height;
            docObject.width =
              myDoc.document_content?.ExpenseDocuments[0].SummaryFields[i]
                .ValueDetection.Geometry.BoundingBox.Width * width;
            docObject.height =
              myDoc.document_content?.ExpenseDocuments[0].SummaryFields[i]
                .ValueDetection.Geometry.BoundingBox.Height * height;
            boundingArray.push(docObject);
            boxArray.push(boundingArray);
          }
          map1 = boxArray.map((t) => t[0]);
          for (let i = 0; i < map1.length; i++) {
            let soo = [];
            soo.push(map1[i].left);
            soo.push(map1[i].top);
            soo.push(map1[i].width);
            soo.push(map1[i].height);
            koo.push(soo);
          }
          setFinalBoxArray(koo);
          for (
            let i = 0;
            i <
            myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0]
              .LineItems.length;
            i++
          ) {
            let docObject = new Object();
            for (
              let j = 0;
              j <
              myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0]
                .LineItems[i].LineItemExpenseFields.length -
                1;
              j++
            ) {
              if (
                myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0]
                  .LineItems[i].LineItemExpenseFields[j].Type.Text === "ITEM"
              ) {
                docObject.name =
                  myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0].LineItems[
                    i
                  ].LineItemExpenseFields[j].ValueDetection.Text;
              } else if (
                myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0]
                  .LineItems[i].LineItemExpenseFields[j].Type.Text ===
                "QUANTITY"
              ) {
                docObject.stock =
                  myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0].LineItems[
                    i
                  ].LineItemExpenseFields[j].ValueDetection.Text;
              } else if (
                myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0]
                  .LineItems[i].LineItemExpenseFields[j].Type.Text === "PRICE"
              ) {
                docObject.price =
                  myDoc.document_content?.ExpenseDocuments[0].LineItemGroups[0].LineItems[
                    i
                  ].LineItemExpenseFields[j].ValueDetection.Text;
              }
            }
            docArray.push(docObject);
          }
          setFormArray(docArray);
          setDocForm(Object.entries(myDoc.document_content?.SummaryFields));
        } else if (myDoc.document_content === null || !myDoc.document_content) {
          setDocForm(null);
        } else {
          setDocForm(Object.entries(myDoc.document_content));
        }
        console.log("ccccc", typeof myDoc.document_content);
        setMyDoc(res.data);
        set_doc_loading(false);
        setImagePath(res.data.file);
        setDocName(res.data.document_name);
        setFolderName(res.data.sub_project.map((s) => s.sub_project_name));
        const document_content =
          "document_content" in res.data &&
          typeof res.data.document_content === "string"
            ? JSON.parse(res.data.document_content)
            : [];
        setDocContents(document_content);
        setdocCount(
          document_content.length > 0 ? document_content.length - 1 : 0
        );
      })
      .catch((err) => {
        // console.log("docdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",err)
        console.log(err);
      });
  }

  console.log("summaryfields", docForm);
  const getProducts = () => {
    fetch(`${url}/api/createProducts`).then((res) => {
      return res.json().then((data) => {
        setProducts(data);
      });
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProducts = (p) => {
    var bodyFormData = new FormData();
    const price = Number(p.price.split("$")[1]);
    bodyFormData.append("name", p.name);
    bodyFormData.append("product_number", Math.floor(Math.random() * 15));
    bodyFormData.append("stock", Number(p.stock));
    bodyFormData.append("price", price);
    fetch(`${url}/api/createProducts/`, {
      method: "POST",
      body: bodyFormData,
    })
      .then((res) => {
        return res.json().then((data) => {
          console.log(data);
          toast.success("Product created!");
          console.log(price, p.name, p.stock);
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(price, p.name, p.stock);
      });
  };

  const lastItem = idArray.length - 1;

  useEffect(() => {
    idArray &&
      idArray.map((id, i) => {
        if (id === Number(params.document_id)) {
          setCurrentDoc(i);
        }
      });
  }, [idArray]);

  const moveToLast = () => {
    const lastDocUrl = pathArray.slice(-1)[0];
    if (lastDocUrl.includes(url)) {
      localStorage.setItem("Imagepath", lastDocUrl);
    } else {
      localStorage.setItem("Imagepath", url + lastDocUrl);
    }
    window.location.replace(`/document-details/${idArray[lastItem]}`);
  };

  const moveToFirst = () => {
    const firstDocUrl = pathArray[0];
    if (firstDocUrl.includes(url)) {
      localStorage.setItem("Imagepath", firstDocUrl);
    } else {
      localStorage.setItem("Imagepath", url + firstDocUrl);
    }
    window.location.replace(`/document-details/${idArray[0]}`);
  };

  const Prev = () => {
    const prevDoc = idArray[currentDoc - 1];
    const prevDocUrl = pathArray[currentDoc - 1];
    if (prevDocUrl.includes(url)) {
      localStorage.setItem("Imagepath", prevDocUrl);
    } else {
      localStorage.setItem("Imagepath", url + prevDocUrl);
    }
    if (isShared) {
      window.location.replace(`/document-details/${prevDoc}/shared/${prevDoc}`);
    } else {
      window.location.replace(`/document-details/${prevDoc}`);
    }
  };
  const Next = () => {
    const nextDoc = idArray[currentDoc + 1];
    const nextDocUrl = pathArray[currentDoc + 1];
    if (nextDocUrl.includes(url)) {
      localStorage.setItem("Imagepath", nextDocUrl);
    } else {
      localStorage.setItem("Imagepath", url + nextDocUrl);
    }
    if (isShared) {
      window.location.replace(`/document-details/${nextDoc}/shared/${nextDoc}`);
    } else {
      window.location.replace(`/document-details/${nextDoc}`);
    }
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (isShared) {
      fetchSharedDoc();
    } else {
      documentDetailsApi();
    }
  }, [docName, sharedDocName]);

  useEffect(() => {
    exportDocumentApi();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateIframeSrc, 1000 * 5);
    setIframeTimeoutId(intervalId);
  }, []);

  function iframeLoaded() {
    document.getElementById("IFRAME").style.backgroundImage = "none";
    clearInterval(iframeTimeoutId);
  }
  function getIframeLink() {
    return `https://docs.google.com/gview?url=${localStorage.getItem(
      "Imagepath"
    )}&embedded=true`;
  }
  function updateIframeSrc() {
    if (iframeRef.current) {
      iframeRef.current.src = getIframeLink();
    }
  }

  const zoomDoc = () => {
    setZoom(!zoom);
  };

  const fetchSharedDoc = async () => {
    set_doc_loading(true);
    const { data } = await axios.get(
      `${url}/api/shared-documents/${sharedDocId}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    set_doc_loading(false);
    setSharedDoc(data);
    setSharedDocName(data.document_name);
    setImagePath(data.file);
    const document_content =
      "document_content" in data && typeof data.document_content === "string"
        ? JSON.parse(data.document_content)
        : [];
    setDocContents(document_content);
    setdocCount(document_content.length > 0 ? document_content.length - 1 : 0);
  };

  async function documentDeleteApi() {
    await axios
      .delete(url + `/api/document/${documentId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMsg("Document deleted successfully!");
        setCommonModal(true);
        // alert("Document deleted successfully !");
        // window.location.replace("/document-list");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function editDocNameApi(data) {
    await axios
      .put(
        url + `/api/document/${documentId}/`,
        { document_name: data },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setMsg("Document name updated!");
        setCommonModal(true);
        // alert("Doc name updated ! ");
      })
      .catch((err) => {
        console.log(err);
        setMsg("Document name edit error!");
        setCommonModal(true);
        // alert("Doc name edit Error !");
      });
  }

  async function updateDocumentApi() {
    console.log("Doc", formArray);

    console.log("OBJECTDATA", docForm);
    console.log(
      JSON.stringify({ document_content: formArray, SummaryFields: docForm })
    );
    await axios
      .patch(
        url + `/api/document/${documentId}/`,
        JSON.stringify({ document_content: formArray, SummaryFields: docForm }),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("PATCH RESPONSE", res);
        setMsg("Form updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setMsg("Form Not updated");
      });
  }

  async function exportDocumentApi() {
    // console.log("Doc", docContents);
    // console.log("OBJECTDATA", objectData);
    await axios
      .get(url + `/api/export/${documentId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("PATCH RESPONSE", res);
        // console.log("Export to csv");
        setcsvlink(res.data.CSV_file);
        // setMessage("Form updated successfully");
      })
      .catch((err) => {
        console.log(err);
        // setMessage("Form Not updated");
      });
  }

  const deleteKey = (index, key) => {
    //  console.log("length",Object.keys(docContents).length);

    // if (Object.keys(docContents[index]).length > 1)
    delete docContents[index][key];

    setObjectData({ document_content: JSON.stringify(docContents) });
  };

  const handleDocumntContent = (index, event) => {
    const { name, value } = event.target;

    let newArr = [...docForm];

    newArr[index][1] = value;

    setDocForm(newArr);
    // setDocContents((prevData) => {
    //   return {
    //     ...prevData,
    //     [name]: value,
    //   };
    // });
    // setObjectData({ document_content: JSON.stringify(docContents) });
    // console.log("OBJECTDATA",objectData)
  };

  function handleDelete() {
    documentDeleteApi();
  }

  async function projectListApi(func) {
    if (!orgId) {
      window.alert("Please select organisation");
    } else {
      axios
        .get(url + `/api/projects/${orgId}/list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("ProjectList", res.data);
          setProjectData(res.data);

          // if (projectId === "") {
          //   setProjectId(res.data[0].id);
          //   if (res.data[0].sub_project) {
          //     setSubProjectId(res.data[0].sub_project[0]);
          //   }
          // }
          // setShow(true);
          // setAction(func);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function subProjectListApi(func) {
    console.log("hello");

    // console.log("activeProjectId", localStorage.getItem("activeProjectId"));
    // if (localStorage.getItem("activeProjectId")) {
    if (orgId) {
      await axios
        .get(url + "/api/filter/sub/project/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("subprojectList", res.data);
          setSubProjectData(res.data);
          setSubProjectId(res.data[0].id);

          setShow(true);
          setAction(func);
          // console.log(action);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // }
  }

  // action === "move" ? moveApi : copyApi}

  const selectFolder = (folderId) => {
    console.log(folderId);
    setSubProjectId(folderId);
    if (action === "move") {
      moveApi();
    } else {
      copyApi();
    }
  };
  const cancel = () => {
    setShow(false);
    setAction("");
  };

  const moveApi = async () => {
    console.log("yesssssssss", subprojectId);
    await axios
      .post(
        `${url}/api/move/document/`,
        {
          subproject_id: subprojectId,
          document_id: documentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setShow(false);
        setMsg(res.data.message);
        setCommonModal(true);
        // alert(res.data.message);
        // window.location.replace("/document-list");
      })
      .catch((error) => {
        console.log(error.response);
        // alert.error()
      });
  };

  const copyApi = async () => {
    await axios
      .post(
        `${url}/api/copy/document/`,
        {
          subproject_id: subprojectId,
          document_id: documentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setShow(false);
        setMsg(res.data.message);
        setCommonModal(true);
        // alert(res.data.message);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function starDoc() {
    if (!orgId) return window.alert("Please select organisation");
    orgId &&
      documentId &&
      (await axios
        .post(
          `${url}/api/starred/`,
          {
            organisation_id: `${orgId}`,
            documents: `${documentId}`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setMsg(res.data[0].message);
          setCommonModal(true);
          // alert(res.data[0].message);
        })
        .catch((e) => {
          setMsg(e.message);
          setCommonModal(true);
          // alert(e.message);
        }));
  }
  async function ExportToCSV(index) {
    documentId &&
      (await axios
        .get(`${url}/api/export/${documentId}/${index}/csv/`)
        .then((res) => {
          // console.log(res.data);
          saveAs(
            `${url}/api/export/${documentId}/${index}/csv`,
            `form-${index + 1}.csv`
          );
        })
        .catch((e) => {
          alert(e.message);
        }));
  }
  async function ExportToXLS(index) {
    documentId &&
      (await axios
        .get(`${url}/api/export/${documentId}/${index}/xls/`)
        .then((res) => {
          // console.log(res.data);
          saveAs(
            `${url}/api/export/${documentId}/${index}/xls`,
            `form-${index + 1}.xls`
          );
        })
        .catch((e) => {
          setMsg(e.message);
          setCommonModal(true);
          // alert(e.message);
        }));
  }

  async function removeStarDoc() {
    if (!orgId) return window.alert("Please select organisation");
    documentId &&
      orgId &&
      (await axios
        .post(
          `${url}/api/remove/starred/`,
          {
            organisation_id: `${orgId}`,
            documents: `${documentId}`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setMsg(res.data[0].message);
          setCommonModal(true);
          // alert(res.data[0].message);
        })
        .catch((e) => {
          setMsg(e.message);
          setCommonModal(true);
          // alert(e.message);
        }));
  }
  // console.log("CSVLINK", csvlink);

  return (
    <div className="main" style={{ width: "100%", height: "100%" }}>
      <ScreenTop />
      <Top />
      {sharedDoc ? (
        <DisplayBar
          documentId={sharedDoc.id}
          title={sharedDoc.document_name}
          id={sharedDoc.id}
          shared={true}
          numShared={sharedDoc.no_of_shared}
          numApproved={sharedDoc.no_of_approved}
          sharedDetails={sharedDoc.shared_by_details}
        />
      ) : (
        <DisplayBar
          documentId={documentId}
          title={docName}
          id={documentId}
          subProjectListApi={subProjectListApi}
          handleDelete={handleDelete}
          setDocName={setDocName}
          editDocNameApi={editDocNameApi}
          starDoc={starDoc}
          removeStarDoc={removeStarDoc}
          isStarDoc={localStorage.getItem("docStarred")}
          shared={false}
          numShared={myDoc.no_of_shared}
          numApproved={myDoc.no_of_approved}
          sharedTo={myDoc.shared_to_user}
          approvedBy={myDoc.approved_by_list}
          folderName={folderName}
          unregistredUsers={myDoc.shared_to_unregister_user}
          imagePath={imagePath}
        />
      )}
      <div>
        <Row>
          <Col sm={12} md={6}>
            <ToastContainer />
            {is_doc_loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15vw",
                  marginBottom: "15vw",
                }}
              >
                <Spinner
                  animation="border"
                  style={{ fontSize: "20px" }}
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
                <h3 style={{ marginLeft: "20px" }}>Loading...</h3>
              </div>
            ) : (
              <div className="DocumentTypeBox">
                <div className="zoom">
                  <button
                    className="zoomButton"
                    onClick={() => {
                      zoomDoc();
                    }}
                  >
                    {zoom ? <GrZoomOut /> : <GrZoomIn />}
                  </button>
                </div>

                <div className="DocumentType">
                  {docName.split(".")[docName.split(".").length - 1] ===
                    "pdf" ||
                  sharedDocName.split(".")[
                    sharedDocName.split(".").length - 1
                  ] === "pdf" ? (
                    <div
                      className="iframe-loading"
                      style={{
                        width:
                          window.innerWidth <= 800
                            ? zoom
                              ? "100%"
                              : "70%"
                            : "100%",
                      }}
                    >
                      <iframe
                        id="IFRAME"
                        className="PDFIMG"
                        onLoad={iframeLoaded}
                        onError={updateIframeSrc}
                        ref={iframeRef}
                        src={getIframeLink()}
                        style={{ position: "relative" }}
                        // src={`https://docs.google.com/gview?url=${imagePath}&embedded=true`}
                      />
                    </div>
                  ) : // <iframe
                  //   src={`https://docs.google.com/gview?url=${imagePath}&embedded=true`}
                  //   id="iframeID"
                  //   name="iframeID"
                  //   className="PDFIMG"
                  // ></iframe>
                  // <embed
                  //   src={imagePath}
                  //   style={{ borderColor: "white", borderRadius: "15px" }}
                  //   className="PDFIMG"
                  // />
                  //

                  docName.split(".")[docName.split(".").length - 1] === "png" ||
                    docName.split(".")[docName.split(".").length - 1] ===
                      "jpg" ||
                    docName.split(".")[docName.split(".").length - 1] ===
                      "jpeg" ||
                    sharedDocName.split(".")[
                      sharedDocName.split(".").length - 1
                    ] === "png" ||
                    sharedDocName.split(".")[
                      sharedDocName.split(".").length - 1
                    ] === "jpg" ? (
                    <>
                      <Boundingbox
                        image={imagePath}
                        boxes={finalBoxArray}
                        options={Boundingparams.options}
                      />
                    </>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={preview}
                        className="IMG"
                        style={{
                          borderColor: "white",
                          borderRadius: "15px",
                          height: "500px",
                        }}
                      />
                      <h1>No Preview Available</h1>
                    </div>
                  )}
                  <div>
                    {idArray && currentDoc !== 0 && (
                      <BsArrowLeft
                        style={{
                          left:
                            window.innerWidth <= 800
                              ? zoom
                                ? "40px"
                                : "70px"
                              : "40px",
                        }}
                        className="prevButton"
                        onClick={Prev}
                      />
                    )}
                    {params.document_id == idArray[0] && (
                      <BsArrowLeft
                        style={{
                          left:
                            window.innerWidth <= 800
                              ? zoom
                                ? "40px"
                                : "70px"
                              : "40px",
                        }}
                        className="prevButton"
                        onClick={moveToLast}
                      />
                    )}
                  </div>

                  <div>
                    {idArray && currentDoc + 1 !== idArray.length && (
                      <BsArrowRight
                        style={{
                          right:
                            window.innerWidth <= 800
                              ? zoom
                                ? "40px"
                                : "70px"
                              : "40px",
                        }}
                        className="nextButton"
                        onClick={Next}
                      />
                    )}
                    {params.document_id == idArray[lastItem] && (
                      <BsArrowRight
                        style={{
                          right:
                            window.innerWidth <= 800
                              ? zoom
                                ? "40px"
                                : "70px"
                              : "40px",
                        }}
                        className="nextButton"
                        onClick={moveToFirst}
                      />
                    )}
                  </div>
                </div>
                {/* <div>
              {currentDoc + 1 !== idArray.length && (
                <button onClick={Next}>Next</button>
              )}
            </div> */}

                {/* </div> */}

                {/* <div className="Details_Last_row">
                <label>
                  <span>01</span> / 05
                </label>
                <div className="Details_group_button">
                  <button className="prev">
                  <strong style={{fontSize:"1.2rem"}}>&#60;</strong>
                  </button>
                  &emsp;
                  <button className="forward">
                  <strong style={{fontSize:"1.2rem"}}>&#62;</strong>  
                  </button>
                </div>
              </div> */}
                <Row>
                  {console.log("show", show)}
                  {/* {
              projectData && projectData.length > 0 && show && (
                <div style={{ marginTop: "2rem", display: "inline-block" }}>
                  <h6>Select Project</h6>
                  <select
                    className="select"
                    style={{ maxWidth: "200px" }}
                    type="select"
                    value={projectId}
                    name="projects"
                    onChange={(e) => {
                      setProjectId(e.target.value);
                    }}
                  >
                    {projectData.map(
                      (project) =>
                        project.sub_project.length > 0 && (
                          <option value={project.id}>
                            {project.project_name}
                          </option>
                        )
                    )}
                  </select>
                </div>
              )}
              &emsp; */}
                  {subProjectData && subProjectData.length > 0 && show && (
                    <Modal size="lg" show={show} onHide={() => setShow(false)}>
                      <Modal.Header closeButton>Select Folder</Modal.Header>
                      <Modal.Body>
                        <div className="d-flex flex-wrap">
                          {subProjectData.map((f, i) => (
                            <div
                              onClick={() => {
                                setSubProjectId(f.id);
                                setChoosedFolderId(f.id);
                              }}
                              style={{
                                textAlign: "center",
                                cursor: "pointer",
                                padding: "10px",
                                paddingBottom: "2px",
                              }}
                              key={i}
                              className="m-3 folderMoveCopy"
                            >
                              {!choosedFolderId ? (
                                <FcFolder size={28} />
                              ) : choosedFolderId === f.id ? (
                                <AiFillFolderOpen size={28} color="skyblue" />
                              ) : (
                                <FcFolder size={28} />
                              )}
                              <p className="text-muted text-center">
                                {f.sub_project_name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          variant="primary"
                          className="ok"
                          onClick={action === "move" ? moveApi : copyApi}
                        >
                          Ok
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                </Row>
              </div>
            )}
          </Col>
          <Col
            md={6}
            style={{
              maxHeight: "70vh",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <div className="Details_Form">
              <div>
                {formArray &&
                  formArray.map((p) => (
                    <div className="Det_inputField">
                      <div className="d-flex justify-content-between">
                        <label
                          style={{ fontWeight: "bold" }}
                          className="Det_inputLabel d-flex flex-row"
                        >
                          <div className="mr-3">{p.name}</div>
                          <div>({p.price})</div>
                        </label>
                        <div
                          onClick={() => createProducts(p)}
                          className="text-primary"
                          style={{ marginLeft: "auto", cursor: "pointer" }}
                        >
                          <TiTickOutline size={25} color="black" />
                        </div>
                        <p
                          onClick={() =>
                            handleShowProducts(
                              formArray.findIndex((e) => e.name == p.name)
                            )
                          }
                          className="text-primary"
                          style={{
                            marginLeft: "10px",
                            marginRight: "20px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </p>
                      </div>
                      <Row>
                        <Col>
                          <input
                            style={{
                              border: "1px solid #e8e8e8",
                              backgroundColor: "#e8e8e8",
                              borderRadius: "12px",
                              fontSize: " 16px",
                              padding: "10px 14px",
                              width: "85%",
                            }}
                            type="text"
                            name={p.stock}
                            value={p.stock}
                            key={p.stock}
                          ></input>
                          <IconButton
                            style={{ marginLeft: "25px" }}
                            onClick={() =>
                              setFormArray(
                                formArray.filter((f) => f.name !== p.name)
                              )
                            }
                          >
                            <FaTimes color="red" />
                          </IconButton>
                        </Col>
                      </Row>
                    </div>
                  ))}
                {docForm &&
                  docForm.map(([key, value], index) => (
                    <div className="Det_inputField">
                      <label
                        style={{ fontWeight: "bold" }}
                        className="Det_inputLabel d-flex flex-row"
                      >
                        <div className="mr-3">{key}</div>
                      </label>
                      <Row>
                        <Col>
                          <input
                            style={{
                              border: "1px solid #e8e8e8",
                              backgroundColor: "#e8e8e8",
                              borderRadius: "12px",
                              fontSize: " 16px",
                              padding: "10px 14px",
                              width: "85%",
                            }}
                            type="text"
                            name={value}
                            value={value}
                            key={value}
                            onChange={(e) => handleDocumntContent(index, e)}
                          ></input>
                          <IconButton
                            style={{ marginLeft: "25px" }}
                            onClick={() =>
                              setDocForm(
                                docForm.filter((t) => t[index] !== value)
                              )
                            }
                          >
                            <FaTimes color="red" />
                          </IconButton>
                        </Col>
                      </Row>
                    </div>
                  ))}
              </div>
              {/* {docContents &&
                docContents.length > 0 &&
                docContents.map((document, index) => (
                  <>
                    <h5 style={{ color: "#777fff", marginTop: "1%", marginLeft: '150px' }}>
                      Document : {index + 1}
                    </h5>
                    {Object.keys(document).length > 0 &&
                      Object.entries(document).map(([key, value]) => (
                        <div className="Det_inputField">
                          <div className='d-flex justify-content-between'>
                            <label style={{ fontWeight: 'bold' }} className="Det_inputLabel">{key} (1000 INR)</label>
                            <p onClick={handleShowProducts} className='text-primary'
                              style={{ marginRight: '20px', cursor: "pointer" }}>Edit</p>
                          </div>
                          <Row>
                            <Col>
                              <input
                                style={{
                                  border: "1px solid #e8e8e8",
                                  backgroundColor: "#e8e8e8",
                                  borderRadius: "12px",
                                  fontSize: " 16px",
                                  padding: "10px 14px",
                                  width: "85%"
                                }}

                                type="text"
                                name={key}
                                value={value}
                                key={key}
                                onChange={(e) => handleDocumntContent(index, e)}
                              ></input>
                              <IconButton style={{ marginLeft: '25px' }}
                                onClick={() => deleteKey(index, key)}
                              >
                                <FaTimes color='red' />
                              </IconButton>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    <Button
                      className='w-100 mb-2'
                      onClick={() => {
                        toggle();
                        setDocIndex(index);
                      }}>
                      Add Field
                    </Button>
                  </>
                ))} */}
              {/* <br />
              <Row>
                <Col sm={2}>
                  <Button outline color="link" onClick={toggle}>
                    <span style={{ fontWeight: "bolder" }}>
                      <GrAdd />
                    </span>
                  </Button>
                </Col>
              </Row> */}
              <div className="flex-column">
                <Button
                  className="w-100 mb-2"
                  onClick={() => {
                    toggle();
                    // setDocIndex(index);
                  }}
                >
                  Add Field
                </Button>
                <Button
                  className="w-100 mb-2"
                  onClick={() => {
                    updateDocumentApi();
                    commonToggle();
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  className="w-100 mb-2"
                  // href={csvlink}
                  onClick={() => {
                    ExportToXLS(docCount);
                  }}
                >
                  Export To XLS
                </Button>
                <Button
                  className="w-100"
                  // href={csvlink}
                  onClick={() => {
                    ExportToCSV(docCount);
                  }}
                >
                  Export To CSV
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <DocumentDetailsModal
        toggle={toggle}
        modal={modal}
        documentId={documentId}
        docContents={docForm}
        index={docIndex}
        setDocContents={setDocForm}
      />
      <CommonModal modal={commonModal} toggle={commonToggle} msg={msg} />
      <Modal size="lg" show={showProducts} onHide={handleCloseProducts}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div
                key={p.id}
                className="bw-card my-3 mx-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  formArray[changeField].name = p.name;
                  formArray[changeField].stock = p.stock;
                  formArray[changeField].price = p.price;
                  handleCloseProducts();
                }}
              >
                {p.files.length > 0 ? (
                  <Image
                    src={url + p.files[0]?.image}
                    height={50}
                    width={100}
                  />
                ) : (
                  <Image
                    src="https://cdn5.vectorstock.com/i/1000x1000/57/69/product-promotion-line-icon-concept-sign-outline-vector-29875769.jpg"
                    height={50}
                    width={100}
                  />
                )}
                <p className="mt-3" style={{ fontWeight: "bold" }}>
                  {p.name}
                </p>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DocumentDetails;
