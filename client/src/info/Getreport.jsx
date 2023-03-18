import React from "react";

const Getreport = () => {
  return (
    <div className="container">
      <button id="myBtn">Open Modal</button>

      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </div>
  );
};

export default Getreport;
