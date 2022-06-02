var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

/* GET home page. */

router.get('/', function (req, res) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    let sql = `SELECT * FROM todolist`;
    req.app.locals.con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
      res.send(result);
    });
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body.input);
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }
    let todo = req.body.input;
    let sql = `INSERT INTO todolist (todolist) VALUE ("${todo}")`;
    req.app.locals.con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log('result', result);
    });
  });
  res.json({ message: 'success' });
});

router.delete('/:id', function (req, res) {
  let id = req.params.id;

  var sql = `DELETE FROM todolist WHERE id = "${id}"`;
  req.app.locals.con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json({ message: 'deleted' });
  });
});

module.exports = router;
