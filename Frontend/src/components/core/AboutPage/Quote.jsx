import React from 'react'
import HighlightText from '../HomePage/HighlightText'

function Quote() {
  return (
    <div className='text-center text-richblack-100 font-semibold font-inter text-4xl'>
        <span className='text-richblack-700 text-4xl'>“</span>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"}></HighlightText>
        ,
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[rgba(255,81,47,1)] to-[rgba(240,152,25,1)]'>
            {" "}
            expertise
        </span>
        , and community to create an

        <span className='text-transparent bg-clip-text bg-gradient-to-tl from-[rgba(230,92,0,1)] to-[rgba(249,212,35,1)]'>
            {" "}
            unparalleled educational experience
        </span>
        .
        <span className='text-richblack-700 text-4xl'>”</span>
    </div>
  )
}

export default Quote