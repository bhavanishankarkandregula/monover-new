import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import "./OrganisationCard.css";

import user from "../../images/user.jpg";
import axios from "axios";
import { url } from "../../GlobalUrl";

const JoinedOrganisationCard = (props) => {
  const [addColor, setAddColor] = useState("black");

  return (
    <div>
      <div className="cardLayout">
        <CardBody>
          <div className="OrganisationCard">
            <div className="OrganisationCardTop">
              <i
                class="fa fa-thumb-tack fa-lg"
                style={{ color: addColor }}
                // onClick={addToFav}
              ></i>
              <p >&nbsp;</p>
            </div>
            <img src={user} alt="User" />
            <CardTitle
              tag="h5"
              style={{
                fontSize: "1.5rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                margin: "0.4rem 0rem",
              }}
            >
              {props.name}
            </CardTitle>
            <CardText style={{ textAlign: "center" }}>
              <small>No. of documents</small>
            </CardText>
          </div>
        </CardBody>
      </div>
    </div>
  );
};

export default JoinedOrganisationCard;
