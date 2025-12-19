import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconButton from "../../common/IconButton";
import { FiEdit } from "react-icons/fi";

function MyProfile() {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    
  return (
    <div className='mx-auto'>
      <h1 className='font-inter text-3xl text-richblack-5 font-medium mb-10 -ml-12'>My Profile</h1>

      <div className='flex items-center bg-richblack-800 w-[80%] justify-between rounded-md border-[1px] border-richblack-700 p-8 px-12 mb-8'>

        <div className='flex items-center gap-x-4'>

          <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'></img>

          <div className="space-y-1">

            <p className='text-richblack-5 font-semibold font-inter text-lg'>{user?.firstName + " " + user?.lastName}</p>

            <p className='text-richblack-300 font-inter text-sm'>{user?.email}</p>

          </div>

        </div>

        <IconButton onClick={() => navigate("/dashboard/settings")}>
          <FiEdit></FiEdit>
          <span className='text-richblack-900 font-medium font-inter text-base'>Edit</span>
        </IconButton>

      </div>

      <div className='flex flex-col items-center bg-richblack-800 w-[80%] justify-between rounded-md border-[1px] border-richblack-700 p-8 px-12 mb-8 gap-4'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-richblack-5 font-semibold font-inter text-lg'>About</p>
          <IconButton onClick={() => {navigate("/dashboard/settings")}}>
            <FiEdit></FiEdit>
            <span className='text-richblack-900 font-medium font-inter text-base'>Edit</span>
          </IconButton>
        </div>
        <p className='text-richblack-300 font-inter text-sm' alt="Write you answer here ...">{user?.additionalDetails?.about}</p>
      </div>

      <div className='flex flex-col items-center bg-richblack-800 w-[80%] justify-between rounded-md border-[1px] border-richblack-700 p-8 px-12 mb-8 gap-4'>
          <div className='flex justify-between w-full'>
            <p className='text-richblack-5 font-semibold font-inter text-lg'>Personal Details</p>
            <IconButton onClick={() => {navigate("/dashboard/settings")}}>
              <FiEdit></FiEdit>
              <span className='text-richblack-900 font-medium font-inter text-base'>Edit</span>
            </IconButton>
          </div>

          <div className='flex justify-between w-full'>
            <div className='flex flex-col justify-between w-full gap-4'>
              <div>
                <p className='text-richblack-600 text-sm font-inter'>First Name</p>
                <p className='font-medium text-richblack-5 font-inter text-sm'>{user?.firstName}</p>
              </div>

              <div>
                <p className='text-richblack-600 text-sm font-inter'>Email</p>
                <p className='text-richblack-300 font-inter text-sm'>{user?.email}</p>
              </div>

              <div>
                <p className='text-richblack-600 text-sm font-inter'>Gender</p>
                <p className='font-medium text-richblack-5 font-inter text-sm'>{user?.additionalDetails?.gender ?? "Add gender"}</p>
              </div>

            </div>

            <div className='flex flex-col justify-between w-full'>
              
              <div>
                <p className='text-richblack-600 text-sm font-inter'>Last Name</p>
                <p className='font-medium text-richblack-5 font-inter text-sm'>{user?.lastName}</p>
              </div>

              <div>
                <p className='text-richblack-600 text-sm font-inter'>Phone Number</p>
                <p className='font-medium text-richblack-5 font-inter text-sm'>{user?.additionalDetails?.contactNumber ?? "Add phone number"}</p>
              </div>

              <div>
                <p className='text-richblack-600 text-sm font-inter'>Date of Birth</p>
                <p className='font-medium text-richblack-5 font-inter text-sm'>{user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}</p>
              </div>
            </div>
          </div>

          
      </div>
      
    </div>
  )
}

export default MyProfile