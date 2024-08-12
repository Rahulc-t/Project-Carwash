import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const navigate=useNavigate()
  const authToken = localStorage.getItem('Authtoken');
    const [name,setName]=useState('')
    const [reviewemail,setEmail]=useState('')
    const [content,setMessage]=useState('')
    const [phone, setPhone] = useState('')
    const submitMessage=async(e)=>{
        e.preventDefault()
        if(reviewemail && name && content && phone){
                let res= await fetch('/api/user/contactus',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({reviewemail,phone,name,content})
                })
                console.log(res);
        if(res.ok&&authToken){
            
            navigate("/profile")
        }        
        else{
            navigate("/")
        }
    }
    else{
        alert("Please fill all fields")
    }
}
    
  return (
    <div class="bg-gray-100">
    
    {/* <!-- Contact Form Section --> */}
    <br/><br/><br/><br/><br/>
    <div class=" flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg shadow-lg w-3/6">
            <h2 class="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            <form  class="space-y-4" onSubmit={submitMessage}>
                <div>
                    <label  class="text-lg font-medium text-gray-700">Name <span class="text-red-600">*</span></label>
                    <input class="form-input mt-1  w-full rounded-md shadow-lg border border-black-300 text-lg" required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label  class=" text-lg font-medium text-gray-700">Phone Number <span class="text-red-600">*</span></label>
                    <input class="form-input mt-1 w-full rounded-md border border-black-300 shadow-lg text-lg" required
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                    <label for="reviewemail" class="block text-lg font-medium text-gray-700">Email</label>
                    <input type="reviewemail" id="reviewemail" name="reviewemail" class="form-input mt-1 w-full border border-black-300 rounded-md shadow-lg text-lg"
                    value={reviewemail}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label for="content" class="block text-lg font-medium text-gray-700">Message</label>
                    <textarea id="content" name="content" rows="4" class="form-textarea mt-1  w-full  rounded-md shadow-lg border border-black-300 text-lg"
                    value={content}
                    onChange={(e)=>setMessage(e.target.value)}></textarea>
                </div>
                <div>
                    <button type="submit" class="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700   text-lg">Submit</button>
                </div>
            </form>
        </div>
    </div>

</div>
  )
}

export default ContactUs