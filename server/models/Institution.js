const mongoose = require('mongoose');

const InstitutionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: {type:String, required:true, unique:true},
  name: {type:String, required:true},
  address: {type:String, required:true},
  subtext: {type:String, required:true},
  logo: {type:String},
  classes:[{
    _id:false,
    classname:"String",
    section:"String"
  }]
});

module.exports = mongoose.model('Institution',InstitutionSchema);