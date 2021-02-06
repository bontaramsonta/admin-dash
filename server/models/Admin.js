const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  phone: { type:String,required:true,unique:true },
  name: { type:String,required:true },
  password: { type:String,required:true },
  loa: { type:String,required:true },
  institution_code: { type:String },
  classes:[{
    _id:false,
    classname:"String",
    section:"String"
  }],
  img: {type:String}
});

module.exports = mongoose.model('admin',adminSchema)