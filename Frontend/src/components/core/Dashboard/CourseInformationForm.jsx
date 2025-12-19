import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../services/operations/CourseDetailsApi';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import IconButton from "../../common/IconButton";
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../utilities/Constants';
import { MdClose } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md"

function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const {course, setCourse} = useSelector((state) => state.course);
    const {editCourse,setEditCourse} = useSelector((state) => state.course);
    const {step, setStep} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const [chips, setChips] = useState([]);

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);


    const getCategoires= async() => {
            setLoading(true);
            const catgories = await fetchCourseCategories();
            console.log("catgories",catgories);
            if(catgories.length > 0){
                setCourseCategories(catgories);
            }
            setLoading(false);
    }

    useEffect(()=> {

        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseShortDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thimbnail);
        }

        getCategoires();
    },[])

    const isFromUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDescription !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            //currentValues.courseTags !== course.tag ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            //currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements !== course.instructions

        )
        {
            return true;
        }
        else{
            return false;
        }
    }

    const onSubmit = async(data) => {
        
        if(editCourse){
            if (isFromUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);

                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDescription !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDescription);
                }

                if(currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if(currentValues.courseTags !== course.tag) {
                    formData.append("tag", data.courseTags);
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if(currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnail", data.courseImage);
                }

                if(currentValues.courseRequirements !== course.instructions) {
                    formData.append("instructions", data.courseRequirements);
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);

                if(result){
                    setStep(2);
                    dispatch(setCourse(result));
                }

                setLoading(false);
            }
            else{
                toast.error("No changes made")
            }
            return;
        }

        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDescription)
        formData.append("price", data.coursePrice)
        formData.append("tag", data.courseTags);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", data.courseRequirements);
        formData.append("thumbnail", data.courseImage);
        formData.append("instructions", data.courseRequirements);
        formData.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await addCourseDetails(formData, token);

        if(result){
            setStep(2);
            dispatch(setCourse(result));
        }

        setLoading(false);
    }

    useEffect(() => {
        setValue("courseRequirements", requirementList);
    }, [requirementList])


    const handleAddRequirement = () =>{
        if(requirement){
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) =>{
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList); 

    }

    useEffect(() => {
        if (editCourse) {
            setChips(course?.tag)
        }
    }, [])

    useEffect(() => {
        setValue("courseTags", chips)
    }, [chips])

    // Function to handle user input when chips are added
    const handleKeyDown = (event) => {
        // Check if user presses "Enter" or ","
        if (event.key === "Enter" || event.key === ",") {
        // Prevent the default behavior of the event
        event.preventDefault()
        // Get the input value and remove any leading/trailing spaces
        const chipValue = event.target.value.trim()
        // Check if the input value exists and is not already in the chips array
        if (chipValue && !chips.includes(chipValue)) {
            // Add the chip to the array and clear the input
            const newChips = [...chips, chipValue]
            setChips(newChips)
            event.target.value = ""
        }
        }
    }

    // Function to handle deletion of a chip
    const handleDeleteChip = (chipIndex) => {
        // Filter the chips array to remove the chip with the given index
        const newChips = chips.filter((_, index) => index !== chipIndex)
        setChips(newChips)
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='courseTitle'>Course Title <sup className="text-pink-200">*</sup></label>
                <input id='courseTitle' placeholder=' Enter Course Title'
                {...register("courseTitle", {required:true})}
                className='form-style w-full text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2'
                ></input>
                {
                    errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-yellow-100">Course title is required**</span>
                    )
                }
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='courseShortDescription'>Course Short Description <sup className="text-pink-200">*</sup></label>
                <textarea id='courseShortDescription' placeholder='Enter Description'
                {...register("courseShortDescription", {required:true})} 
                className='form-style resize-x-none min-h-[130px] w-full text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2'
                >
                </textarea>
                {
                    errors.courseShortDescription && (
                        <span className="ml-2 text-xs tracking-wide text-yellow-100">Course description is required**</span>
                    )
                }
            </div>

            <div className='relative flex flex-col space-y-2'>
                <label className="text-sm text-richblack-5" htmlFor='coursePrice'>Course Price <sup className="text-pink-200">*</sup></label>
                <input id='coursePrice' placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true,
                    
                })}
                className='form-style w-full text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-6'
                ></input>
                <HiOutlineCurrencyDollar className='absolute top-8 text-richblack-400 left-1'></HiOutlineCurrencyDollar>
                {
                    errors.coursePrice && (
                        <span className="ml-2 text-xs tracking-wide text-yellow-100">Course price is required**</span>
                    )
                }
            </div>

            <div className='flex flex-col space-y-2'>
                <label className="text-sm text-richblack-5" htmlFor='courseCategory'>Course Category <sup className="text-pink-200">*</sup></label>
                <select id='courseCategory' defaultValue="" className='form-style w-full text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2'
                {...register("courseCategory", {required:true})}
                >
                    <option value="" disabled>Choose a category</option>
                    {
                        !loading && courseCategories.map((category,index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span className="ml-2 text-xs tracking-wide text-yellow-100">Course category is required**</span>
                    )
                }
            </div>
            
            <div className="flex flex-col space-y-2">
                    {/* Render the label for the input */}
                    <label className="text-sm text-richblack-5" htmlFor="courseTags">Tags<sup className="text-pink-200">*</sup>
                    </label>
                    {/* Render the chips and input */}
                    <div className="flex w-full flex-wrap gap-y-2">
                        {/* Map over the chips array and render each chip */}
                        {chips.map((chip, index) => (
                        <div
                            key={index}
                            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
                        >
                            {/* Render the chip value */}
                            {chip}
                            {/* Render the button to delete the chip */}
                            <button
                            type="button"
                            className="ml-2 focus:outline-none"
                            onClick={() => handleDeleteChip(index)}
                            >
                            <MdClose className="text-sm" />
                            </button>
                        </div>
                        ))}
                        {/* Render the input for adding new chips */}
                        <input
                        id="courseTags"
                        name="courseTags"
                        type="text"
                        placeholder="Enter Tags and press Enter"
                        onKeyDown={handleKeyDown}
                        className="form-style w-full text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2"
                        {...register("courseTags", {required:true,validate: (value) => value.length > 0})}
                        />
                    </div>

                    {errors.courseTags && (
                        <span className="ml-2 text-xs tracking-wide text-yellow-100">
                        Tags is required
                        </span>
                    )}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseBenefits">Benefits of the course <sup className="text-pink-200">*</sup></label>
                <textarea id='courseBenefits' placeholder='Enter benefits of course'
                {...register("courseBenefits",{required:true})}
                className="form-style resize-x-none min-h-[130px] w-full text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2"
                >
                </textarea>
                {
                    errors.courseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-yellow-100">Course benefits is required**</span>
                    )
                }
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor='courseRequirements'>Requirements/Instructions <sup className="text-pink-200">*</sup></label>
                <div>
                    <input type='text' id='courseRequirements'
                    className='form-style w-full text-richblack-200 bg-richblack-700 shadow-[0_1px_0_rgba(255,255,255,0.18)] rounded-md py-2 px-2'
                    {...register("courseRequirements",{required:true, value:requirement, onChange: (event) => setRequirement(event.target.value)})}
                    placeholder="Enter Benefits of the course"></input>
                    <button type='button' onClick={handleAddRequirement} className='mt-2 font-semibold text-yellow-50'>
                        Add
                    </button>
                </div>

                {
                    requirementList.length > 0 && (
                        <ul>
                            {
                                requirementList.map((item,index) => (
                                    <li key={index} className="flex items-center text-richblack-5">
                                        <span>{item}</span>
                                        <button type='button' onClick={() => handleRemoveRequirement(index)} 
                                        className='ml-2 text-xs text-pure-greys-500'>clear</button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                {
                    errors.courseRequirements &&(
                        <span className="ml-2 text-xs tracking-wide text-yellow-100">
                            Requirements/Instructions is required
                        </span>
                    )
                }
            </div>

        </form>

        <div className='mt-10 place-items-end'>
                {
                    editCourse && (
                        <button onClick={() => dispatch(setStep(2))} className='flex items-center gap-x-2 bg-richblack-300'>
                            Continue without saving
                        </button>
                    )
                }

                <IconButton disabled={loading} text={!editCourse ? "Next" : "Save changes"} children={<MdNavigateNext></MdNavigateNext>}></IconButton>
            
        </div>
    </div>
  )
}

export default CourseInformationForm