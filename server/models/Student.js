const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type:String, required:true},
  rollno: {type:String,required:true,unique:true},
  dob: {type:String, default:"-"},
  bloodGroup: {type:String, default:"-"},
  father: {type:String, default:"-"},
  address: {type:String, default:"-"},
  img: {type:String, default:"-"},
});

module.exports = studentSchema;