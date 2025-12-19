import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetPassword } from '../services/operations/AuthApi';

function UpdatePassword() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate =useNavigate();

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const  [showPassword, setShowPassword] = useState(false);
    const  [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);

    const {password,confirmPassword} = formData;
    
    const handleOnChange = (event) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name] : event.target.value
            }

        ))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword,token,navigate))
    }
  return (
    <div className= 'flex justify-center items-center w-[25%] mt-[5%] ml-[38%]'>
        {
            loading ? (<div><Spinner></Spinner></div>) : (
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold font-inter text-xl text-richblack-5'>Choose new password</h1>
                    <p className='text-richblack-100 text-sm font-inter'>Almost done. Enter your new password and you're all set.</p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-6'>
                        <label className='w-full relative'>
                            <p className='text-richblack-5 text-xs font-inter'>New password <span className='text-pink-400'>*</span></p>
                            <input required type={showPassword ? "text" : "password"} name='password' value={password} onChange={handleOnChange} placeholder='Enter new password'
                            className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2'></input>
                            <span onClick={() => setShowPassword((prev) => !prev )} className='absolute right-3 top-[25px] cursor-pointer'>
                                {
                                    showPassword ? <AiOutlineEye fontSize={24} fill='#AFB2BF'></AiOutlineEye> : <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'></AiOutlineEyeInvisible>
                                }
                            </span>
                        </label>

                        <label className='w-full relative'>
                            <p className='text-richblack-5 text-xs font-inter'>Confirm new password <span className='text-pink-400'>*</span></p>
                            <input required type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={confirmPassword} onChange={handleOnChange} placeholder='Enter new confirm password'
                            className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2'></input>
                            <span onClick={() => setShowConfirmPassword((prev) => !prev )} className='absolute right-3 top-[25px] cursor-pointer'>
                                {
                                    showConfirmPassword ? <AiOutlineEye fontSize={24} fill='#AFB2BF'></AiOutlineEye> : <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'></AiOutlineEyeInvisible>
                                }
                            </span>
                        </label>

                        <button type='submit' className='bg-yellow-50 font-inter rounded-md border-2 text-sm py-2 text-richblack-900'>
                                Reset Password
                        </button>

                        <div className='flex items-center text-richblack-5 gap-2'>
                            <FaArrowLeftLong></FaArrowLeftLong>
                            <Link to="/login">
                                <p>Back to login</p>
                            </Link>
                        </div>
                    </form>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword