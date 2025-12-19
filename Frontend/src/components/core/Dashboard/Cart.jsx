import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../slices/CartSlice';
import IconButton from "../../common/IconButton";

function Cart() {

    const {cart, total, totalItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log(courses);
    }

  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courser in Cart</p>
        {
            total > 0 ? (
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <div className="flex flex-1 flex-col">
                            {
                                cart.map((course, index) => (
                                    <div key={course._id} className={`flex w-full flex-wrap items-start justify-between gap-6 ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"}`}>
                                        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                                            <img src={course?.thumbnail} className="h-[148px] w-[220px] rounded-lg object-cover"></img>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-lg font-medium text-richblack-5">{course?.name}</p>
                                                <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-yellow-5">4.8</span>
                                                    <ReactStars count={5} size={20} edit={false} activeColor="#FFD700" 
                                                    emptyIcon={<GiNinjaStar></GiNinjaStar>} fullIcon={<GiNinjaStar></GiNinjaStar>}>
                                                    </ReactStars>
                                                    <span className="text-richblack-400">{course?.ratingAndReviews.length}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end space-y-2">
                                            <button onClick={() => dispatch(removeFromCart(course._id))} className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200">
                                                <RiDeleteBin6Line></RiDeleteBin6Line>
                                                Remove
                                            </button>
                                            <p className="mb-6 text-3xl font-medium text-yellow-100">$ {course.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
                            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
                            <p className="mb-6 text-3xl font-medium text-yellow-100">$ {total}</p>

                            <IconButton text="Buy Now" onClick={handleBuyCourse()} customClasses="w-full justify-center"></IconButton>
                        </div>
                    </div>) 
            :   (
                    <p className="mt-14 text-center text-3xl text-richblack-100">
                        Your cart is empty.
                    </p>
                )
        }
    </div>
  )
}

export default Cart