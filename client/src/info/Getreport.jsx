import React, { useState } from "react";
import {CSVLink} from "react-csv"
import "./Getreport.css"
import axios from "axios"
import { redirect, useNavigate } from "react-router-dom";


const Getreport = () => {
  const navigate = useNavigate();
      const home = ()=>{
        navigate("/")
      }
     const[course1,setcourse1] = useState("")
     const[subjectcode,setsubcode] = useState("")
     const[course2,setcourse2] = useState("")
     const[year2,setyear2] = useState("")
     const[jsondata,setjsondata] = useState([])
     const[jsondata2,setjsondata2] = useState([])
     


   const exportdata1 = async()=>{
   
    if(course1 && subjectcode){
      const data = {
        course1:course1,
        subjectcode:subjectcode
      }
      console.log("clicked");
     axios.post("http://localhost:5000/test1",data).then((result)=>{
      if(result.data.length > 0){
        console.log("clicked2");
       setjsondata(result.data)
      }
      
      else{
        alert("No such Data")
      }
     
     })
  
    }
    else{
      alert("Course and Year is Mandatory")
    }
    }

    var  csvreport = {
      filename: 'Report.csv',
      data:jsondata
   }  
   const exportdata2 = async()=>{
   
    if(course2 && year2){
      const data = {
        course2:course2,
        year2:year2
      }
     axios.post("http://localhost:5000/test2",data).then((result)=>{
      if(result.data.length > 0){
       setjsondata2(result.data)
      }
      
      else{
        alert("No such Data")
      }
     
     })
    }
    else{
      alert("Course and Year is Mandatory")
    }
    }

 
   var  csvreport2 = {
    filename: 'Report.csv',
    data:jsondata2
 } 
    
  return (
   
    <div className="content">
    <div className="row">
      
      <div className="col-6">
      <form  autocomplete="off">
      <div class="col-sm-3 col-md-8 col-lg-11 mx-auto">
      <div class="card border-0 shadow rounded-4 my-4">
        <div class="card-body p-4 p-sm-4">
          
            <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-secondary">Get Report by Course and Subject Code</h5>
            <div class="form-floating mb-2" style={{marginLeft:"25%"}}>
              <input type="text" class="form-control" id="floatingInput"   
              name = "name" onChange={(e)=>{setcourse1(e.target.value)}} value = {course1}
              /> 
              <label for="floatingInput">Course</label>
            </div>
            <div class="form-floating mb-2" style={{marginLeft:"25%" }}>
              <input type="text" class="form-control" id="floatingInput" 
              name = "name" onChange={(e)=>{setsubcode(e.target.value)}} value = {subjectcode}
              /> 
              <label for="floatingInput">Subject Code</label>
            </div><br></br>
            
        
            <div style={{marginLeft:"35%"}}>
            <button class="btn btn-success  text-uppercase fw-bold" type="button" onClick={exportdata1}
            
            >Export Report </button>
          </div>
          {
            jsondata.length > 0 &&(
            <span className="download btn btn-warning">  <CSVLink {...csvreport}>Click here to download</CSVLink> </span>
            )
          }
          
          
        </div>
      </div>
    </div>
        </form>
       </div>
       <div className="col-6">
      <form >
      <div class="col-sm-3 col-md-8 col-lg-11 mx-auto">
      <div class="card border-0 shadow rounded-4 my-4">
        <div class="card-body p-4 p-sm-4">
          
            <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-secondary">Get Report by Course and year</h5>
            <div class="form-floating mb-2" style={{marginLeft:"25%"}}>
              <input type="text" class="form-control" id="floatingInput"  
              name = "name" onChange={(e)=>{setcourse2(e.target.value)}} 
              /> 
              <label for="floatingInput">Course</label>
            </div>
            <div class="form-floating mb-2" style={{marginLeft:"25%"}}>
              <input type="number" class="form-control" id="floatingInput" style={{width:"70%"}}
              name = "name" onChange={(e)=>{setyear2(e.target.value)}} 
              /> 
              <label for="floatingInput">Year</label>
            </div><br></br>
            
        
            <div style={{marginLeft:"35%"}}>
            <button class="btn btn-success  text-uppercase fw-bold" type="button" onClick={exportdata2}
            
            >Export Report </button>
          </div>
          {
            jsondata2.length > 0 &&(
            <span className="download btn btn-warning">  <CSVLink {...csvreport2}>Click here to download</CSVLink> </span>
            )
          }
          
        </div>
        
      </div>
    </div>
    <button className="btn btn-primary" style={{marginLeft:"-40px", marginTop:"80px"}} onClick={home}>Back</button>
        </form>
       </div>
       </div> </div>


     
  );
};

export default Getreport;
