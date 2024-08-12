const {Schema}=require('mongoose');
const {model}=require('mongoose');

const aboutUs=new Schema({
    name:{type:String,required:true},
    reviewemail:{type:String,required:true},
    phone:{type:String,required:true},
    content:{type:String,required:true}
    
})

const aboutUsModel=model('aboutUs',aboutUs);
module.exports=aboutUsModel;