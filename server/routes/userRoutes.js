const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const Appointment = require('../models/appointmentModel.js');
const Limit = require('../models/appointmentlimit.js');
const Review = require('../models/review.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verifyToken = require('../middleware/authMiddle.js');
const path = require('path');
const multer=require("multer")
const fs=require("fs")
// const multer=require("multer")
// const fs=require("fs")
// const sharp=require("sharp")
// const path=require("path")

const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Edit profile
router.put("/edit-profile", verifyToken, async (req, res) => {
  try {
    const { newName, newAddress, newPhone } = req.body;

    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.name = newName || user.name;
    user.address = newAddress || user.address;
    user.phone = newPhone || user.phone;

    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Make appointments
router.post("/appointment", verifyToken, async (req, res) => {
  try {
    const appointmentData = req.body;
    appointmentData.status="pending"
    console.log("test1")
    const temp=await Limit.findOne({date:appointmentData.date})
    console.log(temp)

    if(!temp){
      return res.status(404).send({ message: "Date not available" });
    }
    console.log("test3")

    const time=appointmentData.time
    console.log("test4")
    console.log(typeof(temp.morning))
    console.log(temp.morning)
    console.log(time)
    if(temp.morning!==0&&time=="Morning (10 AM to 1 PM)"){
    const result = await Appointment.create(appointmentData);
    temp.morning--
    
    res.status(200).send(result);
    }
     else if(temp.afternoon!==0&&time=="Afternoon (2 PM to 5 PM)"){
      const result = await Appointment.create(appointmentData);
      temp.afternoon--
      
      res.status(200).send(result);
      }
    else if(temp.overnight!==0&&time=="Overnight"){
        const result = await Appointment.create(appointmentData);
        temp.overnight--
        res.status(200).send(result);
        }
    else{
      return res.status(404).send({ message: " No slots available" });
      }
    console.log("test5")
      await temp.save()
    console.log("test6")
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Edit appointments
router.put("/appointment/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { date, time, carmodel, service, remarks } = req.body;

    const appointment = await Appointment.findOne({ _id: id });
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.carmodel = carmodel || appointment.carmodel;
    appointment.service = service || appointment.service;
    appointment.remarks = remarks || appointment.remarks;

    await appointment.save();
    res.status(200).send(appointment);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
 router.get("/appointment-details/:id",verifyToken,async(req,res)=>{
  const id=req.params.id;
  const appointment = await Appointment.findOne({ _id: id });
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.json(appointment)
 })
// Get data to auto-fill appointments
router.get("/appointment", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete appointments
router.delete("/appointment/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findOneAndDelete({ _id: id });
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.status(200).send({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get appointment history
router.get("/appointment-history", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ appemail: req.email });
    if (!appointments) {
      return res.status(404).send({ message: "No appointment history found" });
    }
    res.status(200).send(appointments);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


// Send message to admin
router.post("/contactus", async (req, res) => {
  try {
    const userData = req.body;
    const review = new Review(userData);
    await review.save();
    res.status(200).send({ message: "Contact us form submitted" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// const uploadDir=path.join(__dirname,"appointmentdetails")
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, uploadDir); // Specify the folder to store the image
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
//   }
// });
// if (!fs.existsSync(uploadDir)) {
// fs.mkdirSync(uploadDir, { recursive: true });
// }

// const upload = multer({ storage: storage });

router.get('/download-invoice/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    console.log(appointment)
    if (!appointment || !appointment.image) {
      return res.status(404).send({ error: "Invoice not found" });
    }

    const filePath = path.join(__dirname, appointment.image);
    console.log(filePath)
    res.download(appointment.image, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Error downloading the invoice" });
      }
    });
   // res.sendFile(appointment.image)
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.put("/change-password",verifyToken,async(req,res)=>{
  try{
    const {oldPassword,newPassword}=req.body
    const user=await User.findOne({email:req.email})
    if(!user){
      return res.status(404).send({ error: "User not found" });
      }
      const isValid=await bcrypt.compare(oldPassword,user.password)
      if(!isValid){
        return res.status(401).send({ error: "Invalid old password" });
        }
        const hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword
        await user.save()
        res.status(200).send({message:"Password changed"})
        } catch (error) {
          console.log(error);
          res.status(500).send({ error: "Internal Server Error" });
          }
})

router.get("/role",verifyToken,async(req,res)=>{
  try{
    const user=await User.findOne({email:req.email})
    if(!user){
      return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send({role:user.userType})
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        }
})

module.exports = router;
