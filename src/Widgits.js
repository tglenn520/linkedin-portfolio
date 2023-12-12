import React from "react";
import "./Widgits.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widgits() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgits__article">
      <div className="widgits__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgits__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgits">
      <div className="widgits__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle("lighterandco is back", "Top news - 9099 readers")}
      {newsArticle("Bitcoin Breaks $22k", "Crypto - 1234 readers")}
      {newsArticle("Is Redux Too Good?", "Code - 2343 readers")}
      {newsArticle("Audi hits new hights", "Cars & auto - 4356 readers")}
      {newsArticle("Phoenix Suns New Big 3", "Sports  - 4321 readers")}
    </div>
  );
}

export default Widgits;
