const express = require("express");
const db = require("../dbconnection");
const { predictPreference, predictAllFoodPreference } = require("../predictPreference");

const router = express.Router();

router.post("/nutrition", (req, res) => {
  db.query(`read_user_nutrition'${req.body.userNumber}'`,
    (err, rows) => {
    if (err) console.log("Nutrition 정보를 가져오는데 실패했습니다.");
    else {
      res.send(rows.recordsets[0][0]);
    }
  });
});

router.post("/intake_week", (req, res) => {
  db.query(`read_user_week_nutrition'${req.body.userNumber}'`,
    (err, rows) => {
    if (err) console.log("Intake 정보를 가져오는데 실패했습니다.");
    else {
      res.send(rows.recordsets[0]);
    }
  });
});

router.post("/intake", (req, res) => {
  db.query(`read_user_today_nutrition'${req.body.userNumber}'`,
    (err, rows) => {
    if (err) console.log("Intake 정보를 가져오는데 실패했습니다.");
    else {
      res.send(rows.recordsets[0][0]);
    }
  });
});

router.post('/preference/main', (req, res) => {
  const userNumber = req.body.userNumber;
  db.query('read_main_food_preference', async (err, result) => {
    let userPreferences = result.recordset;
    if (err || userPreferences === undefined) {
      res.send({ err: "Null Preference Error" });
    } else {
      const preferences = userPreferences.map(userPreference => Object.values(userPreference));
      let foodNumberList = Object.keys(userPreferences[0]);
      foodNumberList = foodNumberList.map(s => Number(s.slice(3, s.length)));

      const predicted = await predictPreference(preferences, foodNumberList, userNumber);
      res.send(predicted);
    }
  });
});

router.post('/preference/all', (req, res) => {
  const userNumber = req.body.userNumber;
  db.query('read_user_preference', async (err, result) => {
    let userPreferences = result.recordset;
    if (err || userPreferences === undefined) {
      res.send({ err: "Null Preference Error" });
    } else {
      let preference = userPreferences.map((object) => {
        const values = Object.values(object);
        return values.slice(1, values.length);
      });
      const predicted = await predictAllFoodPreference(preference, userNumber);
      res.send(predicted);
    }
  });
});

router.post("/foodLoss", (req, res) => {
  const userNumber = req.body.userNumber;
  db.query(`calculate_nutrition"${userNumber}"`, (err, result) => {
    if (err) {
      console.error("음식 오차함수 계산에 실패했습니다.");
      return;
    }
    const loss = result.recordset.map(({result}) => 100 / result);
    res.send(loss);
  });
});

module.exports = router;
