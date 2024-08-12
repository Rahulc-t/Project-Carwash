// const express = require('express');
// const verifyToken = require('../middleware/authMiddle.js');
// const contactUs = require('../models/review.js');
// const appoint = require('../models/appointmentModel.js');

// const router = express.Router();
// var multer=require("multer")
// var upload=multer({storage:storage})

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './upload');
//      },
//     filename: function (req, file, cb) {
//         cb(null , file.originalname);
//     }
// });

// router.get("/review-admin", verifyToken, async (req, res) => {
//   try {
//      if(req.email=="admin2001"){
//     const data = await contactUs.find();
//     res.send(data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }});


// router.post("/appointment-print", verifyToken, async (req, res) => {
//   try {
//     if(req.email=="admin2001"){
//     const { date } = req.body;
//     const appointments = await appoint.find({ date });
//     console.log(appointments);
//     res.status(200).send(appointments);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// router.post('/single', upload.single('profile'), (req, res) => {
//   try {
//     res.send(req.file);
//   }catch(err) {
//     res.send(400);
//   }
// });


// module.exports = router;
const express = require('express');
const verifyToken = require('../middleware/authMiddle.js');
const contactUs = require('../models/review.js');
const appoint = require('../models/appointmentModel.js');
const limit=require("../models/appointmentlimit.js")
const User=require("../models/userModel.js")
const fs=require("fs")
const bcrypt=require("bcryptjs")

const router = express.Router();
const multer = require('multer');
const path = require('path');

const uploadDir=path.join(__dirname,"appointmentdetails")
// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Specify the folder to store the image
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
    }
});
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ storage: storage });

// Route to get all reviews (admin only)
router.get("/review-admin", verifyToken, async (req, res) => {
    try {
            const data = await contactUs.find();
            res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to get appointments by date (admin only)
router.post("/appointment-print", verifyToken, async (req, res) => {
    try {
      
            const { date } = req.body;
            const appointments = await appoint.find({ date });
            console.log(appointments);
            res.status(200).send(appointments);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Route to upload a single file and save it in the database
router.post('/single/:id', upload.single('appointmentdetails'), async (req, res) => {
    try {
        const id=req.params.id
        if (!req.file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        // Save the file path to the image field in the database
        const newAppointment = await appoint.findOne({_id:id})
            // Other fields as needed, e.g., name, date, etc.
            newAppointment.image= req.file.path // Store the file path
            newAppointment.status="completed"
      
      

        await newAppointment.save();
        res.status(201).send({ message: "File uploaded and saved successfully", file: req.file });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

router.delete("/remove-review/:id",async(req,res)=>{
  try {
    const id=req.params.id
    const review=await contactUs.find({_id:id})
    if(review.length==0){
      return res.status(404).send({ error: "Review not found" });
      }
      await contactUs.deleteOne({_id:id})
      res.status(200).send({ message: "Review deleted successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        }

})

router.post("/set-limit", async (req, res) => {
  const data = req.body;

  try {
    const limits = await limit.findOneAndUpdate(
      { date: data.date },       // The condition to find the document based on the `date`
      {
        $set: {                  // Using `$set` to update specific fields
          morning: data.morning,
          afternoon: data.afternoon,
          overnight: data.overnight,
        }
      },
      { new: true, upsert: true }  // `new: true` returns the updated document; `upsert: true` creates a new document if none exists
    );

    res.status(201).send({ message: "Limit set successfully", limits });
  } catch (error) {
    res.status(500).send({ message: "Error setting limit", error });
  }
});


router.get("/get-limit",async(req,res)=>{
  try {
    const limits=await limit.find()
    res.status(200).send(limits)
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
      }

})

// router.put("/edit-limit/:id",async(req,res)=>{
//   try {
//     const id=req.params.id
//     const limits=await limit.findByIdAndUpdate(id,req.body,{new:true})
//     if(!limits){
//       return res.status(404).send({ error: "Limit not found" });
//       }
//       res.status(200).send(limits)
//       } catch (error) {
//         console.log(error);
//         res.status(500).send({ error: "Internal Server Error" });
//         }
// })

router.get("/get-limit/:id",(req,res)=>{
  try{
    const id=req.params.id
    const limits=limit.findById(id)
    if(!limits){
      return res.status(404).send({ error: "Limit not found" });
      }
      res.status(200).send(limits)
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        }
})

router.delete("/delete-limit/:id",(req,res)=>{
  try{
    const id=req.params.id
    const limits=limit.findByIdAndDelete(id)
    if(!limits){
      return res.status(404).send({ error: "Limit not found" });
      }
      res.status(200).send({message:"Limit deleted"})
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        }
})

router.post("/add-admin", async (req, res) => {
  try {
    console.log("test1")
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("test2")
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address: "",
      phone: "",
      userType:"admin"
    });
    console.log("test")
    const result = await user.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
