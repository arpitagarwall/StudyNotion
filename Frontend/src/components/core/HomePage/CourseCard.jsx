import React from 'react';
import { UsersIcon} from '@heroicons/react/24/solid';
import { PiTreeStructureFill } from "react-icons/pi";

function CourseCard({cardData, currentCard, setCurrentCard}) {

    const currentCardData = (value) =>{
        setCurrentCard(value);
    }

  return (
    <div>
        <div className={`flex flex-col gap-2 lg:w-[342px] lg:h-[300px] hover:cursor-pointer
            ${cardData.heading === currentCard ? "bg-white shadow-[12px_12px_0_rgba(255,214,10,1)]" : "bg-richblack-800"}`} onClick={() => currentCardData(cardData.heading)}>

            <div className='flex flex-col pt-8 pr-6 pb-12 pl-6 gap-2 h-[70%] w-full'>
                <div className={`text-xl font-inter font-semibold ${cardData.heading === currentCard ? "text-richblack-800" : "text-richblack-25"}`}>{cardData.heading}</div>
                <div className={`font-inter text-md ${cardData.heading === currentCard ? "text-richblack-500" : "text-richblack-400"}`}>{cardData.description}</div>
            </div>

            <div className="border-t border-dashed border-richblack-400"></div>

            <div className='flex flex-row items-center justify-around'>
                <div className='flex flex-row items-center justify-center py-4 gap-2'>
                    <UsersIcon className={`w-5 h-5 ${cardData.heading === currentCard ? "text-blue-500" : "text-richblack-300"}`}></UsersIcon>
                    <p className={`font-inter ${cardData.heading === currentCard ? "text-blue-500" : "text-richblack-300"}`}>{cardData.level}</p>
                </div>
                <div className='flex flex-row items-center justify-center py-4 gap-2'>
                    <PiTreeStructureFill className={`w-5 h-5 rotate-90 ${cardData.heading === currentCard ? "text-blue-500" : "text-richblack-300"}`}></PiTreeStructureFill>
                    <p className={`font-inter ${cardData.heading === currentCard ? "text-blue-500" : "text-richblack-300"}`}>{cardData.lessionNumber} Lessons</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CourseCard