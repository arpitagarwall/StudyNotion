import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for ",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

function LearningGrid() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 mb-40 w-fit'>
        {
            LearningGridArray.map((card,index) =>{
                return(
                    <div key={index} className={`${index === 0 && "lg:col-span-2 bg-richblack-900 lg:h-[280px]"}
                    ${
                        card.order % 2 == 0 ? "bg-richblack-800 lg:h-[280px]" : "bg-richblack-700 lg:h-[280px]" 
                    }
                    ${card.order === 3 && "lg:col-start-2"}
                    `}>
                        {
                            card.order < 0 ? (

                                <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                    <div className='text-4xl font-semibold text-richblack-5 font-inter'>
                                        {card.heading}
                                        <HighlightText text={card.highlightText}></HighlightText>
                                    </div>
                                    <p className='font-medium text-richblack-300'>
                                        {card.description}
                                    </p>
                                    <div className='w-fit mt-4'>
                                        <CTAButton active={true} linkTo={card.BtnLink}>{card.BtnText}</CTAButton>
                                    </div>
                                    
                                </div>
                            ) : (
                                <div className='flex flex-col gap-8 p-7'>
                                    <h1 className='text-richblack-5 text-lg font-semibold font-inter'>{card.heading}</h1>
                                    <p className='text-richblack-100 text-sm font-inter'>{card.description}</p>
                                </div>
                            )
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid