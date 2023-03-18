import express from "express";
const app = express()
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var data_exporter = require('json2csv').Parser;
import cors from "cors";
import mysql from "mysql2"
app.use(cors())
app.use(express.json())

var mysqlconnection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",  
  database:"internal"

})

mysqlconnection.connect((err)=>{
  if(!err) console.log("Connection Successfull");
  else console.log("connection Failed"+ err);
}) 

app.listen(5000,()=>{
  console.log("listening on 5000");
}) 

app.post("/add",(req,res)=>{
  const {registerno, course, subjectcode, avgtheory, avgassignment, attendance, seminar, internal_marks} = req.body
  console.log(req.body);
  var sqlinsert = "INSERT INTO marks(registerno, course, subjectcode, avgtheory, avgassignment, attendance, seminar, internal_marks) VALUES (?,?,?,?,?,?,?,?)"
  mysqlconnection.query(sqlinsert,[registerno,course,subjectcode,avgtheory,avgassignment,attendance,seminar,internal_marks],(err,result)=>{
    if(!err) res.send(result)
    else res.send(err)
  })
})


app.get('/export', function(request, response, next){

  mysqlconnection.query('SELECT * FROM marks', function(error, data){

      var mysql_data = JSON.parse(JSON.stringify(data));

      //convert JSON to CSV Data

      var file_header = ['First Name', 'Last Name', 'Age', 'Gender'];

      var json_data = new data_exporter({file_header});

      var csv_data = json_data.parse(mysql_data);

      response.setHeader("Content-Type", "text/csv");

      response.setHeader("Content-Disposition", "attachment; filename=internal_marks.csv");

      response.status(200).end(csv_data);

  });

});