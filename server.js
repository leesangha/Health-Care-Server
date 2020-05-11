const express = require("express");
const path = require("path");
const router = require("./routes/router");
const loginRouter = require("./routes/login");
const addUserRouter = require("./routes/addUser");
const foodRouter = require("./routes/food");
const userDataRouter = require("./routes/userData");
const ingredientRouter = require('./routes/search')
const registerRouter = require('./routes/register');
const fileRouter = require("./routes/file");
const evaluateRouter = require("./routes/food_evaluate");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4002;

app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use("/addUser", addUserRouter);
app.use("/process/login", loginRouter);
app.use("/food", foodRouter);
app.use("/userData", userDataRouter);
app.use("/search_ingredient",ingredientRouter);
app.use("/register",registerRouter);
app.use("/file", fileRouter);
app.use("/evaluate",evaluateRouter);

app.use("/", router);

app.listen(PORT, () => {
  console.log("Check out the app at https://localhost:" + PORT);
});
