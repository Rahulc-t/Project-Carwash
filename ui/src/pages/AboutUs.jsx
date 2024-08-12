import React from 'react'

const AboutUs = () => {
  return (
    <div class="bg-gray-100">
    
    {/* <!-- About Us Section --> */}
    <div class="mx-auto py-12 px-4">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-5xl font-bold mb-8 text-center ">About Us</h2>
            <p class="text-lg text-gray-800 mb-8 text-center ">Welcome to Kings Auto Servicing, where we redefine car care with a passion for perfection. At Kings, we understand that your vehicle is more than just a mode of transportation—it's a reflection of your lifestyle and personality. With our meticulous attention to detail and commitment to quality, we offer a comprehensive range of services designed to keep your car looking pristine and running smoothly. Whether it's a thorough wash, a professional detailing, or routine maintenance, our experienced team uses only the finest products and techniques to ensure your satisfaction. Trust Kings for a superior car care experience that exceeds expectations every time you visit.</p>


            {/* <!-- Photo Boxes --> */}
            <div class="flex justify-center space-x-4 mb-8 ">
                
                <div> <img src="./images/aboutus1.jpg" alt="Photo 1"/></div>
                <div> <img src="./images/aboutus2.jpg" alt="Photo 2"/></div>
                <div> <img src="./images/aboutus3.jpg" alt="Photo 3"/></div>
            </div>

            <p class=" mt-32 mb-8 text-4xl font-bold">What Happy Customers Say About Us</p>
            {/* <!-- Feedback Cards Section --> */}
            <div class="space-y-4">
                {/* <!-- Card 1 --> */}
                <div class="bg-white rounded-lg p-4 shadow-md">
                    <div class="flex">
                        <div class="mr-4 ">
                            <img class="w-24 h-24 rounded-full" src="./images/pro2.webp" alt="Photo 1"/>
                        </div>
                        <div>
                            <p class="font-bold">John Doe</p>
                            <p class="text-sm">"Excellent service, highly recommended! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod eleifend risus a luctus."</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Card 2 --> */}
                <div class="bg-white rounded-lg p-4 shadow-md">
                    <div class="flex">
                        <div class=" mr-4">
                            <img class="w-24 h-24 rounded-full"src="./images/pro1.webp" alt="Photo 2"/>
                        </div>
                        <div>
                            <p class="font-bold">Jane Smith</p>
                            <p class="text-sm">"Professional staff and great attention to detail. Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Card 3 --> */}
                <div class="bg-white rounded-lg p-4 shadow-md">
                    <div class="flex">
                        <div class="mr-4">
                            <img class="w-24 h-24 rounded-full" src="./images/pro3.webp" alt="Photo 3"/>
                        </div>
                        <div>
                            <p class="font-bold">Michael Johnson</p>
                            <p class="text-sm">"Fast and efficient service, will definitely come back! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod eleifend risus a luctus."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
  )
}

export default AboutUs