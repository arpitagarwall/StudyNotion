import React from 'react';
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
    logo:logo1,
    heading:"Leadership",
    description: "Fully committed to the success company"
    },
    {
    logo:logo2,
    heading:"Responsibility",
    description: "Students will always be our top priority"
    },
    {
    logo:logo3,
    heading:"Flexibility",
    description: "The ability to switch is an important skills"
    },
    {
    logo:logo4,
    heading:"Solve the problem",
    description: "Code your way to a solution"
    }
]



function TimelineSection() {
  return (
    <div>
        <div className='flex flex-row gap-20 justify-center items-center h-[680px]'>

            <div className='w-[400px] h-[400px] flex flex-col justify-evenly'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div className='w-[410px] h-[160px] px-[16px] py-[5px] flex flex-row gap-[24px] relative' key={index}>
                                <div className='flex flex-col items-center'>
                                    <div className='w-16 h-16 bg-[rgba(255,255,255,1)] flex justify-center items-center rounded-full mb-4'>
                                        <img src={element.logo}></img>
                                    </div>
                                    {index < 3 && (
                                        <div className='border-l-[1px] border-dashed border-[rgba(175,178,191,1)] h-8'></div>
                                    )}
                                    
                                </div>
                                
                                <div>
                                    <h2 className='font-semibold text-[18px] font-inter'>{element.heading}</h2>
                                    <p className='text-base font-inter'>{element.description}</p>
                                </div>
                            </div>
                            
                        )
                    })
                }
            
            </div>

            <div className='relative shadow-blue-200 w-[814px] h-[545px]'>
                
                <img src={timelineImage} className='absolute shadow-[20px_20px_0_rgba(255,255,255,1)] object-cover h-fit z-20'></img>
                <div className='absolute w-[749px] h-[280px] -rotate-0 bg-gradient-to-r from-[rgba(156,236,251,1)] via-[rgba(101,199,247,1)] to-[rgba(0,82,212,1)] opacity-60 blur-2xl rounded-full top-32 -left-16 z-10'></div>

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 -bottom-14 left-20 z-20'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of experience</p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>

                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>

                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default TimelineSection