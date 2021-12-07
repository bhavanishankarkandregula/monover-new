import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import PdfIcon from "../../images/pdf-icon.png";
import ImageIcon from "../../images/image-file.png";
import WordIcon from "../../images/word-file.png";
import TextIcon from "../../images/text-file.png";
import InvalidIcon from "../../images/file3.jpeg";
import { url } from "../../GlobalUrl";
import { AiFillEye } from "react-icons/all";
import preview from "../../images/preview.jpg"
import { useHistory } from "react-router";
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

function FilePreview(props) {
  // console.log(props);
  const { file } = props;
  const [lgShow, setLgShow] = useState(false);
  const history = useHistory();
  const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
  const iframeRef = useRef(null);
  const [link, setLink] = useState("");

  const openModal = (e) => {
    e.stopPropagation();
    e.cancelBubble = true;
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
    var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    setLgShow(false);
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
        <img
          src={filePath}
          width={80}
          height={80}
          // style={{ marginTop: "20px" }}
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

  // const document_content =
  //   "document_content" in file ? JSON.parse(file.document_content) : [];

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
    <div  >
      <div
        onClick={() => {

          if (!(props.choosedFolder && props.selectMulti)) {
            localStorage.setItem("Imagepath", filePath);
            history.push(`/document-details/${file.id}`);
          }

        }}
        title={file.document_name}
        style={{
          cursor:
            props.choosedFolder && props.selectMulti
              ? "pointer"
              : "default"
        }}

      >
        <div>
          <FileIcon />
        </div>
        {(!(props.choosedFolder && props.selectMulti)) && (

          <div style={{ marginLeft: "70px" }}
            onClick={(e) => {
              e.stopPropagation();
              setLink(filePath);
              openModal(e);
            }}
          >
            <AiFillEye
              style={{ cursor: "pointer" }}

              size={20}
            />
          </div>

        )}
        <div />
        <div className=" lead small mt-2">
          {file.document_name.length < 20
            ? file.document_name
            : file.document_name.slice(0, 20) + "..."}
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => {
          closeModal()
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            File preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              {extension === "jpg" ||
                extension === "jpeg" ||
                extension === "png" ? (
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

export default FilePreview;
