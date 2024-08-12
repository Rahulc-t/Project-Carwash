import React from 'react'

const Services = () => {
  return (
    <div class="bg-gray-100">
    
    <h2 class="text-5xl font-bold mb-8 text-center mt-[30px]">Our Services</h2>
    <br/>
    <div class="flex justify-center space-x-6 ">
        <div class="bg-white w-3/12 h-[700px] rounded-lg shadow-md shadow-gray-500">
            <img src="./images/interior detailing.jpg" class="w-full mb-4" alt=""/>
            <p class="text-center text-3xl font-medium mt-6 bg-red-600 p-4 text-white">Interior Detailing</p>
            <ul class="list-disc list-inside ml-8 mt-4 p-4 text-xl space-y-4">
                <li class="hover:bg-gray-100 p-2">Vacuuming and carpet cleaning</li>
                <li class="hover:bg-gray-100 p-2">Dashboard and console cleaning</li>
                <li class="hover:bg-gray-100 p-2">Leather conditioning</li>
            </ul>
        </div>
        <div class="bg-white w-3/12 h-[700px] rounded-lg shadow-md shadow-gray-500">
            <img src="./images/fuulservice.jpg" class="w-full mb-4" alt=""/>
            <p class="text-center text-3xl font-medium mt-6 bg-red-600 p-4 text-white">Full Service Package</p>
            <ul class="list-disc list-inside ml-8 mt-4 p-4 text-xl space-y-4">
                <li class="hover:bg-gray-100 p-2">Combines exterior wash and interior detailing</li>
                <li class="hover:bg-gray-100 p-2">Engine bay cleaning</li>
                <li class="hover:bg-gray-100 p-2">Paint protection options</li>
            </ul>
        </div>
        <div class="bg-white w-3/12 h-[700px] rounded-lg shadow-md shadow-gray-500">
            <img src="./images/carwash.jpg" class="w-full mb-4" alt=""/>
            <p class="text-center text-3xl font-medium mt-6 bg-red-600 p-4 text-white">Exterior Car Wash</p>
            <ul class="list-disc list-inside ml-8 mt-4 p-4 text-xl space-y-4">
                <li class="hover:bg-gray-100 p-2">Hand wash with premium soap</li>
                <li class="hover:bg-gray-100 p-2">Tire and rim cleaning</li>
                <li class="hover:bg-gray-100 p-2">Exterior wax and polish</li>
            </ul>
        </div>
    </div>


    
</div>
  )
}

export default Services