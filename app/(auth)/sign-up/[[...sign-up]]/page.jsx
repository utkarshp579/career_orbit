import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <SignUp/>
  )
}

export default page; 


// cache folders , to catch other details coming from route , as we have implemnted google and other auth.