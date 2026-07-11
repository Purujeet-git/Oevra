import Image from 'next/image'
import React from 'react'
import { Playwrite_NL } from 'next/font/google';

const nzland = Playwrite_NL({
    weight:['400'],
    
})

const Navbar = () => {
  return (
    <div className='flex justify-between p-10 pt-5 items-center'>
        <div className='flex justify-center items-center'>
        <Image className='invert h-fit w-20 ' alt='logo' src={'/logo.png'} height={100} width={300}/>
        <span className={`${nzland.className} pb-5 text-2xl`}>Oevra</span>
        </div>
        <div className='flex gap-10 '>
            <button className='cursor-pointer'>ABOUT</button>
            <button className='cursor-pointer'>LOGIN</button>
            <button className='cursor-pointer'>SIGN UP</button>
        </div>
    </div>
  )
}

export default Navbar