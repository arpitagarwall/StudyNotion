import {React, useState } from 'react'
import Template from '../components/core/LoginAndSignUp/Template'
import signUpImg from '../assets/Images/signup.webp'
import instructorImg from '../assets/Images/Instructor.png'
import { ACCOUNT_TYPE } from "../utilities/Constants"

function SignUp() {
    const [accountType, setAccountType] = useState("Student");
  return (
    <div>
        <Template title={`${accountType === ACCOUNT_TYPE.STUDENT ? "Join the millions learning to code with StudyNotion for free" : "Teach your way to success"}`} desc1={`${accountType === ACCOUNT_TYPE.STUDENT ? "Build skills for today, tomorrow, and beyond." : "Discover your passions,"}`}  
            desc2={`${accountType === ACCOUNT_TYPE.STUDENT ? "Education to future-proof your career." : "Be Unstoppable"}`} image={accountType === "Student" ? signUpImg : instructorImg} formtype="signUp" accountType={accountType} setAccountType={setAccountType}>
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button className={`${accountType === ACCOUNT_TYPE.STUDENT ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}>Student</button>
                <button className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>Instructor</button>
            </div>
        </Template>
    </div>
  )
}

export default SignUp