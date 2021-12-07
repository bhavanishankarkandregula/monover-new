import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FilePreview from "./FilePreview3";
import {
  AiFillCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/all";
import FolderImage from "../../images/folder-icon.png";

function FilesModal({
  files = [],
  folder_id = "",
  revertFile,
  addSuggestedDocs,
  folder_details,
  suggestedFile = [],
  folder_name,
  setModal,
}) {
  const [sug, setSug] = useState(suggestedFile);
  const [chechDocs, setChechDocs] = useState([]);
  // useState(() => {
  //   setSug(suggestedFile);
  // }, [Modal]);
  // console.log("filesssss", files);
  // console.log("onDropFunc", onDrop);
  // console.log(suggestedFile ? suggestedFile.suggested_docs : "hello");
  // console.log("hello", files, folder_id, revertFile, folder_details);

  const removeFileFromSuggestions = (fileId, folderId) => {
    console.log("remove file id", fileId);
    if (chechDocs.length > 0 && chechDocs.includes(fileId)) {
      window.alert("file is already added in folder");
    } else {
      chechDocs.push(fileId);
      addSuggestedDocs(fileId, folderId);
    }
    // suggestedFile = suggestedFile.filter((file) => file.id !== id);
    // console.log(suggestedFile);
  };

  const addFileInSuggestions = (fileId, folderId, file) => {
    console.log("add file id", fileId, chechDocs.includes(fileId));
    if (chechDocs.length > 0 && chechDocs.includes(fileId)) {
      chechDocs.pop(fileId);
      revertFile(file, folderId);
    }
    // suggestedFile = suggestedFile.filter((file) => file.id !== id);
    // console.log(suggestedFile);
  };
  const [lgShow, setLgShow] = useState(false);
  return (
    <div>
      <div class="c-pointer" style={{textAlign:"center"}} onClick={() => setLgShow(true)}>
        {files.length ? (
          <span
            style={{
              marginBottom: "-30px",
              marginLeft: "70px",
              position: "absolute",
            }}
            class="badge badge-primary c-pointer"
          >
            {files.length}
          </span>
        ) : null}

        <img
          style={{ marginTop: "-30px", height: "85px" }}
          src={FolderImage}
          alt="folder-icon"
        />
        <br></br>
        <span className="h6" style={{ fontWeight: '500' }}>{folder_details.sub_project_name}</span>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Files under {folder_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {files.length === 0 && (
              <h3 style={{ marginLeft: "15px" }}> No files available</h3>
            )}
            {files.map((file) => {
              return (
                <>
                  <div  className="col-6 col-md-3" style={{paddingRight:"5px",paddingLeft:"5px",marginBottom:"5px",marginTop:"5px"}}>
                    <div className="pr-1 pr-md-3" style={{display:"flex",justifyContent:"flex-end",backgroundColor:"whitesmoke",paddingTop:"10px",paddingBottom:"10px"}}>
                    <AiOutlineMinusCircle
                      style={{
                       
                        color: "red",
                        
                        cursor: "pointer",
                        fontSize: "22px",
                      }}
                      onClick={() => revertFile(file, folder_id)}
                    />
                    </div>
                    {/* {console.log("file", file)} */}
                    <FilePreview file={file} />
                  </div>
                </>
              );
            })}
          </div>
          <div>
            {suggestedFile.length > 0 && (
              <>
                <hr></hr>
                <Modal.Header>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Suggested Files for {folder_name}
                  </Modal.Title>
                </Modal.Header>
                <div style={{ marginTop: "20px" }} className="row">
                  {suggestedFile.map((file) => {
                    return (
                      <>
                        <div className="col-3">
                          {/* file, f.id */}
                          <AiOutlinePlusCircle
                            style={{
                              marginLeft: "90px",
                              color: "green",
                              position: "absolute",
                              cursor: "pointer",
                              fontSize: "22px",
                            }}
                            onClick={() => {
                              addSuggestedDocs(file.id, folder_id);
                            }}
                          />
                          {/* {console.log("file2", file)} */}
                          <FilePreview file={file} />
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FilesModal;
