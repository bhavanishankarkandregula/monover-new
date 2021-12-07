import React, { useState } from "react";
import { CardBody, CardText, CardTitle } from "reactstrap";
import "./OrganisationCard.css";
import user from "../../images/user.jpg";
import team2 from "../../images/org.jpg";
import {RiDeleteBin2Line } from "react-icons/all"

const OrganisationCard = (props) => {
  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("orgId");

  const [Pin, setPin] = useState({ id: "", color: "" });

  const pinnedCard = () => {
    // console.log("Pinned");
    props.Favourites(props.id);
    console.log(Pin);
    setPin((prev) => {
      return {
        ...prev,
        id: props.id,
        color: "black",
      };
    });
  };

  return (
    <div style={{ display:"flex",justifyContent:"center"}}>
      <div
        className="cardLayout"
        style={{
         
          boxShadow:
            props.id === Number(orgId)
              ? "0px 0px 11px 0px rgba(0,0,0,0.75)"
              : "none",
          border:
          props.id === Number(orgId)
              ? "none"
              : "1px solid lightgrey",
          backgroundColor: "rgba(243, 242, 242, 0.7)"
           
        }}
      >
        <CardBody className=" pt-md-4 pl-md-3 pr-md-3">
          <div className="OrganisationCard">
            <div className="OrganisationCardTop">
              {/* <i
                class="fa fa-thumb-tack fa-lg"
                style={{
                  color: props.id === Number(orgId) ? "black" : "#888888",
                }}
                onClick={pinnedCard}
              ></i> */}
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  props.removeOrganisation(props.id);
                }}
                
              >
                <RiDeleteBin2Line/>
              </p>
            </div>
            <img src={team2} alt="User" />
            <CardTitle className="title">
              <p>{props.name}</p>
              {/* ACP */}
            </CardTitle>
            <CardText className="subtitle">
              <small>{props.noOfDocs} Documents</small>
            </CardText>
          </div>
        </CardBody>
      </div>
    </div>
  );
};

export default OrganisationCard;
