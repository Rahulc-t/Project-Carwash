
import{createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import Index from './pages/Index'
import ProfileLayout from './layouts/ProfileLayout'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Services from './pages/Services'
import Signin from './pages/Signin'
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Appointment from "./pages/Appointment"
import AdminProfile from "./pages/AdminProfile"
import AdminLayout from "./layouts/AdminLayout"
import AdminReview from "./pages/AdminReview"
import AdminAppointment from "./pages/AdminAppointment"
import AppointmentHistory from "./pages/AppointmentHistory"
import EditAppointment from "./pages/EditAppointment"
import AdminLimit from "./pages/AdminLimit"
import ChangePassword from "./pages/ChangePassword"
import AddAdmin from "./pages/AddAdmin"



function App() {
  const router=createBrowserRouter(createRoutesFromElements( 
  <>
  <Route path="/" element={<ProfileLayout/>}>
  <Route index element={<Index/>} />
  <Route path="/aboutus" element={<AboutUs/>}/>
  <Route path="/contactus" element={<ContactUs/>}/>
  <Route path="/services" element={<Services/>}/>
  <Route path="/signin" element={<Signin/>}/>
  <Route path="/profile" element={<Profile/>}/> 
  <Route path="/edit-profile" element={<EditProfile/>}/> 
  <Route path="/appointment" element={<Appointment/>}/> 
  <Route path="/appointment-history" element={<AppointmentHistory/>}/> 
  <Route path="/edit-appointment/:id" element={<EditAppointment/>}/> 
  <Route path="/change-password" element={<ChangePassword/>}/> 
  
  




</Route>
 <Route path="/" element={<AdminLayout/>}>
<Route path="/admin" element={<AdminProfile/>}/>
<Route path="/reviews" element={<AdminReview/>}/>
<Route path="/admin-appointment" element={<AdminAppointment/>}/>
<Route path="/admin-limit" element={<AdminLimit/>}/>
<Route path="/change-password" element={<ChangePassword/>}/>
<Route path="/add-admin" element={<AddAdmin/>}/>



</Route>
</>))
  return (
    <>
     <RouterProvider router={router}/>

    </>
  )
}

export default App
