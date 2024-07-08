const mongoose = require("mongoose");
const { Schema } = mongoose;

//課程course
const courseSchema = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 20,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  courseDate: {
    type: String,
    required: true,
  },
  courseTime: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    //mongoose 內的 primary key
    ref: "User",
    required: true,
  },
  students: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);

