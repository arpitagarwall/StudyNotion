import React from 'react'
import CTAButton from "../components/core/HomePage/Button"

function Error() {
  return (
    <div className='flex flex-col min-h-[calc(100vh-3.5rem)] justify-center items-center gap-2'>
      <div className='text-4xl font-semibold text-richblack-5'>
        Error - 404 Not Found
      </div>
      <CTAButton active={true} linkTo={"/"}>Back to Home</CTAButton>
    </div>
  )
}

export default Error