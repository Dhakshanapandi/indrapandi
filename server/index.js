import express from "express";
const app = express();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var data_exporter = require("json2csv").Parser;

import cors from "cors";
import mysql from "mysql2";
app.use(cors());

app.use(express.json());

var mysqlconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "internal",
});

mysqlconnection.connect((err) => {
  if (!err) console.log("Connection Successfull");
  else console.log("connection Failed" + err);
});

app.listen(5000, () => {
  console.log("listening on 5000");
});
app.post("/export1", (req, response) => {
  //  mysqlconnection.query(`SELECT * FROM marks WHERE (course = '${req.body.course1}' AND '${req.body.year1}');`,(err,data)=>{
  mysqlconnection.query("SELECT * FROM marks;", (err, data) => {
    if (data.length > 0) {
      console.log("true" + data);
      var mysql_data = JSON.parse(JSON.stringify(data));
      //convert JSON to CSV Data
      console.log("mysqldata" + mysql_data);
      var file_header = ["First Name", "Last Name", "Age", "Gender"];

      var json_data = new data_exporter({ file_header });

      var csv_data = json_data.parse(mysql_data);
      console.log("mysqldata" + json_data);
      response.setHeader("Content-Type", "text/csv");

      response.setHeader(
        "Content-Disposition",
        "attachment; filename=sample_data.csv"
      );

      response.status(200).end(csv_data);
    } else {
      response.send("No Such Data");
      console.log("false");
    }
  });
});

app.post("/add", (req, res) => {
  const {
    registerno,
    course,
    year,
    subjectcode,
    avgtheory,
    avgassignment,
    attendance,
    seminar,
    internal_marks,
  } = req.body;
  console.log(req.body);
  var sqlinsert =
    "INSERT INTO marks(registerno,course, year,subjectcode, avgtheory, avgassignment, attendance, seminar, internal_marks) VALUES (?,?,?,?,?,?,?,?,?)";
  mysqlconnection.query(
    sqlinsert,
    [
      registerno,
      course,
      year,
      subjectcode,
      avgtheory,
      avgassignment,
      attendance,
      seminar,
      internal_marks,
    ],
    (err, result) => {
      if (!err)
      {
        res.send(result);
        console.log(result);
      }
     else
     {res.send(err);
    console.log(err);} 
    }
  );
});

app.get("/export1", function (request, response, next) {
  mysqlconnection.query(
    "SELECT * FROM marks WHERE (course)",
    function (error, data) {
      var mysql_data = JSON.parse(JSON.stringify(data));

      //convert JSON to CSV Data

      var file_header = ["First Name", "Last Name", "Age", "Gender"];

      var json_data = new data_exporter({ file_header });

      var csv_data = json_data.parse(mysql_data);

      response.setHeader("Content-Type", "text/csv");

      response.setHeader(
        "Content-Disposition",
        "attachment; filename=sample_data.csv"
      );

      response.status(200).end(csv_data);
    }
  );
});

app.post("/test",(req, res) => {
  console.log(req.body);
  mysqlconnection.query(
    `SELECT * from marks WHERE (course = '${req.body.course1}' AND year = '${req.body.year1}');`,
    (err, data) => {
      console.log(data);
      res.status(200).json(data);
    }
  );
});

app.get("/getdata/:id", (req, res) => {
  mysqlconnection.query(
    `SELECT * FROM marks where registerno = ${req.params.id}`,
    (err, data) => {
      var newObj = Object.assign(
        {},
        ...data.map((item) => ({ [item.key]: item.value }))
      );
      console.log("newobj", newObj);
      if (data.length == 1) {
        console.log(data);
        res.status(200).send(data);
      } else {
        res.status(400).json("No such Register Number");
      }
    }
  );
});


app.put("/update",(req,res)=>{
  var sql_query = `UPDATE marks SET course = '${req.body.course}' where registerno =${req.body.registerno} `
  mysqlconnection.query(sql_query,(err,result)=>{
    console.log(result);
  })
})