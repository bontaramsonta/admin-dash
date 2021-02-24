const router = require('express').Router();
const Institution = require('../models/Institution')
const studentSchema = require('../models/Student')
const mongoose = require('mongoose');
const checkAuth = require('../helper/checkAuth')

// add a institution
router.post('/add',checkAuth,(req,res,next)=>{
  // auth and validation
  let isValid = req.userData.type=="hod"?true:false
  if(isValid){
    console.log(req.userData.type,isValid);
    const newinstitution = new Institution({
      _id: new mongoose.Types.ObjectId(),
      name: req.userData.institution,
      address: req.body.address,
      subtext: req.body.subtext,
      logo: req.body.logo,
      classes: req.body.classes
    });
    newinstitution.save().then((result)=>{
      console.log(result);
      res.status(201).json({
        "msg":"new institution created",
        "institution":result
      });
    }).catch(err=>{
      next(err);
    })
  }else{
    return res.status(500).json({"msg":"invalid auth"})
  }
})

// edit institution details
// body;{ name || address || subtext || logo }
router.post('/edit',(req,res,next)=>{
  // auth and validation
  let isValid = req.userData.type=="hod"?true:false
  if(isValid){
    // no classes alter
    if(req.body.classes) {
      return res.status(500).json({"msg":"cant alter classes"})
    }
    Institution.findOneAndUpdate({name:req.userData.institution},req.body,(err)=>{
      if(!err) {
        return res.status(200).json({"msg":"institution details added"})
      } else {
        next(err)
      }
    })
  }
})


// add a class and section
router.post('/addclass/:InstitutionName',(req,res,next)=>{
  // validate class data
  if(req.body.classname && req.body.section){
    Institution.findOneAndUpdate({name:req.params.InstitutionName},{$push:{classes:{
      classname:req.body.classname,
      section:req.body.section
    }}},(err,doc)=>{
      if(!err){
        return res.status(201).json({"msg":"class added"})
      }else{
        next(err)
      }
    })
  }else{
    next(err);
  }
})


// edit a student ( not for class and section change )
// requires:
// body:{ institutionName, class, section, rollno, new }
// 'new': { data to change }
router.post('/student/edit',(req,res,next)=>{
  // check input
  if(req.body.class && req.body.section && req.body.rollno && req.body.institutionName) {
    let modelName = `${req.body.institutionName}_${req.body.class}${req.body.section}s`
    modelName=modelName.toLocaleLowerCase()
    console.log(modelName);
    let isPresent = false
    // get collection names snippet
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (!err) {
        names.forEach(n=>{
          if(modelName==n.name) {
            console.log(modelName,n.name);
            isPresent=true
          }
        })
        if(isPresent) {
          let model = mongoose.model(modelName,studentSchema)
          model.findOneAndUpdate({rollno:req.body.rollno},req.body.new,(err,doc)=>{
            if(!err) {
              return res.status(200).json({"msg":"student updated"})
            } else {
              return res.status(500).json({"msg":"invalid data"})
            }
          })
        } else {
          return res.status(500).json({"msg":"invalid data"})
        }
      } else {
        next(err);
      }
    })
  }
})

// delete a student
// requires:
// body:{ institutionName, class, section, rollno }
router.post('/student/delete',(req,res,next)=>{
  // check input
  if(req.body.class && req.body.section && req.body.rollno && req.body.institutionName) {
    let modelName = `${req.body.institutionName}_${req.body.class}${req.body.section}s`
    modelName=modelName.toLocaleLowerCase()
    console.log(modelName);
    let isPresent = false
    // get collection names snippet
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (!err) {
        names.forEach(n=>{
          if(modelName==n.name) {
            isPresent=true
          }
        })
        if(isPresent) {
          let model = mongoose.model(modelName,studentSchema)
          model.findOneAndDelete({rollno:req.body.rollno},(err,doc)=>{
            if(!err) {
              return res.status(200).json({"msg":"student deleted"})
            } else {
              return res.status(500).json({"msg":"invalid data"})
            }
          })
        } else {
          return res.status(500).json({"msg":"invalid data"})
        }
      } else {
        next(err);
      }
    })
  }
})

