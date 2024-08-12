import React from 'react';
import NavButtons from './NavButtons';
import LogoutButton from './LogoutButton';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
  const authToken = localStorage.getItem('Authtoken');
  const location=useLocation()
  React.useEffect(() => {
    // Any side effects or logic you want to run on route change
    // For example, you could log the new location
    console.log('Route changed to:', location.pathname);
  }, [location]);

  return (

    <nav className="bg-black p-4 h-[80px]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Car Wash</div>
        <ul className="flex space-x-4">
          {/* <li><a href="/"><NavButtons NavContents={"Home"} /></a></li> */}
          <li><a href="/services"><NavButtons NavContents={"Services"} /></a></li>
          <li><a href="/contactus"><NavButtons NavContents={"Contact Us"} /></a></li>
          <li><a href="/aboutus"><NavButtons NavContents={"About Us"} /></a></li>
          {!authToken && (
            <li><a href="/"><NavButtons NavContents={"Home"} /></a></li>
          )}
          {authToken && (
            <>
            <li><a href="/profile"><NavButtons NavContents={"Home"} /></a></li>

            <li><LogoutButton/></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
