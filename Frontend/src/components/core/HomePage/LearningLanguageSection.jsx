import React from 'react';
import HighlightText from './HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from '../HomePage/Button';


function LearningLanguageSection() {
  return (
    <div className='mt-[120px]'>
      <div className='flex flex-col gap-5 items-center'>

        <div className='text-4xl font-semibold text-center font-inter'>
          Your swiss knife for 
          <HighlightText text={" learning any language"}></HighlightText>
        </div>

        <div className='text-center text-black mx-auto font-medium w-[70%] text-lg font-inter'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={know_your_progress} className='object-contain -mr-32'></img>
          <img src={compare_with_others} className='object-contain'></img>
          <img src={plan_your_lessons} className='object-contain -ml-32'></img>
        </div>

        <div className='w-fit mb-16'>
          <CTAButton active={true} linkTo={"/signUp"}>
            <div>
              Learn more
            </div>
          </CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection