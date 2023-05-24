import React, { useState } from "react";
import "./Dashboard.css";
import Dropdown from "react-dropdown";

import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-dropdown/style.css";
import { useforrm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Dashboard = () => {
  //right

  const navigate = useNavigate();
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
  const [update, setupdate] = useState(false);
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
  const create = async () => {
    const course1 = document.getElementById("course1").value;
    const staffname1 = document.getElementById("staffname1").value;
    const year1 = document.getElementById("year1").value;
    const semester1 = document.getElementById("semester1").value;
    const subcode1 = document.getElementById("subcode1").value;
    const regno1 = document.getElementById("regno").value;
    const t1 = document.getElementById("t1").value;
    const t2 = document.getElementById("t2").value;
    const attendance1 = document.getElementById("attendance").value;
    const seminar1 = document.getElementById("seminar").value;
    const assignment1 = document.getElementById("assignment1").value;
    const assignment2 = document.getElementById("assignment2").value;
    const assignment3 = document.getElementById("assignment3").value;
    const model1 = document.getElementById("model").value;
    const avgtheory1 = document.getElementById("avgtheory").value;
    const avgassign1 = document.getElementById("avgassign").value;
    const avgmodel1 = document.getElementById("avgmodel").value;
    const tot1 = document.getElementById("tot").value;

    if (!course1) {
      return alert("Course is Required");
    } else if (!staffname1) {
      return alert("StafName is Required");
    } else if (!year1) {
      return alert("Year is Required");
    } else if (!semester1) {
      return alert("semester is Required");
    } else if (!subcode1) {
      return alert("Subject Code is Required");
    } else if (!regno1) {
      return alert("Register No is Required");
    } else if (!t1) {
      return alert("T1 is Required");
    } else if (!t2) {
      return alert("T2 is Required");
    } else if (!attendance1) {
      return alert("Attendance is Required");
    } else if (!seminar1) {
      return alert("seminar is Required");
    } else if (!assignment1) {
      return alert("Assignment1 is Required");
    } else if (!assignment2) {
      return alert("Assignment2 is Required");
    } else if (!assignment3) {
      return alert("Assignment3 is Required");
    } else if (!model1) {
      return alert("Model is Required");
    } else if (!avgtheory1) {
      return alert("Please Find Average");
    } else if (!avgassign1) {
      return alert("Please Find Average");
    } else if (!avgmodel1) {
      return alert("Please Find Average");
    } else if (!tot1) {
      return alert("Please Find Average");
    }

    const data = {
      registerno: register,
      course: course,
      avgtheory: avgoftheory,
      avgassignment: avgofassign,
      avgofmodel: avgofmodel,
      semester: semester,
      subjectc: subjectc,
      attendance: attendace,
      seminar: seminar,
      internal_marks: Total,
      staff: staff,
      t1: t1,
      t2: t2,
      assign1: assign1,
      assign2: assign2,
      assign3: assign3,
      model: model,
      year: year,
    };
    if (!update) {
      await axios
        .post("http://localhost:5000/add", data)
        .then((err, result) => {
          if (err.data.code) {
            alert(err.data.sqlMessage);
          } else {
            alert("Successfully created");
          }
        });
    } else {
      await axios
        .put("http://localhost:5000/update", data)
        .then((result) => {
          
          if(result.data){
            alert("Updated Successfully");
          }
          else{
            alert("Make Some Changes or No Such Student")
          }
        });
    }
  };
  const getdata = () => {
    var data = document.getElementById("regno").value;
    if (!data) {
      alert("Register No is required To Update");
    } else {
      axios.get(`http://localhost:5000/getdata/${register}`).then((res) => {
        res.data.map((items) => {
          setattendance(items.attendance);
          setavgassign(items.avgassignment);
          setavgtheory(items.avgtheory);
          setcourse(items.course);
          setTotal(items.internal_marks);
          setregister(items.registerno);
          setseminar(items.seminar);
          setsubjectc(items.subjectcode);
          setyear(items.year);
          setsemester(items.semester);
          setstaff(items.staffname);
          sett1(items.t1);
          sett2(items.t2);
          setmodel(items.model);
          setavgmodel(items.avgmodel);
          setassign1(items.assign1);
          setassign2(items.assign2);
          setassign3(items.assign3);
        });
        setupdate(true);
      });
    }
  };
  const clearfileds = () => {
    window.location.reload(true);
    return;
  };

  return (
    <div className="content">
      <form autoComplete="off">
        <div className="header">ERODE ARTS AND SCIENCE COLLEGE</div>
        <div className="getreport">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/getreport")}
          >
            Get Report
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="left col-3">
              <br></br>

              <div className="form-group">
                <label>Course:</label>
                <input
                  type="text"
                  id="course1"
                  class="form-control"
                  maxLength={15}
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
                  id="staffname1"
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
                  id="year1"
                  class="inp form-control"
                  placeholder="Year"
                  onChange={(e) => {
                    setyear(parseInt(e.target.value));
                  }}
                  value={year}
                />

                <label>Semester:</label>
                <input
                  type="number"
                  id="semester1"
                  class="inp form-control"
                  maxLength={5}
                  onChange={(e) => {
                    setsemester(parseInt(e.target.value));
                  }}
                  value={semester}
                />

                <label>Subject Code</label>
                <input
                  type="text"
                  id="subcode1"
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
                  type="text"
                  class="form-control"
                  placeholder="Register No"
                  id="regno"
                  onChange={(e) => {
                    setregister(e.target.value);
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

                <label>Model</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Model"
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
                  id="avgtheory"
                  value={avgoftheory}
                  readOnly
                />
                <label>Avg of Assignment</label>
                <input
                  type="number"
                  class="inp form-control"
                  placeholder="Avg of Assignment"
                  id="avgassign"
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
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={create}
                  >
                    Submit
                  </button>
                  &#160;&#160;
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={clearfileds}
                  >
                    clear
                  </button>
                  <br></br>
                  <button
                    type="button"
                    className="btn btn-warning"
                    style={{ marginTop: "10px" }}
                    onClick={getdata}
                  >
                    Update
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
