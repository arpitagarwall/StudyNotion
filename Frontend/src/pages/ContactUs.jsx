import React from 'react';
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeAmericas } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import ContactUsForm from '../components/common/ContactUsForm';
import Footer from '../components/common/Footer';

function ContactUs() {
  return (
    <div>
        <div className='w-11/12 max-w-maxContent mx-auto mt-32'>
            <div className='flex gap-24 mb-32'>
                <div className='flex flex-col lg:w-[450px] lg:h-[390px] bg-richblack-800 rounded-md'>
                    <div className='flex flex-col gap-2 ml-10 mt-10'>
                        <div className='flex gap-4'>
                            <HiMiniChatBubbleLeftRight className='text-richblack-300'></HiMiniChatBubbleLeftRight>
                            <div className='flex flex-col '>
                                <p className='text-richblack-5 font-semibold font-inter text-lg'>Chat on us</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>Our friendly team is here to help.</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>support@studynotion.com</p>
                            </div>
                        </div>
                        
                        <div className='flex gap-4 mt-8'>
                            <BsGlobeAmericas className='text-richblack-300'></BsGlobeAmericas>
                            <div className='flex flex-col '>
                                <p className='text-richblack-5 font-semibold font-inter text-lg'>Visit us</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>Come and say hello at our office HQ.</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>Vancouver, Canada</p>
                            </div>
                        </div>

                        <div className='flex gap-4 mt-8'>
                            <BsFillTelephoneFill className='text-richblack-300'></BsFillTelephoneFill>
                            <div className='flex flex-col '>
                                <p className='text-richblack-5 font-semibold font-inter text-lg'>Call us</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>Mon - Fri From 8am to 5pm</p>
                                <p className='text-sm font-medium font-inter text-richblack-200'>+1 234-567-8907</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-col border border-richblack-600 p-10 rounded-md gap-2'>
                    <p className='font-semibold font-inter text-4xl text-richblack-5'>Got a Idea? We’ve got the skills.</p>
                    <p className='font-semibold font-inter text-4xl text-richblack-5'>Let’s team up</p>
                    <p className='font-medium font-inter text-base text-richblack-300 mb-4'>Tell us more about yourself and what you’re got in mind.</p>
                    <ContactUsForm></ContactUsForm>
                </div>
            </div>

            <section className='w-11/12 max-w-maxContent mx-auto text-center text-4xl text-richblack-5 font-inter font-bold mb-40'>
                Reviews from other learners
            </section>
        </div>

        <Footer></Footer>
    </div>
  )
}

export default ContactUs