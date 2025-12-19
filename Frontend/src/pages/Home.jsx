import React, { act, Children } from 'react';
import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from "../components/common/Footer";
import ExploreMore from '../components/core/HomePage/ExploreMore';


function Home() {
  return (
    <div>
      {/* Section 1 */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
        <Link to={"/signUp"}>

          <div className="group mt-16 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
          transition-all duration-200 hover:scale-95 w-fit">
            <div className='flex flex-row items-center gap-2 rounded-full px-8 py-2 transition-all duration-200 
            group-hover:bg-richblack-900 shadow-[inset_0_-1px_0_rgba(255,255,255,0.18)]'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>

        </Link>

        <div className='text-center text-4xl font-semibold mt-6'>
          Empower Your Future with 
          <HighlightText text={"Coding Skills"}></HighlightText>
        </div>

        <div className='m-4 w-[75%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkTo={"/signUp"}>Learn More</CTAButton>
          <CTAButton active={false} linkTo={"/login"}>Book Demo</CTAButton>
        </div>

        

        <div className='relative'>
            <div className='absolute w-[85%] h-[75%] top-[40px] left-[100px] -rotate-0 bg-gradient-to-br from-[rgba(156,236,251,1)] via-[rgba(101,199,247,1)] to-[rgba(0,82,212,1)] opacity-50 blur-3xl rounded-full'></div>
            <div className='shadow-[20px_20px_0_rgba(245,245,245,1)] mx-12 my-12 overflow-hidden'>
              <video muted loop autoPlay className='relative'><source src={Banner} type="video/mp4"></source></video>
            </div>
        </div>

        <div>
          <CodeBlocks position={"lg:flex-row"} 
          heading={<div className='text-4xl font-bold'>
            Unlock your <HighlightText text={"coding potential"}></HighlightText> with our online courses.
          </div>}
          subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
          ctabtn1={
            {
              children:"Try it Yourself",
              linkTo:"/signUp",
              active:true
            }
          }

           ctabtn2={
            {
              children:"learn more",
              linkTo:"/login",
              active:false
            }
          }

          codeblock={`<!DOCTYPE html>
          <html>
          <head><title>Example</title><linkrel="stylesheet"href="styles.css">
          </head>
          <body><h1><ahref="/">Header</a>
          </h1>
          <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
          </nav>`}
          codeColor={"text-white"}

          backgroundGradient={'absolute w-[30%] h-[10%] left-[700px] -rotate-0 bg-gradient-to-t from-[rgba(138,43,226,1)] via-[rgba(255,165,0,1)] to-[rgba(248,248,255,1)] opacity-20 blur-2xl rounded-full'}
          >
          </CodeBlocks>
        </div>
            

        <div>
          <CodeBlocks position={"lg:flex-row-reverse"} 
          heading={<div className='text-4xl font-bold w-6/12'>
            Start <HighlightText text={`coding`}></HighlightText>
            <HighlightText text={`in seconds.`}></HighlightText>
          </div>}
          subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
          ctabtn1={
            {
              children:"Continue Lessons",
              linkTo:"/signUp",
              active:true
            }
          }

           ctabtn2={
            {
              children:"learn more",
              linkTo:"/login",
              active:false
            }
          }

          codeblock={`<!DOCTYPE html>
          <html>
          <head><title>Example</title><linkrel="stylesheet"href="styles.css">
          </head>
          <body><h1><ahref="/">Header</a>
          </h1>
          <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
          </nav>`}
          codeColor={"text-white"}

          backgroundGradient={'absolute w-[30%] h-[10%] -rotate-0 bg-gradient-to-b from-[rgba(156,236,251,1)] via-[rgba(101,199,247,1)] to-[rgba(0,82,212,1))] opacity-40 blur-2xl rounded-full'}
          >
          </CodeBlocks>
        </div>
        
        <ExploreMore></ExploreMore>
      </div>

      {/* Section 2 */}
      
      <div className='bg-pure-greys-5 text-richblack-700'>

        <div className='homepage-bg h-[300px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
              <div className='h-[100px]'></div>
              <div className='flex flex-row gap-4 text-white'>
                  <CTAButton active={true} linkTo={"/signUp"}>
                    <div className='flex items-center gap-2'>
                      Explore Full Catalog
                      <FaArrowRight></FaArrowRight>
                    </div>
                  </CTAButton>
                 
                 <CTAButton active={false} linkTo={"/login"}>
                  <div>Learn more</div>
                 </CTAButton>
              </div>  
            </div>
        </div>
        
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-5 overflow-hidden'>
            
          <div className='flex gap-5 mb-10 mt-[100px]'>

            <div className='text-4xl font-semibold w-[45%]'>
              Get the skills you need for a
              <HighlightText text={" job that is in demand."}></HighlightText>
            </div>

            <div className='flex flex-col gap-5 w-[45%] items-start'>
              <div className='text-[16px] font-inter'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkTo={"/signUp"}><div>Learn More</div></CTAButton>
            </div>

          </div>

            <TimelineSection></TimelineSection>

            <LearningLanguageSection></LearningLanguageSection>
          
        
        </div>

      </div>
      {/* Section 3 */}
      
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
        
        <InstructorSection></InstructorSection>

        <h2 className='text-center text-4xl font-semibold mt-10'>Reviews from other learners</h2>

      </div>
      {/* Footer */}
        <Footer></Footer>
    </div>
  )
}

export default Home