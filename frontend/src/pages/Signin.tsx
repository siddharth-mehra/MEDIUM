import React from 'react'
import Quote from '@/components/ui/ui/Quote'
import Auth from '@/components/ui/ui/Auth'
export const Signin = () => {
  return (
    <div className='flex h-screen w-full'>
      <div className='w-full flex justify-center items-center md:w-1/2'>
        <Auth type={"Signin"}/>
      </div>
      <div className='w-1/2 hidden md:block'>
        <Quote/>
      </div>
    </div>
  )
}


