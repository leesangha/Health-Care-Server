const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.post("/", (req, res) => {
    const list = req.body.source;
    const user_no = req.body.user_no;

    console.log(list);
    console.log(user_no); 
    db.query(`remove_hate_food '${user_no}' , '${list}' `,(err,rows) =>{

        res.send({success: 'success', user_no:user_no});
    })

  
 });


module.exports = router;