import React from 'react'



export const Footer = () => {

   let footerStyle = {
    position: "relative",
    top: "100vh",
    width: "100%"
   }


  return (
   <footer className=' text-light py-3 overflow-hidden' style={{footerStyle , background:"black"}}>
    <p className='text-center'>
      Copyright &copy; 2023 DigitalDairy
    </p>

   </footer>
  )
}
