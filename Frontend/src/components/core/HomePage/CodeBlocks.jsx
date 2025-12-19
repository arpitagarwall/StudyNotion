import React from 'react'
import CTAButton from '../HomePage/Button'
import HighlightText from '../HomePage/HighlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({position, heading, subHeading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) {
  return (
    <div className={`flex ${position} my-20 justify-evenly gap-32`}>

        <div className='w-[38%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subHeading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.children}
                        <FaArrowRight></FaArrowRight>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                    {ctabtn2.children} 
                </CTAButton>
            </div>
        </div>

        <div className='realtive overflow-hidden h-fit flex flex-row text-[20px] w-[100%] py-4 lg:w-[500px] bg-gradient-to-b from-[rgba(255,255,255,0.22)] to-[rgba(255,255,255,0)]'>

            <div className={backgroundGradient}>

            </div>

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation sequence={[codeblock, 1000,""]} repeat={Infinity} cursor={true} omitDeletionAnimation={true}
                style={{
                    whiteSpace:"pre-line",
                    display:"block"
                }}></TypeAnimation>
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks