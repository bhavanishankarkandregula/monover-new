import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { Button } from "reactstrap";
import { url } from "../../GlobalUrl";

const DocumentSlider = (prop) => {
  // const [isStarDoc, setIsStarDoc] = useState(false);

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="d-flex align-items-center" onClick={onClick}>
        <Button
          outline
          color="secondary"
          style={{
            borderRadius: "20px",
            borderColor: "none",
            border: "0px",
            boxShadow: "none",
            fontWeight: "900",
          }}
        >
          <strong>
            <i className="fa fa-arrow-left fa-2x"></i>
          </strong>
        </Button>
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="d-flex align-items-center" onClick={onClick}>
        <Button
          outline
          color="secondary"
          style={{
            borderRadius: "20px",
            borderColor: "none",
            boxShadow: "none",
            border: "0px",
            fontWeight: "900",
          }}
        >
          <strong>
            <i class="fa fa-arrow-right fa-2x"></i>
          </strong>
        </Button>
      </div>
    );
  }

  const handleDocument = (documentId, starred) => {
    localStorage.setItem("documentId", documentId);
    localStorage.setItem("docStarred", starred);
    // setSubProjectId();
  };

  const settings = {
    // dots: true,
    //fade:false,
    className: "center",
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    mobileFirst: true,
    // centerMode: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          speed: 500,
          className: "center",
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          // centerMode: true,
          className: "center",
        },
      },
      // {
      //   breakpoint: 370 ,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //     speed: 500,
      //     centerMode: true,
      //     className: "center",
      //   }
      // }
    ],
  };

  //   function handleDocType(value) {
  //     setCurrentShow(value);
  //   }

  // const breakPoints = [
  //   {width:1 , itemsToShow : 1},
  //   {width:550 , itemsToShow : 2},
  //   {width:768 , itemsToShow : 3},
  //   {width:1200 , itemsToShow : 3}
  // ]

  return (
    <>
      <Slider {...settings} style={{ display: "flex" }}>
        {prop.documents.map((document, index) => (
          <div key={index}>
            {/* <h1>{document.id}</h1>
                        <div>{document.date_created}</div>
                        <div>{document.created_by}</div>
                        <p>{window.location.hostname+document.file}</p>
                    <img src={ "https://" + window.location.hostname + document.file} /> */}
            <p
              style={{
                fontSize: "1.5vw",
                marginTop: "2%",
                marginBottom: "2%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "60%",
              }}
            >
              {document.document_name}
            </p>
            <NavLink
              to={{
                pathname: "/document-details",
                aboutProps: {
                  documentId: document.id,
                  starred: document.starred,
                },
              }}
            >
              {document.file.split(".")[document.file.split(".").length - 1] ===
              "pdf" ? (
                <div
                className="IMG" style={{border:"none"}} onClick={() => handleDocument(document.id, document.starred)}
                >
                  <iframe
                    
                    title="docuemnts"
                    src={`https://docs.google.com/gview?url=${
                      url + document.file
                    }&embedded=true`}
                    style={{ overflow: "hidden", position: "relative",width:"100%",height:"100%",border:"none" }}
                  />
                  {/* <a
                    href=""
                    className="IMG"
                    style={{
                      display: "inline-block",
                      position: "relative",
                      top: 0,
                      left: 0,
                    }}
                  ></a> */}
                </div>
              ) : document.file.split(".")[
                  document.file.split(".").length - 1
                ] === "docx" ? (
                <img
                  src={url + document.file}
                  alt="IMG"
                  className="IMG"
                  onClick={() => handleDocument(document.id, document.starred)}
                  style={{ borderColor: "white", borderRadius: "15px" }}
                />
              ) : (
                <img
                  src={url + document.file}
                  alt="IMG"
                  className="IMG"
                  onClick={() => handleDocument(document.id, document.starred)}
                  style={{ borderColor: "white", borderRadius: "15px" }}
                />
              )}
            </NavLink>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default DocumentSlider;
