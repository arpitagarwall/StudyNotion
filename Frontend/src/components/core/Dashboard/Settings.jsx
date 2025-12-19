import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateDisplayPicture } from "../../../services/operations/SettingsApi";
import { removeDisplayPicture } from '../../../services/operations/SettingsApi';
import CountryCode from "../../../data/countrycode.json";
import { useForm } from 'react-hook-form';
import IconButton from "../../common/IconButton";
import { FaRegCalendar } from "react-icons/fa6";
import { updateProfile } from '../../../services/operations/SettingsApi'; 
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from '../../../services/operations/SettingsApi'; 
import { FiTrash2 } from "react-icons/fi";
import { deleteProfile } from '../../../services/operations/SettingsApi';

function Settings() {
    const {user} = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const {
            register:registerProfile,
            handleSubmit:handleSubmitProfile,
            watch:watchGender,
            formState : {errors:errorsProfile}
        } = useForm({defaultValues: {gender: user?.additionalDetails?.gender || "Male",},});
    
    const {
        register:registerPassword,
        handleSubmit:handleSubmitPassword,
        reset:resetPasswordInput,
        formState: { errors:errorsPassword },
        } = useForm()


    const selectedGender = watchGender("gender");
    const options = ["Male", "Female", "Other"];

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = () => {
        fileInputRef.current.click()
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0]
            if (file) { 
                fileUpload(file);
            }
    }

    const fileUpload = async (file) => {
            try{
                setLoading(true);
                const formData = new FormData()
                formData.append("displayPicture", file);
                await dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
                })
                
            }
            catch(error){
                console.log("ERROR MESSAGE - ", error.message);
            }
            
    }

    const handleRemove = async () => {

        try
        {
            setLoading(true);
            await dispatch(removeDisplayPicture(token,user.image)).then(() => {
            setLoading(false)
            })
                
        }
        catch(error){
            console.log("ERROR MESSAGE - ", error.message);
        }

    }

    const submitProfileForm = async (data) => {
        try {
            dispatch(updateProfile(token, data))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    const submitPasswordForm = async (data) => {
        try {
            await changePassword(token, data);
            resetPasswordInput();
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    async function handleDeleteAccount() {
        try {
            dispatch(deleteProfile(token, user.image, navigate))
        } 
        catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

  return (
    <div className='mx-auto'>
        <h1 className='font-inter text-3xl text-richblack-5 font-medium mb-10 -ml-12'>Edit Profile</h1>

        <div className='flex items-center bg-richblack-800 w-[80%] gap-8 rounded-md border-[1px] border-richblack-700 p-8 px-12 mb-8'>
            <img src={user?.image} alt={`profile-${user?.firstName}`} 
            className='aspect-square w-[78px] rounded-full object-cover'></img>
            <div className='flex flex-col gap-4'>
                <h1 className='text-richblack-25 font-medium font-inter text-base'>Change Profile Picture</h1>
                <input type='file' ref={fileInputRef} onChange={handleFileChange} 
                className='hidden' accept='image/png, image/gif, image/jpeg'></input>
                <div className='flex gap-10'>
                    <button className={`bg-yellow-50 text-richblack-900 font-medium text-base py-2 px-4 rounded-md shadow-[inset_-0.5px_-1.5px_0_rgba(0,0,0,0.12) flex items-center gap-2 ${loading ? "opacity-50": "opacity-100"}`} onClick={handleUpload} disabled={loading}>Change</button>
                    <button className={`bg-richblack-700 text-richblack-50 py-2 px-4 rounded-md border font-medium text-base font-inter border-richblack-600 flex items-center gap-2 ${loading ? "opacity-50": "opacity-100"}`} onClick={handleRemove} disabled={loading}>Remove</button>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmitProfile(submitProfileForm)}>
            <div className='flex flex-col bg-richblack-800 w-[80%] gap-8 rounded-md border-[1px] border-richblack-700 p-8 px-12 mb-8'>

                <h1 className='text-richblack-5 font-semibold font-inter text-lg text-left'>Profile Information</h1>

                <div className='flex justify-between items-center w-full gap-4'>
                    <div className='flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>First Name</p>
                        <input className='text-richblack-5 bg-richblack-700 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2' type='text' value={user?.firstName} disabled={true} name='firstName' placeholder='Enter your first name'></input>
                    </div>
                    <div className='flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>Last Name</p>
                        <input className='text-richblack-5 bg-richblack-700 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2' type='text' value={user?.lastName} disabled={true} name='lastName' placeholder='Enter your last name'></input>
                    </div>
                </div>

                <div className='flex justify-between items-center w-full gap-4'>
                    <div className='flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>Date of Birth<sup className='text-pink-200'>*</sup></p>
                        <div className='flex relative'>
                            <input type='date'
                            name="dateOfBirth"
                            id="dateOfBirth"
                            {...registerProfile("dateOfBirth", {
                            required: {
                            value: true,
                            message: "Please enter your Date of Birth.",
                            },
                            max: {
                            value: new Date().toISOString().split("T")[0],
                            message: "Date of Birth cannot be in the future.",
                            },
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth ?.split('.')?.reverse()?.join('-')}
                            className='form-style text-richblack-200 bg-richblack-700 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] 
                            rounded-md py-2 px-2 [&::-webkit-calendar-picker-indicator]:opacity-0'>
                            
                            </input>
                            <FaRegCalendar className='text-richblack-200 -ml-7 mt-3 hover:cursor-pointer'></FaRegCalendar>
                        </div>
                        
                        {errorsProfile.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errorsProfile.dateOfBirth.message}
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>Gender<sup className='text-pink-200'>*</sup></p>
                        <div className='flex gap-8 bg-richblack-700 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2'>
                            {options.map((opt) => (
                            <label
                                key={opt}
                                className="flex items-center gap-2 font-inter font-medium text-richblack-200 text-base"
                            >
                                <input
                                type="radio"
                                value={opt}
                                name='gender'
                                id={`gender` + opt}
                                {...registerProfile("gender", {
                                required: {
                                message: "Please select your Gender.",
                                },
                                })}
                                className="form-style peer hidden"
                                ></input>
                                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedGender === opt ? "border-yellow-50" : "border-richblack-500"}`}>
                                    <span className={`w-3 h-3 rounded-full ${selectedGender === opt ? "bg-yellow-50" : "bg-richblack-700"}`}>
                                    </span>
                                </span>
                                {opt}
                            </label>
                            ))}
                        </div>
                    </div>
                
                </div>

                <div className='flex justify-between items-center w-full'>
                    <div className='flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>Phone number<sup className='text-pink-200'>*</sup></p>
                        <div className='flex gap-6'>
                            <select type='text' defaultValue={CountryCode.find(c => c.code === "+" + String(user?.additionalDetails?.contactNumber || "").slice(0, 2))?.code} 
                                className='w-[20%] text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2' {...registerProfile("countryCode", {required:true})} >
                            {
                                CountryCode.map((ele, index) => {
                                    return (
                                    <option key={index} value={ele.code}>{ele.code} - {ele.country}</option>
                                    )
                                })
                            }
                            </select>

                            <input className='form-style text-richblack-200 bg-richblack-700 w-[70%] shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2' type='number' name='contactNumber' id='contactNumber' placeholder='646 456 7890'
                                {...registerProfile("contactNumber", {required: {value: true,message: "Please enter your Phone Number.",},
                                        maxLength: { value: 12, message: "Invalid Phone Number" },
                                        minLength: { value: 10, message: "Invalid Phone Number" }, })} defaultValue={String(user?.additionalDetails?.contactNumber || "").slice(2)}>

                            </input>
                        </div>
                        {errorsProfile.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                {errorsProfile.contactNumber.message}
                                </span>
                        )}
                    </div>

                    
                    <div className='flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>About</p>
                        <input type='text' placeholder='Enter Bio Details' defaultValue={user?.additionalDetails?.about} id='about' name='about'
                        className='text-richblack-200 bg-richblack-700 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2 form-style'
                            {...registerProfile("about", {
                                required: {
                                value:true,
                                message: "Please enter about yourself.",
                                },
                            })}
                        >
                        </input>
                        {errorsProfile.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errorsProfile.about.message}
                            </span>
                        )}
                    </div>
                </div>

            </div>

            <div className="flex justify-end w-[80%] gap-2 mb-8">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                    Cancel
                </button>
                <IconButton type="submit" text="Save"></IconButton>
            </div>
        </form>

        <form onSubmit={handleSubmitPassword(submitPasswordForm)}>

            <div className='flex flex-col bg-richblack-800 w-[80%] gap-8 rounded-md border-[1px] border-richblack-700 p-8 px-12 mb-8'>
                <h1 className='text-richblack-5 font-semibold font-inter text-lg text-left'>Password</h1>

                <div className='flex justify-between items-center w-full gap-4'>

                    <div className='relative flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>Current Password<sup className='text-pink-200'>*</sup></p>
                        <input className='text-richblack-5 form-style bg-richblack-700 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2'
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter Current Password"
                        {...registerPassword("oldPassword", { required: true })}>
                        </input>
                        <span
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute right-3 top-7 z-[10] cursor-pointer"
                        >
                            {showOldPassword ? (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>
                            ) : (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"></AiOutlineEyeInvisible>
                            )}
                        </span>
                        {errorsPassword.oldPassword && (
                        <span className="text-[12px] text-yellow-100">
                            Please enter your Current Password.
                        </span>
                        )}
                    </div>

                    <div className='relative flex flex-col w-[50%]'>
                        <p className='text-sm font-inter font-normal text-richblack-200'>New Password<sup className='text-pink-200'>*</sup></p>
                        <input className='text-richblack-5 form-style bg-richblack-700 w-full shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2'
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter New Password"
                            {...registerPassword("newPassword", { required: true })}>
                        </input>
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-7 z-[10] cursor-pointer"
                        >
                            {showNewPassword ? (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>
                            ) : (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"></AiOutlineEyeInvisible>
                            )}
                        </span>
                        {errorsPassword.newPassword && (
                        <span className="text-[12px] text-yellow-100">
                            Please enter your New Password.
                        </span>
                        )}
                    </div>
                </div>

            </div>

        <div className="flex justify-end w-[80%] gap-2 mb-8">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
            Cancel
          </button>
          <IconButton type="submit" text="Update"></IconButton>
        </div>
        </form>

        <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12 w-[80%]">
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
            <FiTrash2 className="text-3xl text-pink-200" />
            </div>
            <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-richblack-5">
                Delete Account
            </h2>
            <div className="w-3/5 text-pink-25">
                <p>Would you like to delete account?</p>
                <p>
                This account may contain Paid Courses. Deleting your account is
                permanent and will remove all the contain associated with it.
                </p>
            </div>
            <button
                type="button"
                className="w-fit cursor-pointer italic text-pink-300"
                onClick={handleDeleteAccount}
            >
                I want to delete my account.
            </button>
            </div>
        </div>

        
    </div>
  )
}

export default Settings