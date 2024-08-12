import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditAppointment = () => {
    const navigate=useNavigate()

    const[name,setName]=useState("")
    const[appemail,setAppemail]=useState("")
    const[phone,setPhone]=useState("")
    const[address,setAddress]=useState("")
const[carmodel,setCarmodel]=useState("")
const[service,setService]=useState("")
const[date,setDate]=useState("")
const[time,setTime]=useState("")
const[remarks,setRemarks]=useState("")
const{id}=useParams()

useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('Authtoken');
        const response = await fetch(`/api/user/appointment-details/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
        setAppemail(data.appemail);
        setCarmodel(data.carmodel)
        setService(data.service)
        setTime(data.time)
        setDate(data.date)
        setRemarks(data.remarks)
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const editappointment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('Authtoken');
    const res = await fetch(`/api/user/appointment/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name,appemail,carmodel, address, phone,date,time,service,remarks })
    });
    
    if (res.ok) {
      navigate("/appointment-history");
    } else {
      alert("Failed to update profile");
    }
  };

  return (
    <div class="bg-gray-100 text-black">
    {/* <!-- Main Content --> */}
    <div class="container mx-auto p-8">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-3xl font-bold text-red-600 mb-8">Make an Appointment</h2>
            <form onSubmit={editappointment} >
                {/* <!-- Basic Information --> */}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label class="text-xl font-semibold">Full Name</label>
                        <input type="text" class="w-full mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500 outline-none" required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label  class="text-xl font-semibold">Email Address</label>
                        <input type="email" class="w-full mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500 outline-none" required
                        value={appemail}
                        onChange={(e)=>setAppemail(e.target.value)}/>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label class="text-xl font-md">Phone Number</label>
                        <input type="tel" class="w-full mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500 outline-none" required
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label  class="text-xl font-md">Address</label>
                        <input type="text" class="w-full mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500 outline-none" required
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}/>
                    </div>
                </div>

                {/* <!-- Car Model and Service Type --> */}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label class="text-xl font-md">Car Model</label>
                        <input type="text" class="w-full mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500 focus:border-red-500 outline-none" required
                        value={carmodel}
                        onChange={(e)=>setCarmodel(e.target.value)}/>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label class="text-xl font-md">Service Type</label>
                        <select class="w-full mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500 outline-none" required
                        value={service}
                        onChange={(e)=>setService(e.target.value)}>
                            <option >Select a service</option>
                            <option >Exterior Car Wash</option>
                            <option >Interior Detailing</option>
                            <option >Maintenance</option>
                            <option >Full Package Servicing</option>
                        </select>
                    </div>
                </div>

                {/* <!-- Appointment Date and Time Slot --> */}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label class="text-xl font-semibold">Appointment Date</label>
                        <input type="date" class="w-full mt-2 p-2 rounded-md border border-gray-300 outline:none focus:border-red-500" required
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}/>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <label  class="text-xl font-md">Time Slot</label>
                        <select  class="w-full mt-2 p-2 rounded-md border border-gray-300 focus:border-red-500" required
                        value={time}
                        onChange={(e)=>setTime(e.target.value)}>
                            <option >Select a time slot</option>
                            <option >Morning (10 AM to 1 PM)</option>
                            <option >Afternoon (2 PM to 5 PM)</option>
                            <option >Overnight</option>
                        </select>
                    </div>
                </div>

                {/* <!-- Additional Remarks --> */}
                <div class="bg-gray-100 p-4 rounded-lg mt-4">
                    <label class="text-xl font-md">Additional Remarks</label>
                    <textarea   class="w-full mt-2 p-2 rounded-md border border-gray-300 outline-none focus:border-red-500" placeholder="Any additional remarks or special requests..."
                    value={remarks}
                    onChange={(e)=>setRemarks(e.target.value)}></textarea>
                </div>

                {/* <!-- Submit Button --> */}
                <div class="mt-8 flex justify-center">
                    <button type="submit" class="bg-red-600 text-white py-4 px-8 rounded-md text-xl hover:bg-red-700">Submit Appointment</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default EditAppointment