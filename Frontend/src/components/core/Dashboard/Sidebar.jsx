import React, { useState } from 'react';
import {sidebarLinks} from "../../../data/dashboard-links";
import {logout} from "../../../services/operations/AuthApi";
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal';
import Spinner from "../../common/Spinner";

function Sidebar() {

    const {user,loading:profileLoading} = useSelector(state => state.profile);
    const {loading:authLoading} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (authLoading || profileLoading){
      return (
         <div><Spinner></Spinner></div>
      )
    }

  return (
    <div>

        <div className='flex min-w-[222px] flex-col border-r-[1px] h-[calc(100vh-3.5rem)] border-r-richblack-700 bg-richblack-800 py-4'>

            <div className='flex flex-col text-richblack-300 font-inter text-sm font-medium'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type){
                            return null;
                        }
                        return (
                            <SidebarLink link={link} iconName={link.icon} key={link.id}></SidebarLink>
                        )
                    })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>


            <div className='flex flex-col text-richblack-300 font-inter text-sm font-medium gap-2'>
                <SidebarLink link={{name:"Settings", path:"dashboard/settings"}}  iconName="VscSettingsGear"></SidebarLink>
                
                <button onClick={() =>
                 setConfirmationModal(
                  {
                    text1:"Are you sure?",
                    text2:"You will be logged out of your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler:() => dispatch(logout(navigate)),
                    btn2Handler:() => setConfirmationModal(null)

                }
                )} className='text-sm font-medium text-richblack-300'>

                  <div className='flex items-center gap-x-2 ml-2'>
                    <VscSignOut className='text-sm'></VscSignOut>
                    <span>Logout</span>
                  </div>
                </button>
            </div>

        </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
    </div>
  )
}

export default Sidebar