import React from 'react'
import { ReactTyped } from 'react-typed'

const Hero = () => {
  return (
    <div className='text-white'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
          <p className='text-[#5c758f] font-bold p-2 md:text-2xl sm:text-1xl'>Create with your peers</p>
          <h1 className='md:text-6xl sm:text-5xl text-4xl font-bold md:py-6'>Collaboration made easy.</h1>
          <div className='flex justify-center items-center'>
            <p className='md:text-4xl sm:text-3xl text-xl font-bold'>Easy, flexible, versatile for</p>
            <ReactTyped 
              className='md:text-4xl sm:text-3xl text-xl font-bold pl-2 text-[#5c758f]'
              strings={['students','teachers','colleagues']} 
              typeSpeed={120} 
              backSpeed={140} 
              loop
            />
          </div>
          <button className='bg-[#5c758f] w-[200px] rounded-md font-medium my-6 mx-auto py-3'>Get started!</button>
        </div>
        
    </div>
  )
}

export default Hero