const Joi = require("joi");

//使錯誤訊息以message顯示時更容易理解

//註冊時所需要的資料
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    birthday: Joi.string().required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("student", "instructor"),
  });

  return schema.validate(data); //return boolean
};

//登入時所需要的資料(email, password)
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};


//驗證課程(課程標題, 課程描述, 課程價格)
const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(50).required(),
    description: Joi.string().min(20).required(),
    price: Joi.number().min(10).max(9999).required(),
    courseDate: Joi.string().required(),
    courseTime: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
