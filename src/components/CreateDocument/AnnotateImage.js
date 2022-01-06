import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../GlobalUrl";
import Top from "../Top";
import ScreenTop from "../mobileComp/ScreenTop";
import BBoxAnnotator from "react-bbox-annotator";
import { useHistory } from "react-router";
import { IoMdArrowRoundBack, FaTimes } from "react-icons/all";
import { IconButton } from "@material-ui/core";
import { CgAddR, AiOutlineArrowRight } from "react-icons/all";
import DocumentDetailsModal from "./DocumentDetailsModal";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Row } from "react-bootstrap";
import { useRef } from "react";
import ClientModal from "./ClientModel5";

// import preprocessImage from './Preprocess';
import Tesseract from "tesseract.js";
import { data } from "jquery";

// import axios from "axios"
// import './App.css';
const AnnotateImage = ({ match }) => {
  // ---------------split array in two-two parts-------------------------
  function chunkArrayInGroups(arr, size) {
    var result = [];
    for (var i = 0; i < arr.length; i += size)
      result.push(arr.slice(i, i + size));
    return result;
  }
  // ----------------------------------------
  const [apiGod, setapiGod] = useState(null);
  const docId = match.params.id;
  const history = useHistory();
  const [combineArray, setcombineArray] = useState([]);
  const [fields, setFields] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [docName, setDocName] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalEntryValue, setModalEntryValue] = useState("")
  const [modaled, setModaled] = useState(false);
  const [entry, setEntry] = useState();
  //   changes---
  //   const labels = modaled ? ["V"] : ["L"];
  const [toggleAdvance, settoggleAdvance] = useState(false);

  //   --------
  const [field, setField] = useState([]);
  // console.log("doctryconclusion", fields);
  // console.log("doctryconclusion", myDoc);
  // console.log("doctryconclusion", docName);
  // console.log("doctryconclusion", imagePath);
  // console.log("doctryconclusion", entries);

  const token = localStorage.getItem("token");
  // console.log(token);
  // alert(JSON.stringify(token))

  // console.log(JSON.stringify(token));
  // console.log(token);
  const [image, setImage] = useState({ bytes: "" });
  const [text, setText] = useState("");
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [docForm, setDocForm] = useState([]);
  const [summaryField, setSummaryField] = useState([])
  const [fieldCounter, setFieldCounter] = useState(0)
  const [annatorLength, setAnnatorLength] = useState(0)

  const [showClientModal, setShowClientModal] = useState(false);
  const handleClose = () => setShowClientModal(false);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  // console.log(
  //   "dsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
  //   imagePath
  // );

  const handleClick = async () => {
    var formData = new FormData();
    formData.append("image", imagePath);
    //   formData.append("l",entries)

    await axios
      .post("http://34.93.209.224:8000/api/image-ocr/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("ttttttttttttttttttttttttttttttttttttttt", res);
        let text = res.data.text.alert(JSON.stringify(text));
        setText(text);

        if (res.status === 200) {
          // alert("Document added successfully!");
          // toast.success("Document added successfull", {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
        }
      })
      .catch((err) => {
        // setLoading(false);
        // console.log(err);
        alert("Error !");
        //     //handleClear();
      });
  };

  const handledata = () => {
    return text.map((item, index) => {
      return (
        <div
          style={{
            border: "0.5px solid #dfe6e9",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            margin: 10,
          }}
        >
          {item}
        </div>
      );
    });
  };

  const toggle = () => setModal(!modal);
  const toggl =  () => setModaled(!modaled);

  // const changeEntryValue  = (value) => {
  //   setModalEntryValue(value)
  // }
  async function documentDetailsApi() {
    await axios
      .get(url + `/api/document/${docId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setapiGod(res);
        setImagePath(res.data.file);
        
        setSummaryField(res.data.document_content.SummaryFields)
        console.log("res", res);
        setDocForm(Object.entries(res.data.document_content.SummaryFields));
        setDocName(res.data.document_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    documentDetailsApi();
  }, []);

  // console.log("summaryfields", docForm);
  const handleDocumentContent = (index, event) => {
    let newArr = [...fields];
    newArr[index][1] = event.target.value;
    setFields(newArr);
    // console.log("MyyyyyyyyyyyyyyFFFFFields",fields[0])
    // alert("Saved")

    // docForm.push(fields)
  };

  // const [field,setField]=useState([])
  const handleDocument = (index, event) => {
    let newArr = [...field];
    newArr[index] = event.target.value;
    setField(newArr);
    // console.log("fields",field)
  };
  async function documentUpdate2Api() {
    // console.log(combineArray);
    // console.log(apiGod.data.document_content.SummaryFields);
    let arrPush = {};
    combineArray.map((elem) => {
      let keysArr = [elem[0]];
      let valuesArr = [elem[1]];
      let result = Object.assign.apply(
        {},
        keysArr.map((v, i) => ({ [v]: valuesArr[i] }))
      );
      arrPush = { ...arrPush, ...result };
    });
    // console.log(arrPush);
    apiGod.data.document_content.SummaryFields = arrPush;
    console.log(apiGod.data.document_content);
    await axios
      .patch(
        url + `/api/document/${docId}/`,
        { document_content: apiGod.data.document_content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("PATCH RESPONSE", res);
        // alert("Form updated successfully");
        // setMsg("Form updated successfully");
        toast.success("fields are added Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log("patch req err", err);
        setMsg("Form Not updated");
      });
  }
  const [formArray, setFormArray] = useState(null);
  const [msg, setMsg] = useState("");
  async function documentUpdateApi() {
    //     console.log("consoleApiallhu",fields)
    // docForm.push(...fields);
    // console.log("fieldsssssssssssssssssssssssssssssssss",docForm)
    // console.log(JSON.stringify({document_content:formArray , SummaryFields: docForm }))

    //     console.log("Apiallhu",JSON.stringify(...myDoc, entries, fields))

    let arrPush = {};
    fields.map((elem) => {
      let keysArr = [elem[0]];
      let valuesArr = [elem[1]];
      let result = Object.assign.apply(
        {},
        keysArr.map((v, i) => ({ [v]: valuesArr[i] }))
      );
      arrPush = { ...arrPush, ...result };
    });

    // alert("Here is the patch")
    console.log("gggggggggggggggggggggggg", arrPush)
    //docForm
    await axios
      .patch(
        url + `/api/document/${docId}/`,
        { document_content: formArray, SummaryFields: arrPush },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("PATCH RESPONSE", res);
        console.log("SAAAAAAAAAAAAAAAAAVE:")
        // alert("Form updated successfully");
        // setMsg("Form updated successfully");
      })
      .catch((err) => {
        console.log("trytrytrytrytrytry", err);
        setMsg("Form Not updated");
      });
    // history.goBack();
    // toast.success(`Data added successfully`, {
    //   position: "top-center",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    // await axios
    //     .patch(url + `/api/document/${docId}/`,JSON.stringify({document_content:formArray , SummaryFields: docForm }), {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //     })
    //     .then((res) => {
    //         console.log(res.data);
    //         toast.success('Document updated successfulyy')
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
  }
  //   const [annotatorArray, setannotatorArray] = useState([]);
  //   useEffect(() => {
  //     annotatorArray.map((element) => {
  //       console.log("elementpopup", [element.label]);
  //       if (element.label == "L") {
  //         toggl();
  //         settoggleAdvance(true);
  //       } else if (element.label == "V") {
  //         toggl();
  //         settoggleAdvance(false);
  //       }
  //     });
  //   }, [annotatorArray]);

  //   -------------------------------------------------------------------------------------------

  // const handleshow = (e) => {
    
  //   // let newArr
  //   // setField(newArr)
  //   console.log(e);
  //   e.map((element) => {
  //     if (element.label == "L") {
  //       toggl();
  //       // alert(element.label)
  //       // newArr = [...field, element.label];
  //       settoggleAdvance(true);
        
  //     } else if (element.label == "V") {
  //       // alert(element.label)
  //       // newArr = [...field, element.label];
  //       toggl();
  //       settoggleAdvance(false);
  //     }
  //   });
  // };

  const handleshow = async (e) => {
    
    const height = e.map(a => a.height);
    const width = e.map(a => a.width);
    const top =  e.map(a => a.top);
    const left =  e.map(a => a.left);
    const label =  e.map(a => a.label);

    await axios
      .post(
        `${url}/api/get-ocr-value/${docId}/`,
        {
          height: height[height.length - 1],
          width: width[width.length - 1],
          top: top[top.length - 1],
          left: left[left.length - 1],
          label: label[label.length - 1]
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        let newArr;
        // console.log("res.data.text :", res.data.text)
        // console.log("res.text :", res.text)
        if(annatorLength < e.length){
          if (label[label.length - 1] == "L") {
            // setFieldCounter(fieldCounter + 1)
            // newArr = [...field, label[label.length - 1] + fieldCounter];
            newArr = [...field, res.data.text];
            setField(newArr)
            settoggleAdvance(true);
          } else if (label[label.length - 1] == "V") {
            // setFieldCounter(fieldCounter + 1)
            // newArr = [...field, label[label.length - 1] + fieldCounter];
            newArr = [...field, res.data.text];
            setField(newArr)
            settoggleAdvance(false);
          }
          setAnnatorLength(e.length)
        }      })
      .catch((error) => {
        console.log(error.response);
      });

  }
  //   -------------------------------------------------------------------------------------------

  //   --------------------array 2 properties convert------------------------------------------------------
  useEffect(() => {
    setcombineArray([...docForm, ...chunkArrayInGroups(field, 2)]);
    console.log("effect runs");
  }, [field]);
  //   ------------------------------------------------------------------------------------------

  // const array=["1","2","","","","","",""]
  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <ScreenTop />
        <Top />
        <ToastContainer />

        {/* <div className="App">
      <main className="App-main"> */}
        {/* <h3>Actual image uploaded</h3>
        <img 
           src={image} className="App-logo" alt="logo"
           ref={imageRef} 
           />
        <h3>Canvas</h3>
        <canvas ref={canvasRef} width={700} height={250}></canvas> */}

        {/* <h3>Extracted text</h3>
        <div className="pin-box">
          <p> {handledata} </p>
        </div> 
        <input type="file" onChange={(event)=>handleChange(event)} />
        <button onClick={handleClick} style={{height:50}}>Convert to text</button>
      </main>
    </div> */}

        <div className="ml-5 mt-2">
          <div className="mb-4 p-2 shadow border rounded d-flex flex-row align-items-center justify-content-between mr-5">
            <>
              <IconButton
                style={{
                  background: "black",
                  padding: "8px",
                  borderRadius: "50%",
                  marginRight: "25px",
                }}
                onClick={() => history.goBack()}
              >
                <IoMdArrowRoundBack size={30} color="white" />
              </IconButton>
              <h2>{docName}</h2>
            </>
            <div>&nbsp;</div>
            {/* <IconButton
              onClick={() => {
                toggle();
                console.log("ioioioio", fields);
              }}
            >
              <CgAddR size={25} color="black" />
            </IconButton> */}
          </div>
          <Row>
            <div className="d-flex flex-row">
              <div style={{ width: "110%" }}>
                <h5 className="text-secondary">
                  <AiOutlineArrowRight /> Add Bounding boxes for Labels & Values
                </h5>
                <div>
                  <BBoxAnnotator
                    style={{ width: "60% !important" }}
                    url={imagePath}
                    // url={
                    //   "https://milkgenomics.org/wp-content/uploads/2013/08/bigstock-cows-mother-and-baby-3998546.jpg"
                    // }
                    inputMethod="select"
                    labels={toggleAdvance ? "V" : "L"}
                    // labels={labels}
                   
                    onChange={(e) => {
                      // setannotatorArray(e)
                      handleshow(e);
                      // const height = e.map(a => a.height);
                      // const width = e.map(a => a.width);
                      // const top =  e.map(a => a.top);
                      // const left =  e.map(a => a.left);
                      // const label =  e.map(a => a.label);
                      
                      // setEntry({
                      //   height: height[0],
                      //   width: width[0],
                      //   top: top[0],
                      //   left: left[0],
                      //   label: label[0],
                      // })
                      // setModalEntryValue(label[label.length- 1])

                      // console.log("hhhhhhhheight:",result[0].height)
                        // setEntries(e);
                    }}

                    //  setShowClientModal(prev => !prev)
                    //  onChange={(e) => setEntries(e)}
                    // onChange={(e) => setEntries(e)}
                  ></BBoxAnnotator>
                </div>
              </div>

              <div className="ml-5 ">
                {fields &&
                  fields.map((f, index) => (
                    <div className="Det_inputField" key={index}>
                      <label
                        style={{ fontWeight: "bold" }}
                        className="Det_inputLabel d-flex flex-row"
                      >
                        <div className="mr-3">{f[0]}</div>
                      </label>
                      <div className="d-flex flex-row">
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
                          name={f[1]}
                          value={f[1]}
                          // key={f[1]}
                          onChange={(e) => handleDocumentContent(index, e)}
                        ></input>
                        <IconButton
                          style={{ marginLeft: "25px" }}
                          onClick={() =>
                            setFields(fields.filter((g) => g[1] !== f[1]))
                          }
                        >
                          <FaTimes color="red" />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                {fields.length > 0 && (
                  <Button
                    onClick={() => {
                      documentUpdateApi();
                    }}
                    className="w-100 mt-5"
                  >
                    Save Changes
                  </Button>
                )}
              </div>

              <div
                // style={{ width: "40rem" }}
                className="ml-5 "
                // style={{ marginLeft: "20px", marginTop: "32px" }}
              >
                {field &&
                  field.map((f, index) => (
                    <div
                      className="Det_inputField"
                      key={index}
                      style={{ width: "25rem" }}
                    >
                      {index % 2 == 0 ? (
                        <label
                          style={{ marginLeft: "0px", fontWeight: "bold" }}
                          className="Det_inputLabel d-flex flex-row"
                        >
                          <div className="mr-3">{f}</div>
                        </label>
                      ) : (
                        <div className="d-flex flex-row">
                          <input
                            style={{
                              border: "1px solid #e8e8e8",
                              backgroundColor: "#e8e8e8",
                              borderRadius: "12px",
                              fontSize: " 16px",
                              padding: "10px 14px",
                              width: "885%",
                            }}
                            type="text"
                            name={f}
                            value={f}
                            // key={f}
                            onChange={(e) => handleDocument(index, e)}
                          ></input>

                          {/* <IconButton style={{ marginLeft: '25px' }}
                                            onClick={() => setField(field.filter(g => g[0] !== f[0]))}
                                        >
                                            <FaTimes color='red' />
                                        </IconButton>  */}
                        </div>
                      )}
                      {/*  */}

                      {/* <div className='d-flex flex-row'> */}
                      {/* <input
                                            style={{
                                                border: "1px solid #e8e8e8",
                                                backgroundColor: "#e8e8e8",
                                                borderRadius: "12px",
                                                fontSize: " 16px",
                                                padding: "10px 14px",
                                                width: "85%"
                                            }}

                                            type="text"
                                            name={f[1]}
                                            value={f[1]}
                                            key={f[1]}
                                            onChange={(e) => handleDocument(index, e)}
                                        ></input> */}
                      {/* <IconButton style={{ marginLeft: '25px' }}
                                            onClick={() => setField(field.filter(g => g[1] !== f[1]))}
                                        >
                                            <FaTimes color='red' />
                                        </IconButton> */}
                      {/* </div> */}
                      {/* <IconButton style={{ marginLeft: '25px' }}
                                            onClick={() => setField(field.filter(g => g[1] !== f[1]))}
                                        >
                                            <FaTimes color='red' />
                                        </IconButton>  */}
                    </div>
                  ))}
                {field.length > 1 && (
                  <>
                    <Button
                      onClick={() => {
                        documentUpdate2Api();
                      }}
                      className="w-100 mt-5"
                    >
                      Save Changes
                    </Button>
                    <div className="w-100 text-center ">
                      <Button
                        className=""
                        style={{ margin: "1rem auto" }}
                        onClick={() => history.goBack()}
                      >
                        Go back
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* <div
                     style={{marginLeft:'200px',marginTop:'40px'}}>
                           
                         {JSON.stringify(entries)}
                         
                         
                         
                         </div> */}
          </Row>
        </div>
      </div>
      <DocumentDetailsModal
        toggle={toggle}
        modal={modal}
        documentId={docId}
        docContents={fields}
        setDocContents={setFields}
      />
      <ClientModal
        toggleAdvance={toggleAdvance}
        toggle={toggl}
        modal={modaled}
        documentId={docId}
        docContents={field}
        setDocContents={setField}
        dataValue={modalEntryValue}
      />
      <ToastContainer newestOnTop style={{ zIndex: "999999999999999999999" }} />
    </>
  );
};

export default AnnotateImage;
