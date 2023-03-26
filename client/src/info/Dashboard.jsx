import React, { useState } from "react";
import "./Dashboard.css";
import Dropdown from "react-dropdown";
import { clearfileds } from "./functions";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
import "react-dropdown/style.css";

const Dashboard = () => {
  //right
  const navigate = useNavigate()
  const [course, setcourse] = useState("");
  const [staff, setstaff] = useState("");
  const [year, setyear] = useState(0);
  const [semester, setsemester] = useState("");
  const [subjectc, setsubjectc] = useState("");
  const [register, setregister] = useState("");
  const [t1, sett1] = useState("");
  const [t2, sett2] = useState("");
  const [attendace, setattendance] = useState(0);
  const [seminar, setseminar] = useState(0);
  const [assign1, setassign1] = useState("");
  const [assign2, setassign2] = useState("");
  const [assign3, setassign3] = useState("");
  const [model, setmodel] = useState("");
  const [Total, setTotal] = useState("");
  //avg0-o=op]

  const [avgoftheory, setavgtheory] = useState("");
  const [avgofassign, setavgassign] = useState("");
  const [avgofmodel, setavgmodel] = useState("");

  const getavg = () => {
    const t1 = document.getElementById("t1").value;
    const t2 = document.getElementById("t2").value;
    const t1plust2 = (Number(t1) + Number(t2)) / 2;
    setavgtheory(t1plust2);
    const as1 = document.getElementById("assignment1").value;
    const as2 = document.getElementById("assignment2").value;
    const as3 = document.getElementById("assignment3").value;
    const astot = (Number(as1) + Number(as2) + Number(as3)) / 3;
    setavgassign(astot);

    const model = document.getElementById("model").value;
    const m = Math.round(model / 3.33);
    setavgmodel(m);

    const att = document.getElementById("attendance").value;
    const semi = document.getElementById("seminar").value;
    const attplussemi = Number(att) + Number(semi);
    const total = astot + t1plust2 + m + attplussemi;
    setTotal(Number(total));
  };
  const create = async()=>{
    if(!course){
      document.getElementById("forcourse").value +="Course is Required" 
      return
    } 
   
     const data = { 
        registerno:register,
        course:course,
        subjectcode:subjectc,
        avgtheory:avgoftheory,
        avgassignment:avgofassign,
        attendance:attendace,
        seminar:seminar,
        internal_marks:Total,  
        year:year
     }
    await axios.post("http://localhost:5000/add",data).then(()=>{
      alert("submitted successfully")
     })
  }
  return (
    <div className="content">
      <form>
      <div className="header">ERODE ARTS AND SCIENCE COLLEGE</div>
     <div className="getreport"><button className="btn btn-primary" onClick={()=>navigate("/getreport")}>Get Report</button></div>
      <div className="container">
        <div className="row">
          <div className="left col-3">
           
              <br></br>
              
              <div className="form-group">
                <label>Course:</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setcourse(e.target.value);
                  }}
                  placeholder="Course"
                />
              <span id="forcourse"></span>
                <label>Staff Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setstaff(e.target.value);
                  }}
                  placeholder="Staff Name"
                />
                <label>year</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Year"
                  onChange={(e) => {
                    setyear(parseInt(e.target.value));
                  }}
                  
                />


                <label>Semester:</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setsemester(e.target.value);
                  }}
                />

                <label>Subject Code</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setsubjectc(e.target.value);
                  }}
                />
 
                <br></br>
                <button type="reset" class="btn1 btn btn-danger">
                  clear
                </button>
              </div>
            
          </div>
          <div class="vl"></div>

          <div className="center col-3">
              <div>
                <label>Register No</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Register No"
                  id="regno"
                  onChange={(e) => {
                    setregister(parseInt(e.target.value));
                  }}
                />
                <label>T1</label>
                <input
                  type="Number"
                  class="inp form-control"
                  placeholder="T1"
                  id="t1"
                  onChange={(e) => {
                    sett1(parseInt(e.target.value));
                  }}
                />
                <label>T2</label>
                <input
                  type="Number"
                  class="inp form-control"
                  placeholder="T2"
                  id="t2"
                  onChange={(e) => {
                    sett2(parseInt(e.target.value));
                  }}
                />

                <label>Attendance</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Attendance"
                  onChange={(e) => {
                    setattendance(parseInt(e.target.value));
                  }}
                  id="attendance"
                  
                />
                <label>Seminar</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Seminar"
                  onChange={(e) => {
                    setseminar(parseInt(e.target.value));
                  }}
                  
                  id="seminar"
                />
              </div>
          </div>
          <div className="center2 col-3">
            <div>
              <label>Assignment 1</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Assignment 1"
                onChange={(e) => {
                  setassign1(parseInt(e.target.value));
                }}
                id="assignment1"
              />
              <label>Assignment 2</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Assignment 2"
                onChange={(e) => {
                  setassign2(parseInt(e.target.value));
                }}
                id="assignment2"
              />
              <label>Assignment 3</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Assignment 3"
                onChange={(e) => {
                  setassign3(parseInt(e.target.value));
                }}
                id="assignment3"
              />

              <label>Modal</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Modal"
                id="model"
              />
            </div>
          </div>
          <div className="right col-3">
            <div>
              <label>Avg of Theory</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Avg of Theory"
                id='avgtheory'
                value={avgoftheory}
                readOnly
              />
              <label>Avg of Assignment</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Avg of Assignment"
                id='avgassign'
                value={avgofassign}
                readOnly
              />
              <label>Avg of Model</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Avg of Model"
                id="avgmodel"
                value={avgofmodel}
                readOnly
              />

              <label>Total Internal Marks</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Total Internal Marks"
                id="tot"
                value={Total}
                readOnly
              />
              <div style={{ marginTop: "40px", marginLeft: "-20px" }}>
                <button type="button" class="btn btn-info" onClick={getavg}>
                  Get Average
                </button>{" "}
                &#160;&#160;
                <button type="button" class="btn btn-success" onClick={create}>
                  Submit
                </button>
                &#160;&#160;
                <button type="reset" class="btn btn-danger" onClick={clearfileds}>
                  clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Dashboard;
