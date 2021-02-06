const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type:String, required:true, unique:true },
  img: {
    front: { type:String, required:true },
    back: { type:String, required:true },
  },
  cardx: {type:String, required:true},
  cardy: {type:String, required:true},
  cardwidth: {type:String, required:true},
  cardheight: {type:String, required:true},
  photo: {
    x: { type:String, required:true },
    y: { type:String, required:true },
    width: { type:String, required:true }
  },
  front: {
    fields: [String],
    textx: { type:String, required:true },
    texty: { type:String, required:true },
    textwidth: { type:String, required:true },
    fontsize: { type:String, required:true },
    linegap: { type:String, required:true }
  },
  back: {
    fields: [String],
    textx: { type:String, required:true },
    texty: { type:String, required:true },
    textwidth: { type:String, required:true },
    fontsize: { type:String, required:true },
    linegap: { type:String, required:true }
  },
  line: {
    rowwidth: { type:String, required:true},
    rowdash: { type:String, required:true},
    rowspace: { type:String, required:true},
    colwidth: { type:String, required:true},
    coldash: { type:String, required:true},
    colpadding: { type:String, required:true},
  }

});

module.exports = mongoose.model('template',templateSchema)