
var mysql = require('mysql');
//
// var dbConfig = {
//     host : "clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com",
//     user : "anetfotoa",
//     password : "a4415588",
//     port: 3306,
//     database : "clova",
//     connectionLimit : 50
// };



// var sql = 'SELECT * FROM keywords';
// conn.query(sql, function(err, rows, fields){//row는 '행'이라는 뜻이다.
//   if(err){
//       console.log(err);
//   } else {
//       for(var i = 0; i < rows.length; i++){
//         console.log(rows[i].title + " : " + rows[i].description);
//       }
//   }
// });

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com",
  user: "anetfotoa",
  password: "a4415588",
  database: "clova"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT title FROM keywords", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    console.log("성공");
  });
});
//
// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//   host: "clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com",
//   user: "anetfotoa",
//   password: "a4415588",
//   database: "clova"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE lic", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
//
// var sql = 'INSERT INTO lic (title, description, author) VALUES("Express", "Web framework", "jacob")';
// conn.query(sql, function(err, rows, fields){
//     if(err) console.log(err);
//     console.log(rows.insertId); // insertId는 auto_increment설정해 놓았다.(고유한 식별자를 알아낼 수 있는 방법이다.)
// });

//license테이블 생성
// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//   host: "clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com",
//   user: "anetfotoa",
//   password: "a4415588",
//   database: "clova"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE license (name VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//license테이블에 insert
// var mysql = require('mysql');
//
// var con = mysql.createConnection({
//   host: "clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com",
//   user: "anetfotoa",
//   password: "a4415588",
//   database: "clova"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO license VALUES ('1급')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });





// var con = mysql.createConnection({
//   host: "clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com",
//   user: "anetfotoa",
//   password: "a4415588",
//   database: "clova"
// });
//
// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM license", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

/////
