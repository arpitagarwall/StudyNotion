import React from 'react'

function HighlightText({text}) {
  return (
    <span className='font-bold p-1 bg-clip-text text-transparent bg-gradient-to-b from-[rgba(84,51,255,1)] via-[rgba(32,189,255,1)] to-[rgba(165,254,203,1)]'>
        {text}
    </span>
  )
}

export default HighlightText