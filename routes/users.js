var express = require('express');
var router = express.Router();
const {userModel} = require('../schemas/userSchema');
const mongoose = require('mongoose');
const {hashPassword,hashCompare,createToken,validate,roleAdminGuard} = require('../common/auth');
const {dbURL} = require('../common/dbConfig');
mongoose.connect(dbURL);

/* GET users listing. */
router.get('/',validate,roleAdminGuard,async function(req, res, next) {
  try{
    let user = await userModel.find();
    res.send({
      user,
      message:'data fetched successfully'
    });
  }catch(err){
    res.send({
      message:"internal server error",
      err
    })
  }
});

// router.get('/:id',async function(req, res, next) {
//   let user = await userModel.findOne({_id:req.params.id});
//   res.send({
//     user,
//     message:'data fetched successfully'
//   });
// });

router.post('/signup',async(req,res)=>{
  try{
    let user = await   userModel.findOne({email:req.body.email})
    if(!user){
      let hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      let user = await userModel.create(req.body);
      res.status(201).send({
        message:"signedIn successfully",
        hashedPassword
      })
    }else{
      res.status(400).send({
        message:'user already exists!'
      })
    }
  }catch(err){
    res.status(500).send({
      message : 'Internal server error',
      err
    })
  }
})

router.post('/login',async(req,res)=>{
  try{
    let user = await userModel.findOne({email:req.body.email})
    if(user){
      if(await hashCompare(req.body.password,user.password)){
        let token = await createToken({
          name:user.name,
          email:user.email,
          id:user._id,
          role:user.role
        })
        res.status(200).send({
          message:"signup successfully",
          token
        })
      }else{
        res.status(402).send({
          message:'Invalid Credential'
        })
      }
    }else{
      res.status(400).send({
        message:'user does not exists!'
      })
    }
  }catch(err){
    console.log(err);
    res.status(500).send({
      message : 'Internal server error',
      err
    })
  }
})

router.delete('/:id',async(req,res)=>{
  try{
    let user = await userModel.findOne({_id:req.params.id});
    if(user){
      let user = await userModel.deleteOne({_id:req.params.id});
      res.send({
        message:"user deleted successfully"
      })
    }else{
      res.send({
        message:"user does not exists!"
      })
    }
  }
  catch(err){
    res.status(500).send({
      message:'Internal server error',
      err
    })
  }
})

router.put('/:id',async(req,res)=>{
  try{
    let user = await userModel.findOne({_id:req.params.id});
    if(user){
      user.name=req.body.name;
      user.email=req.body.email;
      user.password=req.body.password;

      await user.save();
      res.send({
        message:"user updated successfully"
      })
    }else{
      res.send({
        message:"user does not exists!"
      })
    }
  }
  catch(err){
    res.status(500).send({
      message:'Internal server error',
      err
    })
  }
})

module.exports = router;
