const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
    const userNumber = req.body.userNumber;
    const foodNumber = req.body.foodNumber;
    const score = req.body.score;
    db.query(
      `change_user_preference_by_score '${userNumber}','${foodNumber}','${score}'`,
      (err, rows) => {
        if (err) {
          console.error("점수 바꾸기가 오류발생");
          console.log(userNumber);
          console.log(foodNumber);
          console.log(score);
        }
        else {
          console.log('성공');
          res.send(rows.recordsets);
        }
      }
    );
  });

module.exports = router;