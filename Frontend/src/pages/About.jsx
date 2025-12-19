import React from 'react';
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote"
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactForm from '../components/core/AboutPage/ContactForm';
import Footer from "../components/common/Footer"

function About() {
  return (
    <div>
        <section className='bg-richblack-800'>
            <div className='flex flex-col justify-center items-center gap-10 w-11/12 max-w-maxContent mx-auto relative'>
                <p className='font-medium text-richblack-200 font-inter mt-16'>About Us</p>
                <header className='text-center font-semibold font-inter text-4xl lg:w-[70%] text-richblack-5'>Driving Innovation in Online Education for a <HighlightText text={'Brighter Future'}></HighlightText>
                </header>
                <p className='text-center font-medium text-richblack-300 lg:w-[59%] -mt-4 mb-14'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                <div className='absolute h-[20%] w-[30%] blur-2xl top-80 rotate-0 opacity-75 rounded-full bg-gradient-to-t from-[rgba(230,92,0,1)] to-[rgba(249,212,35,1)]'></div>
                <div className="sm:h-[70px] lg:h-[150px]"></div>
                <div className='absolute flex gap-x-5 mx-auto top-80 mt-6 z-10'>
                    <img src={BannerImage1}></img>
                    <img src={BannerImage2}></img>
                    <img src={BannerImage3}></img>
                </div>
            </div>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto mt-40'>
            <div><Quote></Quote></div>
            <div className="h-[100px]"></div>
            <div className='border-b border-richblack-700 w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]'></div>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto mt-16'>
            <div className='flex flex-col'>
                <div className='flex gap-40 justify-center items-center mb-40'>
                    <div className='w-[38%] flex flex-col gap-8'>
                        <h1 className='font-semibold font-inter text-4xl text-transparent bg-clip-text bg-gradient-to-tl from-[rgba(131,58,180,1)] via-[rgba(253,29,29,1)] to-[rgba(252,176,69,1)]'>Our Founding Story </h1>
                        <p className='font-medium text-richblack-300 font-inter text-base'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='font-medium text-richblack-300 font-inter text-base'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div className='w-[40%]'>
                        <img src={FoundingStory}></img>
                    </div>
                </div>

                <div className='flex gap-40 justify-center items-center mb-28'>
                    <div className='w-[38%] flex flex-col gap-8'>
                        <h1 className='font-semibold font-inter text-4xl text-transparent bg-clip-text bg-gradient-to-tl from-[rgba(230,92,0,1)] to-[rgba(249,212,35,1)]'>Our Vision</h1>
                        <p className='font-medium text-richblack-300 font-inter text-base'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='w-[38%] flex flex-col gap-8'>
                        <h1 className='font-semibold font-inter text-4xl text-transparent bg-clip-text bg-gradient-to-tl from-[rgba(31,1622,255,1)] via-[rgba(18,216,250,1) to-[rgba(166,255,203,1)]'>Our Mission</h1>
                        <p className='font-medium text-richblack-300 font-inter text-base'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className='bg-richblack-700 h-64 mb-32'>
            <StatsComponent></StatsComponent>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto'>
            <LearningGrid></LearningGrid>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto'>
            <ContactForm></ContactForm>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto text-center text-4xl text-richblack-5 font-inter font-bold mb-40'>
            Reviews from other learners
        </section>

        <Footer></Footer>

    </div>
  )
}

export default About