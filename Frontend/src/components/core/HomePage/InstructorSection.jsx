import React from 'react';
import instructorImage from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import CTAButton from '../../../components/core/HomePage/Button';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection() {
  return (
    <div className='pt-24 pr-28 pl-28 pb-24'>
      <div className='flex flex-row gap-24 items-center mx-auto'>

        <div className='w-[50%]'>
          <img src={instructorImage} className='shadow-[-20px_-20px_0_rgba(255,255,255,1)]'></img>
        </div>

        <div className='w-[50%] flex flex-col'>
          <div className='text-4xl font-semibold font-inter w-[50%]'>
            Become an
            <HighlightText text={" Instructor"} linkTo={"/signUp"}></HighlightText>
          </div>

          <p className='font-medium text-[16px] w-[100%] text-richblack-300 pb-[52px]'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className='w-fit'>
            <CTAButton active={true} linkTo={"/signUp"}>
            <div className='flex flex-row gap-2 items-center'>
              Start Teaching today
              <FaArrowRight></FaArrowRight>
            </div>
            </CTAButton>
          </div>

        </div>

       
      </div>
    </div>
  )
}

export default InstructorSection