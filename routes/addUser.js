const express = require("express");
const router = express.Router();
const db = require("../dbconnection");

router.use(function addUserRouter(req, res) {
  const address = req.body.address;
  const password = req.body.password;
  const name = req.body.name;
  const age = req.body.age;
  const sex = req.body.sex;

  db.query(`Select * from user_information where user_id ='${address}' AND user_password='${password}'`,
    (err, rows) => {
      //Check User
      if (err) console.log("AddUser error");
      else {
        if (rows.recordset[0] === undefined) {
          //New User Insert
          db.query(`register_user_information '${address}' , '${password}' , '${name}' , '${age}' , '${sex}'`,
            (err,rows) =>{
              if(err){
                console.log('insert error');
                console.log(address);
                console.log(password + name + age + sex);
              } else {
                res.send({ text: "success",
                user_no : rows.recordset[0].user_no
             });
              }
            }
          );
        } else {
          //Already User Inserted
          res.send({ text: "Same User exists" });
        }
      }
    }
  );
});

module.exports = router;
