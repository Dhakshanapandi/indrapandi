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
  const [year, setyear] = useState("");
  const [semester, setsemester] = useState("");
  const [subjectc, setsubjectc] = useState("");
  const [register, setregister] = useState("");
  const [t1, sett1] = useState("");
  const [t2, sett2] = useState("");
  const [attendace, setattendance] = useState("");
  const [seminar, setseminar] = useState("");
  const [assign1, setassign1] = useState("");
  const [assign2, setassign2] = useState("");
  const [assign3, setassign3] = useState("");
  const [model, setmodel] = useState("");
  const [Total, setTotal] = useState("");
  const [update,setupdate] = useState(false)
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
     if(!update){
      await axios.post("http://localhost:5000/add",data).then((err,result)=>{
      if(!err) alert("Successfully Inserted")
      else{
        console.log(err);
        alert(err.data.sqlMessage)
      }
     })
     }
     else{
      await axios.put("http://localhost:5000/update",data).then(()=>{
        alert("Updated successfully")
       })
     }
    
  }
  const getdata = ()=>{
    var data = document.getElementById("regno").value
    if(!data){
      alert("Register No is required To Update")
    }
    else{
      
      axios.get(`http://localhost:5000/getdata/${register}`).then((res)=>{


      res.data.map((items)=>{

        setattendance(items.attendance)
        setavgassign(items.avgassignment)
        setavgtheory(items.avgtheory)
        setcourse(items.course)
        setTotal(items.internal_marks)
        setregister(items.registerno)
        setseminar(items.seminar)
        setsubjectc(items.subjectcode)
        setyear(items.year)
      })
      setupdate(true)
       
      })
    }
  }
  const clearfileds = () => {
    
    window.location.reload(true)
    return;
  };

  return (
    <div className="content">
      <form autoComplete="off">
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
                  maxLength={8}
                  onChange={(e) => {
                    setcourse(e.target.value);
                  }}
                  placeholder="Course"
                  value={course}
                />
              <span id="forcourse"></span>
                <label>Staff Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={(e) => {
                    setstaff(e.target.value);
                  }}
                  maxLength={15}
                  placeholder="Staff Name"
                  value={staff}
                />
                <label>year</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Year"
                  onChange={(e) => {
                    setyear(parseInt(e.target.value));
                  }}
                  value={year}
                  
                />


                <label>Semester:</label>
                <input
                  type="text"
                  class="form-control"
                  maxLength={5}
                  onChange={(e) => {
                    setsemester(e.target.value);
                  }}
                  value={semester}
                />

                <label>Subject Code</label>
                <input
                  type="text"
                  class="form-control"
                  maxLength={8}
                  onChange={(e) => {
                    setsubjectc(e.target.value);
                  }}
                  value={subjectc}
                />
 
               
                
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
                  value={register}
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
                  value={t1}
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
                  value={t2}
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
                  value={attendace}
                  
                />
                <label>Seminar</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Seminar"
                  onChange={(e) => {
                    setseminar(parseInt(e.target.value));
                  }}
                  value={seminar}
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
                value={assign1}
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
                value={assign2}
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
                value={assign3}
              />

              <label>Modal</label>
              <input
                type="number"
                class="inp form-control"
                placeholder="Modal"
                id="model"
                value={model}
                onChange={(e) => {
                  setmodel(parseInt(e.target.value));
                }}
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
                <button type="button" class="btn btn-danger" onClick={clearfileds}>
                  clear
                </button><br></br>
                <button type="button" className="btn btn-warning" style={{marginTop:"10px"}} onClick={getdata}>Update</button>
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
