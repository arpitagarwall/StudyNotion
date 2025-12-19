import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Spinner from "../components/common/Spinner";

function Dashboard() {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if (authLoading || profileLoading){
      return (
        <div><Spinner></Spinner></div>
      )
    }
    
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <Sidebar></Sidebar>
      <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
        <div className='mx-auto w-11/12 lg:max-w-[1072px] py-10'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Dashboard