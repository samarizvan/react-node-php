const express = require("express");
var cors = require("cors");
var async = require("async");
var multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
var mysql = require("mysql");
const csv = require("fast-csv");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "registrartion_test"
});
var pool = mysql.createPool({
  connectionLimit: 100000,
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "registrartion_test"
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection.connect(function(err) {
  if (!err) {
    console.log("Database connection successful !!!");
  } else {
    console.log("Database connection failure !!!");
  }
});

app.get("/", (req, res) => {});

//route for insert data
/*app.post("/insertdraw", (req, res) => {
  let data = {
    displayoption: req.body.displayoption,
    nexttcktoption: req.body.nexttcktoption,
    logooption: req.body.logooption,
    winningtcktoption: req.body.winningtcktoption,
    manualdrawoption: req.body.manualdrawoption,
    midpointoption: req.body.midpointoption
  };
  let sql = "INSERT INTO drawdata_buildoptions SET ?";
  let query = connection.query(sql, data, (err, result) => {
    if (err) {
      res.status = 422;
      //res.json(err);
      return;
    } else {
      res.send("data inserted");
    }

    //res.end(JSON.stringify(someObject));
    //res.status(200).json();
    //return res.json(result);
    //console.log(result);

    //res.end('Completed')
    //res.redirect("insertdraw");
  });
});*/

app.post("/insertdraw", function(req, res) {
  //var connection = mysql.createConnection(credentials);
  //var pool = mysql.createPool(connection);
  let data = {
    displayoption: req.body.displayoption,
    nexttcktoption: req.body.nexttcktoption,
    logooption: req.body.logooption,
    winningtcktoption: req.body.winningtcktoption,
    manualdrawoption: req.body.manualdrawoption,
    midpointoption: req.body.midpointoption
  };
  var query1 = "TRUNCATE TABLE drawdata_buildoptions";
  var query2 = "INSERT INTO drawdata_buildoptions SET ?";

  var return_data = {};

  async.parallel(
    [
      function(parallel_done) {
        pool.query(query1, function(err, result) {
          if (err) return parallel_done(err);
          return_data.table1 = result;
          parallel_done();
        });
      },
      function(parallel_done) {
        pool.query(query2, data, (err, result) => {
          if (err) return parallel_done(err);
          return_data.table2 = result;
          parallel_done();
        });
      }
    ],
    function(err) {
      if (err) console.log(err);
      pool.end();
      res.send(return_data);
    }
  );
});

app.get("/buildsetting", (req, res) => {
  let sql = "SELECT * FROM drawdata_buildoptions LIMIT 1";
  pool.query(sql, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});

app.get("/inthedraw", (req, res) => {
  let sql = "SELECT * FROM drawdata_id ORDER BY id";
  pool.query(sql, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ inTheDrawData: result });
    }
  });
});

app.get("/totalTicket", (req, res) => {
  let sql = "SELECT COUNT(*) AS total FROM drawdata_id";
  pool.query(sql, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});

app.get("/inDraw", (req, res) => {
  let sql = "SELECT * FROM drawdata_id ORDER BY id";
  pool.query(sql, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ indrawdata: result });
    }
  });
});
const directory = "public";

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, "finaldrawdata.csv");
  }
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    let stream = fs.createReadStream("public/finaldrawdata.csv");
    let myData = [];
    let csvStream = csv
      .parse()
      .on("data", function(data) {
        myData.push(data);
      })
      .on("end", function() {
        // remove the first line: header
        console.log(myData);

        var query1 = "TRUNCATE TABLE drawdata_id";
        var query2 =
          "INSERT INTO drawdata_id (location, ticketnumber, ticketname, salesperson) VALUES ?";

        var newpool = mysql.createPool({
          connectionLimit: 100000,
          host: "localhost",
          user: "root",
          password: "admin123",
          database: "registrartion_test"
        });

        async.parallel(
          [
            function(parallel_done) {
              newpool.query(query1, [myData], (error, response) => {
                console.log(error || response);
                parallel_done();
              });
            },
            function(parallel_done) {
              newpool.query(query2, [myData], (error, response) => {
                console.log(error || response);
                parallel_done();
              });
            }
          ],
          function(err) {
            if (err) console.log(err);
            newpool.end();
            //res.send(return_data);
          }
        );
      });
    stream.pipe(csvStream);
    return res.status(200).send(req.file);
  });
});

app.get("/winner", function(req, res) {
  var query1 =
    "INSERT INTO drawdata_winner ( location, ticketnumber, ticketname, salesperson ) SELECT location, ticketnumber, ticketname, salesperson FROM drawdata_id ORDER BY RAND() LIMIT 1";

  //var query1 = "SELECT * FROM drawdata_id ORDER BY RAND() LIMIT 1";

  //var query2 = "INSERT INTO drawdata_buildoptions SET location = ?, ticketnumber = ?, ticketname = ?, salesperson = ?,";

  var query2 =
    "Delete From drawdata_id Where ticketnumber in (SELECT ticketnumber FROM  drawdata_winner)";

  var query3 = "SELECT * FROM drawdata_winner";

  var query4 =
    "INSERT INTO drawdata_winnerloser ( location, ticketnumber, ticketname, salesperson, wlstatus ) SELECT location, ticketnumber, ticketname, salesperson, 'W' FROM drawdata_winner";

  var query5 = "DELETE FROM drawdata_winner";

  var return_data = {};

  var winnerpool = mysql.createPool({
    connectionLimit: 100000,
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "registrartion_test"
  });

  async.parallel(
    [
      function(parallel_done) {
        winnerpool.query(query1, (error, response) => {
          console.log(error || response);
          parallel_done();
        });
      },
      function(parallel_done) {
        winnerpool.query(query2, (error, response) => {
          console.log(error || response);
          parallel_done();
        });
      },
      function(parallel_done) {
        winnerpool.query(query3, (error, response) => {
          console.log(error || { drawWinnerData: response });
          parallel_done();
        });
      },
      function(parallel_done) {
        winnerpool.query(query4, (error, response) => {
          console.log(error || response);
          parallel_done();
        });
      },
      function(parallel_done) {
        winnerpool.query(query5, (error, response) => {
          console.log(error || response);
          parallel_done();
        });
      }
    ],
    function(err) {
      if (err) console.log(err);
      winnerpool.end();
      //res.send(return_data);
    }
  );
});

app.listen(8080);
console.log("App listening at port:8080");
