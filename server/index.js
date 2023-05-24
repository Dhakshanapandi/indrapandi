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
    subjectc,
    avgtheory,
    avgassignment,
    avgofmodel,
    semester,
    attendance,
    seminar,
    internal_marks,
    staff,
    t1,
    t2,
    assign1,
    assign2,
    assign3,
    model,
    year,
  } = req.body;
 
  console.log(req.body); 
  var sqlinsert =
    "INSERT INTO marks(registerno, course, year, subjectcode, avgtheory, avgassignment, attendance, seminar, internal_marks, assign1, assign2, assign3, t1, t2, model, avgmodel, semester, staffname) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  mysqlconnection.query(
    sqlinsert,
    [
      registerno,
      course,
      year,
      subjectc,
      avgtheory,
      avgassignment,
      attendance,
      seminar,
      internal_marks,
      assign1,
      assign2,
      assign3,
      t1,
      t2,
      model,
      avgofmodel,
      semester,
      staff,
    ],
    (err, result) => {
      if (!err) {
        res.send(result);
        console.log(result);
      } else {
        res.send(err);
        console.log(err);
      }
    }
  );
});

app.post("/test1", (req, res) => {
  console.log(req.body);
  mysqlconnection.query(
    `SELECT * from marks WHERE (course = '${req.body.course1}' AND subjectcode = '${req.body.subjectcode}');`,
    (err, data) => {
      console.log(data);
      res.status(200).json(data);
    }
  );
});
app.post("/test2", (req, res) => {
  console.log(req.body);
  mysqlconnection.query(
    `SELECT * from marks WHERE (course = '${req.body.course2}' AND year = '${req.body.year2}');`,
    (err, data) => {
      console.log(data);
      res.status(200).json(data);
    }
  );
});

app.get("/getdata/:id", (req, res) => {
  mysqlconnection.query(
    `SELECT * FROM marks where registerno = '${req.params.id}'`,
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
//registerno, course, 
app.put("/update", (req, res) => {
  console.log(req.body);
  var sql_query = `UPDATE marks SET course = '${req.body.course}',year=${req.body.year}, subjectcode='${req.body.subjectc}', avgtheory=${req.body.avgtheory}, avgassignment=${req.body.avgassignment}, attendance=${req.body.attendance}, seminar=${req.body.seminar}, internal_marks=${req.body.internal_marks}, assign1=${req.body.assign1}, assign2=${req.body.assign2}, assign3=${req.body.assign3}, t1=${req.body.t1}, t2=${req.body.t2}, model=${req.body.model}, avgmodel=${req.body.avgofmodel}, semester=${req.body.semester}, staffname='${req.body.staff}' where registerno ='${req.body.registerno}' `;
  mysqlconnection.query(sql_query, (err,result) => {
    
    
    if(result.changedRows > 0){
      return res.status(200).json(true)
    }
    return res.status(200).json(false)
  });
});
