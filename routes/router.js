const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.get("/api/isLogin", (req, res) => {
  const userId = req.query.id;
  const userPw = req.query.pw;

    db.query(`select count(*) as cnt from getuser where id='${userId}' and pw ='${userPw}'`,
      (err, rows, fields) => {
        console.log(rows[0].cnt);
        res.send({ rs: rows[0].cnt });
      }
    );
});

module.exports = router;
