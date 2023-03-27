import React, { useState } from "react";
import {CSVLink} from "react-csv"
import "./Getreport.css"
import axios from "axios"

const Getreport = () => {

     const[course1,setcourse1] = useState("")
     const[year1,setyear1] = useState("")
     const[jsondata,setjsondata] = useState([])
     


   const exportdata = async()=>{
   
    if(course1 && year1){
      const data = {
        course1:course1,
        year1:year1
      }
      console.log("clicked");
     axios.post("http://localhost:5000/test",data).then((result)=>{
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
   
    
  return (
   
    <div className="content">
    <div className="row">
      
      <div className="col-6">
      <form  autocomplete="off">
      <div class="col-sm-3 col-md-8 col-lg-11 mx-auto">
      <div class="card border-0 shadow rounded-4 my-4">
        <div class="card-body p-4 p-sm-4">
          
            <h5 class="card-title text-center mb-3 fw-bolder fs-10 text-secondary">Get Report by Course and year</h5>
            <div class="form-floating mb-2" style={{marginLeft:"25%"}}>
              <input type="text" class="form-control" id="floatingInput"   
              name = "name" onChange={(e)=>{setcourse1(e.target.value)}} value = {course1}
              /> 
              <label for="floatingInput">Course</label>
            </div>
            <div class="form-floating mb-2" style={{marginLeft:"25%"}}>
              <input type="text" class="form-control" id="floatingInput" 
              name = "name" onChange={(e)=>{setyear1(e.target.value)}} value = {year1}
              /> 
              <label for="floatingInput">Year</label>
            </div><br></br>
            
        
            <div style={{marginLeft:"35%"}}>
            <button class="btn btn-success  text-uppercase fw-bold" type="button" onClick={exportdata}
            
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
              name = "name" onChange={(e)=>{setcourse1(e.target.value)}} 
              /> 
              <label for="floatingInput">Course</label>
            </div>
            <div class="form-floating mb-2" style={{marginLeft:"25%"}}>
              <input type="text" class="form-control" id="floatingInput" 
              name = "name" onChange={(e)=>{setcourse1(e.target.value)}} 
              /> 
              <label for="floatingInput">Year</label>
            </div><br></br>
            
        
            <div style={{marginLeft:"35%"}}>
            <button class="btn btn-success  text-uppercase fw-bold" type="submit"
            
            >Export Report </button>
          </div>
          
        </div>
      </div>
    </div>
        </form>
       </div>
       </div> </div>


     
  );
};

export default Getreport;
