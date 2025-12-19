import React from 'react'
import { toast } from "react-hot-toast"
import { setUser } from "../../slices/ProfileSlice"
import { apiConnector } from "../ApiConnector"
import { settingsEndpoints } from "../ApiLinks"
import { logout } from "./AuthApi"

const {
  UPDATE_DISPLAY_PICTURE_API,
  REMOVE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
            Authorization: `Bearer ${token}`,
          
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")

      let user = JSON.parse(localStorage.getItem("user")) || {};
      user.image = response.data.data.image;

      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function removeDisplayPicture(token, imageUrl) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try{
      if(imageUrl.includes("dicebear")){
        toast.error("No Image to Remove");
        toast.dismiss(toastId);
        return
      }

      const response = await apiConnector(
        "PUT",
        REMOVE_DISPLAY_PICTURE_API,
        {
          image: imageUrl,
        },
        {
          Authorization: `Bearer ${token}`
        }
      )

      console.log(
        "REMOVE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Remove Picture Updated Successfully");

      let user = JSON.parse(localStorage.getItem("user")) || {};
      user.image = response.data.data.image;

      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));

    }
    catch(error){
      console.log("REMOVE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Remove Display Picture")
    }
    toast.dismiss(toastId);
  }

  
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      let user = JSON.parse(localStorage.getItem("user")) || {};

      if (!user.additionalDetails) {
        user.additionalDetails = {};
      }

      user.additionalDetails.gender = response.data.profileDetails.gender;
      user.additionalDetails.about = response.data.profileDetails.about;
      user.additionalDetails.contactNumber = response.data.profileDetails.contactNumber;
      user.additionalDetails.dateOfBirth = response.data.profileDetails.dateOfBirth;

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export function deleteProfile(token, imageUrl, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {


      if(!imageUrl.includes("dicebear")) {
          await apiConnector("PUT",REMOVE_DISPLAY_PICTURE_API,
          {
            image: imageUrl,
          },
          {
            Authorization: `Bearer ${token}`
          }
          )

      }

      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}