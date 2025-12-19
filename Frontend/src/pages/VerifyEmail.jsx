import React, { use, useEffect, useState } from 'react'
import Spinner from '../components/common/Spinner';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { sendOtp,signUp } from '../services/operations/AuthApi';
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCountdownTimer } from "react-icons/rx";

function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signUpData,loading} = useSelector( (state) => state.auth);

    useEffect(() => {
        if(!signUpData){
            navigate("/signUp");
        }
    },[])

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword
        } = signUpData;

        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

    

return (
    <div className='flex items-center justify-center w-[28%] mt-[5%] ml-[38%]'>
            {
                    loading ? (<div><Spinner></Spinner></div>) : (
                            <div className='flex flex-col gap-4'>
                                    <h1 className='font-semibold font-inter text-xl text-richblack-5'>Verify email</h1>
                                    <p className='text-richblack-100 text-sm font-inter'>A verification code has been sent to you. Enter the code below</p>
                                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-6'>
                                            <OTPInput
                                                inputStyle={{
                                                    width: "12%"
                                                }}
                                                containerStyle={{ display: "flex", gap: "20px", width:"100%"}}
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={6}
                                                renderInput={(props) => <input {...props} className='text-richblack-5 bg-richblack-800 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2'></input>}
                                            />
                                            <button type='submit' className='bg-yellow-50 font-inter font-medium rounded-md border-2 text-sm py-2 text-richblack-900'>Verify email</button>
                                    </form>
                                    <div className='flex justify-between'>
                                             <div className='flex items-center text-richblack-5 gap-2'>
                                                    <FaArrowLeftLong></FaArrowLeftLong>
                                                    <Link to="/login">
                                                            <p>Back to login</p>
                                                    </Link>
                                            </div>
                                            <button onClick={() => dispatch(sendOtp(signUpData.email,navigate))} className='flex items-center text-blue-100 gap-x-2'>
                                                <RxCountdownTimer></RxCountdownTimer>
                                                Resend it
                                            </button>
                                    </div>
                                 
                            </div>
                    )
            }
    </div>
)
}

export default VerifyEmail