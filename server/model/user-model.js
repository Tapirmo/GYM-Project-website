const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

//使用者註冊schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  birthday:{
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlengt: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
  },
});

//instance methods
userSchema.methods.isStudent = function () {
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

//使用bcrypt將password 進行hash value
userSchema.methods.comparePassword = async function (password, callback) {
  let result = await bcrypt.compare(password, this.password);
  return callback(null, result);
};

//mongoose middleware
//若使用者為新用戶，或者是正在更改密碼，則將密碼進行雜湊處理
userSchema.pre("save", async function (next) {
  //this 代表 mongoDB 內的 document
  if (this.isNew || this.isModified("password")) {
    //將密碼進行雜湊處理
    const hashValue = await bcrypt.hash(this.password, 10); //salt round
    this.password = hashValue;
  }
  next(); //把控制權交給下一個middleware
});

module.exports = mongoose.model("User", userSchema);