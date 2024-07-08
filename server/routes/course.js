const router = require("express").Router();
const Course = require("../model").course;
const courseValidation = require("../validation").courseValidation;

//middleware
router.use((req, res, next) => {
  console.log("course route正在接受一個request...");
  next();
});

//獲得系統中的所有課程 (登入後才可訪問)
router.get("/", async (req, res) => {
  console.log("正在獲得所有課程");
  try {
    //populate=>mongoose內的query object(thenable object)
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用講師id尋找課程
router.get("/instructor/:_instructor_id", async (req, res) => {
  try {
    let { _instructor_id } = req.params;
    let courseFound = await Course.find({ instructor: _instructor_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用學生id來尋找註冊過的課程
router.get("/student/:_student_id", async (req, res) => {
  try {
    let { _student_id } = req.params;
    let courseFound = await Course.find({ students: _student_id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用課程id尋找課程
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用課程名稱尋找課程
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let courseFound = await Course.find({ title: name })
      .populate("instructor", ["email", "username"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//讓學生透過課程id來註冊新課程
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();

    // 檢查學生是否已經註冊過這門課程
    if (course.students.includes(req.user._id)) {
      return res.status(400).send("您已經註冊過這門課程了");
    }

    //jwt
    course.students.push(req.user._id);
    await course.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.send(e);
  }
});

//讓學生透過課程id來退出課程
router.post("/quit/:_id", async(req, res)=>{
  console.log("已退出課程")
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();
    //jwt
    course.students.pop(req.user._id);
    console.log([course.students]);
    await course.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.send(e);
  }
})

//新增課程
router.post("/", async (req, res) => {
  //驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有運動教練才能發佈新課程。若您已經是教練，請透過教練帳號登入。");
  }
  let { title, description, price, courseDate, courseTime } = req.body;
  try {
    let newCouse = new Course({
      title,
      description,
      price,
      courseDate,
      courseTime,
      instructor: req.user._id,
    });
    let savedCourse = await newCouse.save();
    return res.send({ msg: "新的運動課程已保存。", savedCourse });
  } catch (e) {
    return res.status(500).send("發生了一些錯誤，無法創建課程。");
  }
});

//修改課程
router.patch("/:_id", async (req, res) => {
  console.log("正在修改課程，課程ID:", req.params._id);
  console.log("請求體:", req.body);

  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let { _id } = req.params;
  if (!_id) {
    return res.status(400).send({ message: "課程 ID 不能為空" });
  }
  try {
    let courseFound = await Course.findOne({ _id });
    console.log("找到的課程:", courseFound);
    if (!courseFound) {
      return res
        .status(400)
        .send({ message: "找不到課程。無法更新課程內容。" });
    }

    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      console.log("更新後的課程:", updatedCourse);
      return res.send({
        message: "課程已被更新成功",
        updatedCourse,
      });
    } else {
      return res.status(403).send({ message: "只有此課程教練才能編輯課程。" });
    }
  } catch (e) {
    console.error("更新課程時發生錯誤:", e);
    return res.status(500).send({ message: e.message });
  }
});

//刪除課程
router.delete("/:_id", async (req, res) => {
  console.log("正在刪除數據!");
  //驗證數據符合規範
  // let { error } = courseValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  //確認課程存在
  try {
    console.log("正在刪除數據2");
    let courseFound = await Course.findOne({ _id });
    // console.log(courseFound);
    if (!courseFound) {
      return res.status(400).send("找不到課程。無法刪除課程內容。");
    }

    //使用者必須是此課程講師，才能刪除課程
    if (courseFound.instructor.equals(req.user._id)) {
      let deleteCourse = await Course.deleteOne({ _id }).exec();
      return res.send({
        meg: "課程已被成功刪除。",
        deleteCourse,
      });
    } else {
      return res.status(403).send("只有此課程教練才能刪除課程。");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
