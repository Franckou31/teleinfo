var express = require('express');
var mysql      = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 5,
  host     : '192.168.1.20',
  user     : 'root',
  password : 'bidule_@31',
  database : 'mysql'
});

function lpad(value, car, length) {
  return String(car + value).slice(-length);
}
function getDateHeureDebut(date, offset) {
  var da = date.getTime() - (offset * 24 * 3600 * 1000);
  var db = new Date(da);

  return db.getFullYear() +
       "-" + lpad(db.getMonth()+1, "0", 2) +
       "-" + lpad(db.getDate(), "0", 2) +
       " 00:00:00";
}
function getDateHeureFin(date) {
  var da = date.getFullYear() +
       "-" + lpad(date.getMonth()+1, "0", 2) +
       "-" + lpad(date.getDate(), "0", 2) +
       " 23:59:59";
  var db = new Date(da).getTime() + 3600000;
  var dc = new Date(db);
  return dc.getFullYear() +
       "-" + lpad(dc.getMonth()+1, "0", 2) +
       "-" + lpad(dc.getDate(), "0", 2) +
       " " + lpad(dc.getHours(), "0", 2) +
       ":" + lpad(dc.getMinutes(), "0", 2) +
       ":" + lpad(dc.getSeconds(), "0", 2);
}

var app = express();
app.use(express.static('../client/app'));

app.get('/q7days', function (req, res) {
  var nbdays = parseInt(req.query.nbdays)-1;
  processQuery(req, res, nbdays);
});

function processQuery(req, res, offset) {
  var dd = req.query.d;
  var d = "";
  if (dd =='today') {
      d = new Date();
  } else {
      d = new Date(parseInt(dd));
  }
  var d1 = getDateHeureDebut(d, offset);
  var d2 = getDateHeureFin(d);

  pool.getConnection(function(err, connection) {
    connection.query({
        sql  : 'SELECT * FROM TELEINFO_STATS WHERE date > ? and date < ? order by date',
        values : [d1, d2]
    }, function(err, rows, fields) {
        connection.release();
        if (!err)
    	    res.send('The solution is: ', rows);
    	  else
    	    console.log('Error while performing Query.');
    });
  });
}

app.get('/q1', function (req, res) {
  processQuery(req, res, 0);
});

app.get('/q', function (req, res) {
  var d1 = req.query.d1;
  var d2 = req.query.d2;
  var d3 = req.query.d3;
  console.log('d1 ' + d1);
  console.log('d3 ' + d3);
  pool.getConnection(function(err, connection) {
    connection.query({
        sql  : 'SELECT * FROM TELEINFO_STATS WHERE date > ? and date < ?',
        values : [d1, d2]
    }, function(err, rows, fields) {
        connection.release();
        if (!err)
    	    res.send('The solution is: ', rows);
    	  else
    	    console.log('Error while performing Query.');
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
