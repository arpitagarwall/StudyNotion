import {Children, React, useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import { sendOtp } from "../../../services/operations/AuthApi"
import { setSignUpData } from "../../../slices/AuthSlice"
import { useDispatch } from "react-redux"
import { ACCOUNT_TYPE } from "../../../utilities/Constants"

function SignUpForm({accountType, setAccountType}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changeHandler(event){

        setFormData((prevData) =>({
            ...prevData,
            [event.target.name]:event.target.value
        }))

    }

    function submitHandler(event){
        event.preventDefault();
        if(formData.password !== formData.confirmPassword){
            toast.error("Password do not match");
            return;
        }

        const signUpData = {
            ...formData,
            accountType,
        }

        dispatch(setSignUpData(signUpData))
        dispatch(sendOtp(formData.email, navigate))

        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword: ""
        })

        setAccountType(ACCOUNT_TYPE.STUDENT);

    }
  return (
    <div>
        <form onSubmit={submitHandler}>

            <div className='flex gap-x-4 mt-4'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                    <input required type='text' name='firstName' onChange={changeHandler} placeholder='Enter first name' value={formData.firstName}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-500'></input>
                </label>

                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                    <input required type='text' name='lastName' onChange={changeHandler} placeholder='Enter last name' value={formData.lastName}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-500'></input>
                </label>
            </div>

            <div className='w-full mt-4'>
                <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email address<sup className='text-pink-200'>*</sup></p>
                        <input required type='email' name='email' onChange={changeHandler} placeholder='Enter email' value={formData.email}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-500'></input>
                </label>
            </div>
            


           <div className='flex gap-x-4 mt-4'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create password<sup className='text-pink-200'>*</sup></p>
                    <input required type={showPassword ? ('text') : ('password')} name='password' onChange={changeHandler} placeholder='Enter password' value={formData.password}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-500'></input>
                    <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (<AiOutlineEye fontSize={24} fill='#AFB2BF'></AiOutlineEye>) : (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'></AiOutlineEyeInvisible>)}
                    </span>
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm password<sup className='text-pink-200'>*</sup></p>
                    <input required type={showConfirmPassword ? ('text') : ('password')} name='confirmPassword' onChange={changeHandler} placeholder='Confirm password' value={formData.confirmPassword}
                    className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b border-richblack-500'></input>
                    <span className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? (<AiOutlineEye fontSize={24} fill='#AFB2BF'></AiOutlineEye>) : (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'></AiOutlineEyeInvisible>)}
                    </span>
                </label>
           </div>

           <button type='submit' className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full'>Create account</button>
        </form>

    </div>
  )
}

export default SignUpForm