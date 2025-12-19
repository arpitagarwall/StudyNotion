import {React,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom"
import { getPasswordResetToken } from '../services/operations/AuthApi';
import { FaArrowLeftLong } from "react-icons/fa6";
import Spinner from "../components/common/Spinner";


function ForgotPassword() {

    const {loading} = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));

    }

  return (
    <div className= 'flex justify-center items-center w-[25%] mt-[5%] ml-[38%]'>
        {
            loading ? (<div><Spinner></Spinner></div>) : (
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold font-inter text-xl text-richblack-5'>
                        {
                            !emailSent ? "Reset your password" : "Check email"
                        }
                    </h1>
                    <p className='text-richblack-100 text-sm font-inter'>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-6'>
                        {
                            !emailSent && (
                                <label>
                                    <p className='text-richblack-5 text-xs font-inter'>Email Address <span className='text-pink-400'>*</span></p>
                                    <input required
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder='Enter your email address' className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2'>
                                    </input>
                                </label>
                            )
                        }
                        <button type='submit' className='bg-yellow-50 font-inter rounded-md border-2 text-sm py-2 text-richblack-900'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    
                    <div className='flex items-center text-richblack-5 gap-2'>
                        <FaArrowLeftLong></FaArrowLeftLong>
                        <Link to="/login">
                            <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword