import mysql from 'mysql';
import config from './webpack.config';
import express from 'express';
import bodyparser from "body-parser";
var app = express();
var router = express.Router();
app.use(bodyparser.urlencoded({extended:false}));


app.get('/', (req, res) => {
   res.sendFile( __dirname + "/index.html");
})

app.get('/process_get' , (req,res) => {
  var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "saket@123",
    database: "database1"
  });


	con.connect(function(err) {
		if (err) throw err;
    console.log("Connected");
  });
    var q="SELECT * FROM table1";
		con.query(q, function (err, data, fields) {
		if (err) throw err;
    console.log(data);
    res.send(data);

  });

});

app.post('/process_post' ,(req,res) =>{
  var con1 = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "saket@123",
    database: "database1"
  });
   console.log(req.body.name);


	con1.connect(function(err) {
		if (err) throw err;
    console.log("Connected");
  });

  var q="insert into table1(name,place,animal,thing)values('"+req.body.name+"','"+req.body.place+"','"+req.body.animal+"','"+req.body.thing+"')";
		con1.query(q, function (err, data, fields) {
		if (err) throw err;
		console.log(data);
		res.redirect("/");
  });

});

app.get('/delete/:id' ,(req,res) =>{
  var con2 = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "saket@123",
    database: "database1"
  });


	con2.connect(function(err) {
		if (err) throw err;
    console.log("Connected");
  });

  var q="delete from table1 where id="+req.params.id;
		con2.query(q, function (err, data, fields) {
		if (err) throw err;
		console.log(data);
	   	res.redirect("/");
  });

});




app.listen(8080,() =>{
  console.log("Success...Server is Running at 8080..!!");
});
