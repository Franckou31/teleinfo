var express = require('express');
var path = require('path');
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
//var d1 = getFirstDateOfMonth(dd);
//var d2 = getLastDateOfMonth(dd);

/**
* Return the start date fo the month
* @param : the month at the format YYYY-MM: eg. "2017-01"
* @return : the timestamp corresponding to the first day of the month
* eg. : the timestamp corresponding to "2017-01-01T00:00:00"
*/
function getFirstDateOfMonth(year_month) {
  var tmp = year_month.split('-')
  return new Date(tmp[0], parseInt(tmp[1])-1, 1, 0, 0, 0).getTime()
}

/**
* Return the last date fo the month
* @param : the month at the format YYYY-MM: eg. "2017-01"
* @return : the timestamp corresponding to the last day of the month
* eg. : the timestamp corresponding to "2017-01-31T23:59:59"
*/
function getLastDateOfMonth(year_month) {
  var tmp = year_month.split('-')
  // (remark : 0 as day = last day)
  return new Date(tmp[0], tmp[1], 0, 23, 59, 59).getTime()
}

/**
* convert a timestamp to a date compliant with mysql
* @param : the timestamp to convert
* @return : date with the format 'YYYY-MM-DD HH:MI:SS'
*/
function toMySQLDate(date) {
  var dd = new Date(date)
  return dd.getFullYear() +
       "-" + lpad(dd.getMonth()+1, "0", 2) +
       "-" + lpad(dd.getDate(), "0", 2) +
       " " + lpad(dd.getHours(), "0", 2) +
       ":" + lpad(dd.getMinutes(), "0", 2) +
       ":" + lpad(dd.getSeconds(), "0", 2)
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
app.use(express.static('../clientReact/dist'));

app.get('/*stat/*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../clientReact/dist', 'index.html'))
})

app.get('/api/q7days', function (req, res) {
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

  console.log('process query ' + d1 + "---------" + d2);

  pool.getConnection(function(err, connection) {
    connection.query({
        sql  : 'SELECT * FROM TELEINFO_STATS WHERE date > ? and date < ? order by date',
        values : [d1, d2]
    }, function(err, rows, fields) {
        connection.release();
        if (!err)
    	    // res.send('The solution is: ', rows);
          res.status(200).send(rows);
    	  else
    	    console.log('Error while performing Query.');
    });
  });
}

function getStat(res, d1, d2) {
  console.log('process query ' + d1 + "---------" + d2);

  pool.getConnection(function(err, connection) {
    connection.query({
        sql  : 'SELECT * FROM TELEINFO_STATS WHERE date > ? and date < ? order by date',
        values : [d1, d2]
    }, function(err, rows, fields) {
        connection.release();
        if (!err)
    	    // res.send('The solution is: ', rows);
          res.status(200).send(rows);
    	  else
    	    console.log('Error while performing Query.');
    });
  });
}


/**
* REST service to get stats of a aprticular month.
* The month is given as the form: "YYYY-MM"
*/
app.get('/api/month', function (req, res) {
  console.log('REQUEST Month');
  var date = req.query.d;

  var d1 = getFirstDateOfMonth(date);
  var d2 = getLastDateOfMonth(date);
  // we add 1 hour as we need first stat of following days
  d2 += (1000 * 3600)
  s_d1 = toMySQLDate(d1);
  s_d2 = toMySQLDate(d2);

  console.log('d1=' + new Date(d1));
  console.log('d2=' + new Date(d2));
  console.log('d3=' + new Date());

  getStat(res, s_d1, s_d2)

});

app.get('/api/q1', function (req, res) {
  console.log('REQUEST Q1');
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
