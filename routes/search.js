const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
  const ingredient = req.body.search;
  console.log('검색 재료 ' + ingredient);
  db.query(`select * from food_ingredient where ingredient like '%${ingredient}%'`,
    (err, rows) => {
    res.send(rows.recordset);
    }
  );
});
router.post("/Allfood", (req,res) => {
  console.log('allfood');
  db.query(`Select food_name from food_nutrition`,(err,rows) => {
    if(err)
    console.log(err);
    else 
    res.send(rows.recordset);
  })
 // res.send({success:'success'});
})

module.exports = router;
