import React, { useEffect, useState } from 'react';
import {useForm} from "react-hook-form"
import {apiConnector} from "../../services/ApiConnector";
import contactusEndpoint from "../../services/ApiLinks"
import CountryCode from "../../data/countrycode.json";


function ContactUsForm() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors,isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data) =>{

        try{
            setLoading(true);
            //const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data);
            console.log(data);
            const response = {status:"OK"};
            setLoading(false);
        }
        catch(error){
            console.log(error.message);
            setLoading(false);
        }

    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:""

            })
        }
    },[isSubmitSuccessful,reset])
  return (
    <div>
        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className='flex flex-col gap-6 text-black'>
                <div className='flex gap-6'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='firstName' className='text-sm text-richblack-5 font-inter mb-2'>First Name</label>
                        <input type='text' name='firstName' id='firstName' placeholder='Enter first name' {...register("firstName", {required:true})}
                        className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2'>
                            {
                                errors.firstName && (
                                    <span>
                                        Please enter your first name
                                    </span>
                                )
                            }
                        </input>
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor='lastName' className='text-sm text-richblack-5 font-inter mb-2'>Last Name</label>
                        <input type='text' name='lastName' id='lastName' placeholder='Enter last name' {...register("lastName", {required:true})}
                        className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2'>
                            {
                                errors.lastName && (
                                    <span>
                                        Please enter your last name
                                    </span>
                                )
                            }
                        </input>
                    </div>
                </div>
               

                <div className='flex flex-col'>
                    <label htmlFor='email' className='text-sm text-richblack-5 font-inter mb-2'>Email Address</label>
                    <input type='text' name='email' id='email' placeholder='Enter email address' {...register("email", {required:true})}
                    className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2'>
                        {
                            errors.email && (
                                <span>
                                    Please enter your email address
                                </span>
                            )
                        }
                    </input>
                </div>

                <div className='flex flex-col gap-2'>

                    <label htmlFor='phoneNo' className='text-sm text-richblack-5 font-inter mb-2'>Phone number</label>

                    <div className='flex gap-6'>
                        <select type='text' defaultValue={CountryCode.find(c => c.country === "Canada")?.code} className='w-[10%] text-richblack-5 bg-richblack-800 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2' {...register("countryCode", {required:true})} >
                        {
                            CountryCode.map((ele, index) => {
                                return (
                                <option key={index} value={ele.code}>{ele.code} - {ele.country}</option>
                                )
                            })
                        }
                        </select>

                        <input className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2' type='number' name='phoneNo' id='phoneNo' placeholder='646 456 7890'
                            {...register("phoneNo", {required: {value: true,message: "Please enter your Phone Number.",},
                                    maxLength: { value: 12, message: "Invalid Phone Number" },
                                    minLength: { value: 10, message: "Invalid Phone Number" }, })}>

                        </input>
                    </div>

                    {errors.phoneNo && (
                     <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.phoneNo.message}
                    </span>
                    )}

                </div>

                <div className='flex flex-col'>
                    <label htmlFor='message' className='text-sm text-richblack-5 font-inter mb-2'>Message</label>
                    <textarea className='bg-richblack-800 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md text-richblack-5 font-inter' name='message' id="message" cols={30} rows={7} placeholder='Enter your message here' {...register("message",{required:true})} >
                        {
                            errors.message && (
                                <span>
                                    Please enter your message
                                </span>
                            )
                        }
                    </textarea>
                </div>

                <button type='submit' className='rounded-md text-black bg-yellow-50 text-center px-6 py-3 text-[13px] font-bold hover:scale-95 transition-all duration-200'>Send Message</button>
            </div>

        </form>
    </div>
  )
}

export default ContactUsForm