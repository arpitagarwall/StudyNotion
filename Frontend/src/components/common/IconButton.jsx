import React from 'react'

function IconButton({text, onClick, children, disabled, outline=false, customClass, type}) {
  return (
    <button className='bg-yellow-50 font-inter font-medium py-2 px-5 rounded-md shadow-[inset_-0.5px_-1.5px_0_rgba(0,0,0,0.12) flex items-center gap-2' disabled={disabled} onClick={onClick} type={type}>
        {text}
        {children}
    </button>
  )
}

export default IconButton