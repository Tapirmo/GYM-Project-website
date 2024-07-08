const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//連結到MongoDB資料庫
mongoose
  .connect("mongodb://localhost:27017/gymDB")
  .then(() => {
    console.log("連結到gymDB...");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares (post使用)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute); //使用者登入或註冊
app.use(
  "/api/course",
  passport.authenticate("jwt", { session: false }),
  courseRoute
); //查閱課程需經過驗證

app.listen(8080, () => {
  console.log("server正在聆聽port 8080...");
});
