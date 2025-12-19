import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformationForm';
import CourseBuilder from './CourseBuilder';

function AddCourse() {

    const {step} = useSelector((state) => state.course);
    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
         {
            id: 2,
            title: "Course Builder"
        },
         {
            id: 3,
            title: "Publish"
        }
    ]


  return (
    <div className="flex w-full items-start gap-6">
        <div className="flex flex-col w-[60%]">
            <div className="mb-2 flex flex-col gap-6 text-3xl font-medium text-richblack-5">

                <h1>Add Course</h1>

                <div className="flex">
                    <div className="relative flex w-full justify-center gap-1">
                        {steps.map((items,index) => (
                            <>
                                <div className="flex flex-col items-center" key={index}>
                                    <button
                                        className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                                        step === items.id
                                            ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                                            : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                        } ${step > items.id && "bg-yellow-50 text-yellow-50"}} `}
                                    >
                                        {step > items.id ? (
                                        <FaCheck className="font-bold text-richblack-900" />
                                        ) : (
                                            items.id
                                        )}
                                    </button>
                                </div>
                                {items.id !== steps.length && (
                                    
                                    <div className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-[2px] ${step > items.id  ? "border-yellow-50" : "border-richblack-500"} `}>

                                    </div>
                                    
                                )}
                            </>
                        ))}

                    </div>

                </div>

                <div className="relative mb-10 flex w-full select-none justify-between">
                            {steps.map((items,index) => (
                                <div className="flex min-w-[130px] flex-col items-center gap-y-2" key={index}>
                                    <p className={`text-sm ${step >= items.id ? "text-richblack-5" : "text-richblack-500"}`}>{items.title}</p>
                                </div>
                            ))}
                        </div>
            </div>
            {step === 1 && <CourseInformationForm></CourseInformationForm>}
            {step == 2 && <CourseBuilder></CourseBuilder>}
            {/* {step == 3 && <PublishForm></PublishForm>} */}
        </div>

        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
                <p className="mb-8 text-lg text-richblack-5">⚡Course upload tips</p>
                <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
        </div>

    </div>
  )
}

export default AddCourse