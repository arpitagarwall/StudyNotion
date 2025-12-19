import React from 'react'
import { Link } from 'react-router-dom'

function Button({children, active, linkTo}) {
  return (
    <Link to={linkTo}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
            ${active ? "bg-yellow-50 text-black shadow-[inset_-2px_-2px_0_rgba(255,255,255,0.51)]" : "bg-richblack-800 shadow-[inset_-2px_-2px_0_rgba(255,255,255,0.18)]"}
            hover:scale-95 transition-all duration-200
            `}>
            {children}
        </div>
    </Link>
  )
}

export default Button