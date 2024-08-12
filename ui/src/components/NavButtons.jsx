import React from 'react'

const NavButtons = ({NavContents}) => {
  return (
    <>
    <button className="bg-red-600 text-white text-xl font-md p-2 w-32 rounded-full hover:bg-white hover:text-red-600">{NavContents}</button>
    </>
  )
}

export default NavButtons