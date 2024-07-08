const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../model").user;
const jwt = require("jsonwebtoken"); //驗證使用者身分

//middleware
router.use((req, res, next) => {
  console.log("正在接收一個跟auth routes的請求");
  next();
});

//Postman test
router.get("/testAPI", (req, res) => {
  return res.send("成功連結authRoute...");
});

//註冊
router.post("/register", async (req, res) => {
  //確認數據是否符合規範
  console.log(req.body);
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此信箱已被註冊過。");

  // 製作新用戶
  let { email, username, password, role, birthday } = req.body;
  let newUser = new User({ email, username, password, role, birthday });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "成功儲存新用戶。",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存用戶");
  }
});

//使用JWT來撰寫登入功能程式碼
router.post("/login", async (req, res) => {
  console.log("成功登入!")
  //確認數據是否符合規範
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否被註冊過
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(401).send("無法找到使用者。請確認信箱是否正確。");
  }

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);
    if (isMatch) {
      // 製作json web token，_id=>mongodb所製作出來的id
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      //jwt 簽名的內容
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "成功登入",
        token: "JWT " + token, //"JWT "記得一定要寫空白鍵，不然會有bug
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

//修改使用者資料(目前只能從postman上修改)，未開放給使用者
router.patch("/:_id", async (req, res) => {
  //確認數據是否符合規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  try {
    let { username, birthday, email, password } = req.body;
    let newData = await User.findOneAndUpdate(
      { _id },
      { username, birthday, email, password ,role },
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );
    res.send({ msg: "已成功修改資料!", updatedDate: newData });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});


module.exports = router;
