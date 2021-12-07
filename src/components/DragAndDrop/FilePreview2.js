import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import WordIcon from "../../images/word-file.png";
import TextIcon from "../../images/text-file.png";
import InvalidIcon from "../../images/invalid-file.png";
import preview from "../../images/preview.jpg"
import { url } from "../../GlobalUrl";
import { AiFillEye, AiOutlineFileJpg, GrDocumentPdf,TiArrowForward ,AiOutlineDatabase,

  BsCalculator,
  BsFilterSquare,
  BsReceiptCutoff,
  BsReceipt,
  IoCalculatorOutline,
  GrHost} from "react-icons/all";
import { useHistory } from "react-router";
import './FilePreview2.css'
import Share from '../Share'
import ReplyIcon from '@material-ui/icons/Reply';
// checking because everytime file url is not a http link, but sometimes
// file url is coming path
export function isURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}

function FilePreview2(props) {
 console.log("props",props);
  const { file } = props;
  const [lgShow, setLgShow] = useState(false);
  const history = useHistory();
  const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
  const iframeRef = useRef(null);
  const [link, setLink] = useState("");

  const openModal = (e) => {

    // console.log("linkssss", filePath2);
    loadDoc();
    setLgShow(true);
  };

  const loadDoc = () => {
    // console.log("filepathhsss", filePath2);
    const intervalId = setInterval(updateIframeSrc, 1000 * 5);
    setIframeTimeoutId(intervalId);
    // console.log("intervalllll", intervalId);
  };

  async function iframeLoaded() {
    document.getElementById("IFRAME").style.backgroundImage = "none";
    await clearInterval(iframeTimeoutId);
  }

  function getIframeLink() {
    return `https://docs.google.com/gview?url=${filePath}&embedded=true`;
  }

  function updateIframeSrc() {
    if (iframeRef.current) {
      iframeRef.current.src = getIframeLink();
    }
  }

  const closeModal = (e) => {
    setLgShow(false);
    // e.stopPropagation()
  };
  const extension = file.document_name.substring(
    file.document_name.lastIndexOf(".") + 1
  );
  const filePath = isURL(file.file) ? file.file : url + file.file;
  const filePath2 = isURL(file.file) ? file.file : file.file;
  // console.log("filepre", filePath, filePath2);
  const FileIcon = () => {
    if (extension === "jpg" || extension === "jpeg" || extension === "png")
      return (
    <AiOutlineFileJpg style={{ marginRight: "10px" }} fontSize="28px" />
     );
    else if (extension === "pdf")
      return <GrDocumentPdf style={{ marginRight: "10px" }} fontSize="28px" />
    else if (extension === "doc" || extension === "docx")
      return <img src={WordIcon} style={{ marginRight: "10px" }} width={28} alt="file" />;
    else if (extension === "txt")
      return <img src={TextIcon} style={{ marginRight: "10px" }} width={28} alt="file" />;
    return <img src={InvalidIcon} style={{ marginRight: "10px" }} width={28} alt="file" />;
  };

  const document_content =
    "document_content" in file ? JSON.parse(file.document_content) : [];

  // useEffect(() => {
  //   const intervalId = setInterval(updateIframeSrc, 1000 * 2);
  //   setIframeTimeoutId(intervalId);
  // }, [link]);

  // function iframeLoaded() {
  //   document.getElementById("IFRAME").style.backgroundImage = "none";
  //   clearInterval(iframeTimeoutId);
  // }
  // async function getIframeLink() {
  //   return `https://docs.google.com/gview?url=${filePath}&embedded=true`;
  // }
  // function updateIframeSrc() {
  //   if (iframeRef.current) {
  //     iframeRef.current.src = getIframeLink();
  //   }
  // }

  return (
    <div style={{marginLeft:'4px',marginRight:'4px',backgroundColor: "rgba(243, 242, 242, 0.7)", height: "49px", border: "1px solid lightgrey", borderRadius: "9px", display: "flex", alignItems: "center" }}>
      <div
        onClick={() => {
          localStorage.setItem("Imagepath", filePath);
          if (file.shared_by_details) {
            history.push(`/document-details/${file.id}/shared/${file.id}`);
          } else {
            history.push(`/document-details/${file.id}`);
          }
        }}
        title={file.document_name}
        className="p-2 b-container c-pointer"
        style={{ width: "90%" }}
      >
        {/* <div>
          <FileIcon />
        </div> */}
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }} >
          <div >
            <FileIcon style={{ backgroundColor: "rgba(243, 242, 242, 0.7)"}} />
          </div>
          <div className="text-left lead docName" style={{ fontWeight: 600,fontSize:15, overflow: "hidden", textOverflow: 'ellipsis' }} >

            {file.document_name.length < 20
              ? file.document_name
              : file.document_name.slice(0, 20) + "..."}
          </div>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'row',marginTop:'4px'}} >

      <TiArrowForward     fontSize="20px"
          className=""
          style={{ cursor: "pointer",marginRight:'4px' }}
          onClick={(e) => {
            setLink(filePath);
            openModal(e);
          }} />
        <AiFillEye
          fontSize="20px"
          // className="mr-2 mr-md-3"
          style={{ cursor: "pointer",marginRight:'13px'  }}
          onClick={(e) => {
            setLink(filePath);
            openModal(e);
          }}

        />
      </div>



      <Modal
        size="lg"
        show={lgShow}
        onHide={(e) => closeModal(e)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className='d-flex justify-content-start'>File Preview {!file.shared_by_details ? <Share id={file.id} item='document' /> : null}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              {(extension === "jpg" || extension === "jpeg" || extension === "png") ? (
                <img
                  src={filePath}
                  style={{ width: "100%" }}
                  alt={file.document_name}
                />
              ) : (

                extension === "pdf" ? (
                  <div class="iframe-loading">
                    <iframe
                      id="IFRAME"
                      className="PDFIMG"
                      onLoad={iframeLoaded}
                      onError={updateIframeSrc}
                      ref={iframeRef}
                      src={getIframeLink()}
                    // src={`https://docs.google.com/gview?url=${imagePath}&embedded=true`}
                    />
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>

                    <img
                      src={preview}
                      style={{ width: "90%", height: "30rem" }}


                    />
                    <h1>No Preview Available</h1>
                  </div>
                )


              )}
            </div>


            {/* {extension === "pdf" ? (
                <div class="iframe-loading">
                  <iframe
                    id="IFRAME"
                    className="PDFIMG"
                    onLoad={iframeLoaded}
                    onError={updateIframeSrc}
                    ref={iframeRef}
                    src={getIframeLink()}
                    // src={`https://docs.google.com/gview?url=${imagePath}&embedded=true`}
                  />
                </div>
              ) : null} */}
            {/* <div
              className="d-none"
              style={{ height: "80vh", overflowY: "scroll" }}
            >
              {document_content?.length > 0 &&
                Object.entries(document_content[0]).map(([key, value]) => (
                  <div className="Det_inputField">
                    <label className="Det_inputLabel">{key}</label>
                    <div className="row">
                      <div className="col-9">
                        <input
                          className="form-control w-100"
                          type="text"
                          name={key}
                          value={value}
                        ></input>
                      </div>
                      <div className="col-3">
                        <Button variant="outline-dark">
                          <span>
                            <i className="fa fa-times fa-lg"></i>
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div> */}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FilePreview2;