const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  db.query(`Select * from user_information where user_id='${id}' AND user_password = '${password}'`,
    (err, rows) => {
      if (rows === undefined) res.send({ err: "error" });
      else if (rows.recordset[0] === undefined || err)
        res.send({ err: "error" });
      else {
        res.send({ user: rows.recordsets[0] });
      }
    }
  );
});

module.exports = router;
