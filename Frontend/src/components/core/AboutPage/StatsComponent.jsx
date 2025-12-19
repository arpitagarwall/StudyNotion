import React from 'react'

const stats = [
    {count: "5K", label:"Active Students"},
    {count: "10+", label:"Mentors"},
    {count: "200+", label:"Courses"},
    {count: "50+", label:"Awards"}
]
function StatsComponent() {
  return (
    <div>
        <div className='flex gap-x-56 justify-center items-center text-center h-64'>
            {
                stats.map((data, index) => {
                    return (
                        <div key={index} className='flex flex-col gap-4'>
                            <h1 className='text-richblack-5 font-inter font-bold text-4xl'>
                                {
                                    data.count
                                }
                            </h1>
                            <h1 className='font-inter font-semibold text-richblack-500 text-base'>
                                {
                                    data.label
                                }
                            </h1>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default StatsComponent