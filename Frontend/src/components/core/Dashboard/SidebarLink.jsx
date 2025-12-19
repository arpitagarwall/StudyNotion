import React from 'react'
import * as VscIcons from "react-icons/vsc"
import * as AiIcons from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

function SidebarLink({link, iconName}) {

    const Icons = {
        ...VscIcons,
        ...AiIcons,
    };
    
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <div>
        <NavLink to={link.path} className={`relative flex items-center px-2 py-2 text-sm font-medium font-inter w-full ${matchRoute(link.path) ? "text-yellow-50 bg-yellow-800" : "text-richblack-300"} transition-all duration-200`}>

            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>
            <div className='flex items-center gap-x-2'>

                <Icon className='text-sm'></Icon>
                <span>{link.name}</span>

            </div>
        </NavLink>
    </div>
  )
}

export default SidebarLink