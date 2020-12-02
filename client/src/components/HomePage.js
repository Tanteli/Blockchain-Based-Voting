import React from "react";
import getWeb3 from "../getWeb3";

import { FormGroup, FormControl, Button } from "react-bootstrap";
import Registration from "./Registration";

function HomePage(props) {
  const address = props.address;

  return (
    <div>
      <h4>Your address is {address} </h4>
      <div class="card">
        <div class="card-header">Welcome!</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0"></blockquote>
          <Registration address={address} />
          <br></br>
          <button type="button" class="btn btn-success btn-sm" style={{marginRight:"10px"}}>
            Open Proposal Registration
          </button>
          <button type="button" class="btn btn-danger btn-sm" style={{marginRight:"10px"}}>
            Close Proposal Registration
          </button>
          <button type="button" class="btn btn-success btn-sm" style={{marginRight:"10px"}}>
            Open Vote Session
          </button>
          <button type="button" class="btn btn-danger btn-sm" style={{marginRight:"10px"}}>
            Close Vote Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
