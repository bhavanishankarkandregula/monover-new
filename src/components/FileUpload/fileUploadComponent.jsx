import React, {
  Component,
  useState,
  useRef,
  Redirect,
  useCallback,
  useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from "./fileUploadStyles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  clear_files_also,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  // const onDrop = useCallback((filess) => {
  const onDrop = (filess) => {
    let resultList = {};
    var filesLength = Object.keys(files).length;
    for (var i = 0; i < filesLength; i++) {
      resultList[Object.keys(files)[i]] = Object.values(files)[i];
    }
    for (var i = 0; i < filess.length; i++) {
      if (!filess[i].name) return;
      resultList[filess[i].name] = filess[i];
    }
    setFiles(resultList);
    callUpdateFilesCb(resultList);
  };
  // }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    console.log("newfiles", newFiles);
    for (let file of newFiles) {
      // if (file.size <= maxFileSizeInBytes) {
      if (!otherProps.multiple) {
        return { file };
      }
      files[file.name] = file;
      // }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    console.log(filesAsArray);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <FileUploadContainer style={{marginTop:"45px"}}>
        <div {...getRootProps({ className: "dropzone" })}>
          {/* <input {...getInputProps()} /> */}
          <DragDropText style={{marginTop:"20px",fontSize:"17px",textTransform:"uppercase",marginBottom:"25px"}}>Drag and drop your files anywhere or</DragDropText>
          <UploadFileBtn style={{margin:"auto",marginTop:"35px",marginBottom:"15px",textAlign:"center"}} type="button" onClick={handleUploadBtnClick}>
            <i className="fas fa-file-upload" />
            <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
          </UploadFileBtn>
          <FormField
            type="file"
            ref={fileInputField}
            onChange={handleNewFileUpload}
            title=""
            value=""
            {...otherProps}
          />
        </div>
      </FileUploadContainer>
      <FilePreviewContainer>
        <PreviewList className="row">
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <PreviewContainer style={{minHeight:"120px"}}  className="col-12 col-sm-6 col-lg-4 col-xl-3 my-2" key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon
                        className="fas fa-trash-alt"
                        onClick={() => removeFile(fileName)}
                      />
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default FileUpload;
