const router = require('express').Router();
const Admin = require('../models/Admin')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const checkAuth = require('../helper/checkAuth')
const Institution = require('../models/Institution');
// create an admin
// body: { password, loa, institution_code, ...}
router.post('/add',(req,res,next)=>{
  // vaildate input
  console.log("hit");
  if(req.body.password && req.body.loa) {
    // password length check
    if(req.body.password.length>7) {
      // hash the password
      bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(!err){
          let basicadmin = {
            name:req.body.name,
            phone:req.body.phone,
            password:hash,
            loa:req.body.loa
          }
          console.log("probably added");
          // LOA based validation
          if(req.body.loa=="staff" && req.body.institution_code){
            // check if provided classes are valid in institution
            Institution.findOne({code:req.body.institution_code},(err,doc)=>{
              if(!err && doc){
                let areClassesValid = true
                req.body.classes.forEach(c=>{
                  if(!doc.classes.some(d=>d.classname==c.classname&&d.section==c.section)){
                    areClassesValid=false
                  }
                })
                if(!areClassesValid){
                  return res.status(500).json({"msg":"invalid data"})
                }
              }else{next(err)}
            })
            const newstaff = new Admin({
              _id: new mongoose.Types.ObjectId(),
              ...basicadmin,
              classes:req.body.classes,
              institution_code:req.body.institution_code
            })
            newstaff.save().then(result=>{
              console.log(result);
              return res.status(200).json({"msg":`added admin with role ${req.body.loa}`})
            }).catch(err=>{
              next(err)
            })
          }
          else if(req.body.loa=="hod"){
            // no validation so far
            const newhod = new Admin({
              _id: new mongoose.Types.ObjectId(),
              ...basicadmin
            })
            newhod.save().then(result=>{
              console.log(result);
              return res.status(200).json({"msg":`added admin with role ${req.body.loa}`})
            }).catch(err=>{
              next(err)
            })
          }else {
            return res.status(500).json({"msg":"invalid loa provided"})
          }
        }else{
          next(err)
        }
      })
    }

  }
})

// get admin
router.get('/get',checkAuth,(req,res,next)=>{
  // input validation
  let isValid = true
  // no validation so far
  if(isValid){
    Admin.findOne({phone:req.userData.phone},{_id:0,__v:0},(err,doc)=>{
      if(!err){
        if(doc){
          return res.status(200).json(doc)
        }else{
          return res.status(500).json({"msg":"invalid data provided"})
        }
      }else{
        next(err)
      }
    })
  }else{
    return res.status(500).json({"msg":"invalid auth"})
  }

})

// admin login
// body: { phone and password }
router.post('/login',(req,res,next)=>{
  if(req.body.phone&&req.body.password)
  {
    Admin.findOne({phone:req.body.phone},(err,doc)=>{
      if(!err&&doc){
        // compare passwords
        bcrypt.compare(req.body.password,doc.password,(err,same)=>{
          if(!err&&same){
            // generate the token
            const token = jwt.sign({
              type:doc.loa,
              _id:doc._id,
              phone:doc.phone,
              institution_code:doc.institution_code,
            },process.env.JWT_KEY,{
              expiresIn:"3h"
            })
            return res.status(200).json({
              msg:"Auth successful",
              token
            });
          }else{
            return res.status(401).json({"msg":"auth failed"})
          }
        })
      }else{
        return res.status(401).json({"msg":"auth failed"})
      }
    })
  }
})

// verify token
router.post('/verify',(req,res,next)=>{
  // body validation
  if(req.body.token){
    jwt.verify(req.body.token,process.env.JWT_KEY,(err,verifyToken)=>{
      if(!err && verifyToken){
        return res.status(200).json({"verified":true,"access":verifyToken.type})
      }else{
        return res.status(200).json({"verified":false})
      }
    })
  }else{
    return res.status(500).json({"msg":"invalid data provided"})
  }
})

module.exports = router