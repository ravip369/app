import React, { Component } from "react";
import {
  Grid,
  Image,
  Label,
  Button,
  Container,
  Segment,
  Icon,
  Radio,
} from "semantic-ui-react";

const modeSelection = () => {
  return (
    <div>
      <h1 style={{ color: "white", textAlign: "center" }}>MODE SELECTION</h1>
      <br />

      <label
        style={{
          background: "noBackgound",
          color: "white",
          fontSize: "25px",
          yAxis: "5px",
          transform: "translate(-20px,-10px",
        }}
      >
        Manual
      </label>
      <Radio
        style={{
          fontSize: "25px",
          border: "#53BBD6 2px solid",
          borderRadius: "30px",
          height: "25px",
          width: "55px",
        }}
        size="massive"
        basic
        toggle
        checked={this.state.installationMode}
        onChange={() => this.toggleInstallationMode()}
      ></Radio>
      <label
        style={{
          background: "noBackgound",
          color: "white",
          fontSize: "25px",
          yAxis: "5px",
          transform: "translate(15px,-15px",
        }}
      >
        Automatic
      </label>
    </div>
  );
};

export default modeSelection;
