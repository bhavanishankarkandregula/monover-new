import React, { useState, useRef } from 'react'
import { AiOutlineFileJpg, GrDocumentPdf, AiFillEye, IoMdShareAlt } from 'react-icons/all'
import InvalidIcon from "../../images/invalid-file.png";
import WordIcon from "../../images/word-file.png";
import TextIcon from "../../images/text-file.png";
import preview from "../../images/preview.jpg"
import { url } from "../../GlobalUrl";
import { useHistory } from 'react-router';
import { Modal } from 'react-bootstrap';
import Share from '../Share';
import './FilePreview2.css'



const PreviewFile = ({ file }) => {
    const history = useHistory();
    const [lgShow, setLgShow] = useState(false);
    const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined);
    const iframeRef = useRef(null);
    const [link, setLink] = useState("");


    const extension = file.document_name.substring(
        file.document_name.lastIndexOf(".") + 1
    );

    const isURL = (str) => {
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

    const openModal = (e) => {
        loadDoc();
        setLgShow(true);
    };

    const loadDoc = () => {
        const intervalId = setInterval(updateIframeSrc, 1000 * 5);
        setIframeTimeoutId(intervalId);
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


    const filePath = isURL(file.file) ? file.file : url + file.file;

    const FileIcon = () => {
        if (extension === "jpg" || extension === "jpeg" || extension === "png")
            return (
                <AiOutlineFileJpg style={{ marginRight: "10px" }} fontSize="42px" />
            );
        else if (extension === "pdf")
            return <GrDocumentPdf style={{ marginRight: "10px" }} fontSize="42px" />
        else if (extension === "doc" || extension === "docx")
            return <img src={WordIcon} style={{ marginRight: "10px" }} width={42} alt="file" />;
        else if (extension === "txt")
            return <img src={TextIcon} style={{ marginRight: "10px" }} width={42} alt="file" />;
        return <img src={InvalidIcon} style={{ marginRight: "10px" }} width={42} alt="file" />;
    };



    return (
        <div style={{ width: "100%", backgroundColor: "rgba(243, 242, 242, 0.7)", height: "80px", border: "1px solid lightgrey", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                style={{ width: "80%" }}
            >
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: 'center' }} >
                    <div className="fileIcon">
                        <FileIcon style={{ backgroundColor: "rgba(243, 242, 242, 0.7)" }} />
                    </div>
                    <div className="text-left lead docName" style={{ fontWeight: "400", overflow: "hidden", textOverflow: 'ellipsis' }} >

                        {file.document_name.length < 15
                            ? file.document_name
                            : file.document_name.slice(0, 15) + "..."}
                    </div>
                </div>
            </div>

            <div className='d-flex flex-row align-items-center'>
                <Share fontSize="30px"
                    className="mr-2 mr-md-3"
                    style={{ cursor: "pointer" }} id={file.id} item='document' />
                <AiFillEye
                    fontSize="30px"
                    className="mr-2 mr-md-3"
                    style={{ cursor: "pointer" }}
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
                        <div className='d-flex justify-content-start'>File Preview</div>
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
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default PreviewFile