// ✅ get an institution details
router.get('/get/:institution',(req,res,next)=>{
  Institution.findOne({code:req.params.institution_code},(err,doc)=>{
    if(!err) {
      return res.status(200).json(doc)
    } else {
      next(err)
    }
  })
})

// get all institution names
router.get('/getall',(req,res,next)=>{
  Institution.find({},{_id:0,name:1},(err,doc)=>{
    if(!err) {
      return res.status(200).json(doc)
    } else {
      next(err)
    }
  })
})

// ✅ get a student
router.post('/student/get',(req,res,next)=>{
  // check input
  if(req.body.class && req.body.section && req.body.rollno && req.body.institutionName) {
    let modelName = `${req.body.institutionName}_${req.body.class}${req.body.section}s`
    modelName=modelName.toLocaleLowerCase()
    console.log(modelName);
    let isPresent = false
    // get collection names snippet
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (!err) {
        names.forEach(n=>{
          if(modelName==n.name) {
            console.log(modelName,n.name);
            isPresent=true
          }
        })
        if(isPresent) {
          let model = mongoose.model(modelName,studentSchema)
          model.findOne({rollno:req.body.rollno},req.body.new,(err,doc)=>{
            if(!err) {
              return res.status(200).json(doc)
            } else {
              return res.status(500).json({"msg":"invalid data"})
            }
          })
        } else {
          return res.status(500).json({"msg":"invalid data"})
        }
      } else {
        next(err);
      }
    })
  }
})

// ✅ add a student (modified)
// body:{ class, section, || ... }
router.post('/student/add/new',checkAuth,(req,res,next)=>{
  console.log("hit");
  Institution.findOne({code:req.userData.institution_code},(err,doc)=>{
    console.log(doc);
    if(!err){
      // check if there is class and section
      if(req.body.class && req.body.section) {
        // valid class in Institution
        if(doc.classes.some(d=>d.classname==req.body.class && d.section==req.body.section)) {
          let modelName = `${doc.name}_${req.body.class}${req.body.section}`
          console.log(modelName);
          let model = mongoose.model(modelName,studentSchema)
          const newstudent = new model({
            _id: new mongoose.Types.ObjectId(),
            name:req.body.name,
            rollno:req.body.rollno,
            dob:req.body.dob,
            bloodGroup:req.body.bloodgrp,
            father:req.body.father,
            address:req.body.address,
            img:req.body.img
          })
          newstudent.save().then((result)=>{
            // console.log(result);
            res.status(201).json({"msg":"new student created"});
          }).catch(err=>{
            next(err);
          })
        } else {
          return res.status(500).json({"msg":"invalid data provided"})
        }
      } else {
        return res.status(500).json({"msg":"invalid institution details"})
      }
    }
  })
})


// get students in a class (without img)
// body: { institution, class, section }
router.post('/student/getfromclass',(req,res,next)=>{
  // validate
  if(req.body.institution && req.body.class && req.body.section){
    let modelName = `${req.body.institution}_${req.body.class}${req.body.section}s`
    modelName = modelName.toLocaleLowerCase()
    let isPresent = false
    // get collection names snippet
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (!err) {
        names.forEach(n=>{
          if(modelName==n.name) {
            isPresent=true
          }
        })
        if(isPresent) {
          let model = mongoose.model(modelName,studentSchema)
          model.find({},{__v:0,_id:0,img:0},(err,doc)=>{
            if(!err) {
              return res.status(200).json(doc)
            } else {
              return res.status(500).json({"msg":"invalid data"})
            }
          })
        } else {
          return res.status(500).json({"msg":"invalid data"})
        }
      } else {
        next(err);
      }
    })
  }else{
    return res.status(500).json({"msg":"invalid data"})
  }
})
module.exports = router