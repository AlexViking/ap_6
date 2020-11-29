import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          <b>V</b> 0.0.6
        </div>
        <strong>
          Copyright © 2020 <a href="https://github.com/AlexViking/ap_6">Point of Sale for MalwareBytes</a>.
        </strong>{" "}
        All rights reserved.
      </footer>
    );
  }
}

export default Footer;
