import React, {useState} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white text-xl'>
        <h1 className='w-full text-3xl font-bold text-[#5c758f]'>Collaborative Whiteboard</h1>
        <ul className='flex'>
            <li className='p-4'>Home</li>
            <li className='p-4'>Dashboard</li>
            <li className='p-4'>Whiteboard</li>
            <li className='p-4'>Login</li>
        </ul>
        <div onClick={handleNav} className='block md:flex'>
            {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
        </div>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-200  bg-[#ABC3DC] ease-in-out duration-500 ' : 'fixed left-[-100%] '}>
            <h1 className='w-full text-3xl font-bold text-[#5c758f] m-4'>Collaborative Whiteboard</h1>
            <ul className='uppercase p-2'>
                <li className='p-4 border-b border-gray-200'>Home</li>
                <li className='p-4 border-b border-gray-200'>Dashboard</li>
                <li className='p-4 border-b border-gray-200'>Whiteboard</li>
                <li className='p-4'>Login</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar