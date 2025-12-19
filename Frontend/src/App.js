import "./App.css";
import {Route, Routes} from  'react-router-dom';
import {React,useState } from 'react'
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Navbar from "../src/components/common/Navbar";
import OpenRoute from "../src/components/core/LoginAndSignUp/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/LoginAndSignUp/PrivateRoute";
import Error from "../src/pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import {ACCOUNT_TYPE} from "../src/utilities/Constants";
import { useSelector } from "react-redux";
import MyCourses from "../src/components/core/Dashboard/MyCourses"
import AddCourse from "./components/core/Dashboard/AddCourse";



function App() {

  const profile = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<OpenRoute><Login></Login></OpenRoute>}></Route>
        <Route path="/signUp" element={<OpenRoute><SignUp></SignUp></OpenRoute>}></Route>
        <Route path="/forgotPassword" element={<OpenRoute><ForgotPassword></ForgotPassword></OpenRoute>}></Route>
        <Route path="/updatePassword/:id" element={<OpenRoute><UpdatePassword></UpdatePassword></OpenRoute>}></Route>
        <Route path="/verifyEmail" element={<OpenRoute><VerifyEmail></VerifyEmail></OpenRoute>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
        <Route element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
          <Route path="/dashboard/my-profile" element={<MyProfile></MyProfile>}></Route>
          <Route path="/dashboard/settings" element={<Settings></Settings>}></Route>
          {
            profile?.user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route>
                <Route path="/dashboard/cart" element={<Cart></Cart>}></Route>
              </>
            )
          }
          {
            profile?.user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/my-courses" element={<MyCourses></MyCourses>}></Route>
                <Route path="dashboard/add-course" element={<AddCourse></AddCourse>}></Route>
              </>
            )
          }
        </Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
