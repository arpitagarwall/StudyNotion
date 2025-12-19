import React, { useEffect, useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/LoginAndSignUp/ProfileDropDown';
import { apiConnector } from '../../services/ApiConnector';
import { categories } from '../../services/ApiLinks';
import { GoChevronDown } from "react-icons/go";

function Navbar() {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const getSubLinks =  async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.allCategories);
            console.log(result.data.allCategories);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
       getSubLinks();
    },[])


    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-600'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to="/">
                <img src={logo} alt='websiteLogo' width={160} height={42} loading='lazy'></img>
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25 font-inter'>
                    {
                        NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                        <div className='flex gap-2 items-center group relative'>
                                            <p>{link.title}</p>
                                            <GoChevronDown className='hover:cursor-pointer'></GoChevronDown>

                                            <div className='absolute left-[50%] top-full hidden flex-col rounded-md 
                                            bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:flex
                                            group-hover:opacity-100 lg:w-[200px] p-4 -translate-x-[34%] mt-2 z-50'>

                                                <div className='absolute left-[50%] -top-2 h-6 w-6 rotate-45 rounded
                                                bg-richblack-5 -translate-x-[50%] '>

                                                </div>

                                                <div className='flex flex-col justify-center items-center gap-2 font-inter text-richblack-800 w-[100%]'>
                                                     {
                                                    subLinks.length ? (
                                                        
                                                        subLinks.map((subLink, index) => (
                                                            <Link to={`/catalog/${subLink.name}`} key={index}>
                                                                <p className='hover:text-black hover:text-lg transition-all duration-200'>{subLink.name}</p>
                                                            </Link>
                                                        ))
                                                        
                                                    ) : (<div></div>)
                                                    }
                                                </div>
                                               

                                            </div>
                                        </div>
                                        ) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            <div className='flex gap-x-4 items-center'>

                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                            {
                                totalItems > 0 && (
                                    <span>{totalItems}</span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login" className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'><button>Log in</button></Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signUp" className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'><button>Sign up</button></Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown></ProfileDropDown>
                }

            </div>

        </div>
    </div>
  )
}

export default Navbar