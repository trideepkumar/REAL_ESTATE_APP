import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase/Firebase.jsx";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  setCookie
} from "../redux/user/userSlice.jsx";
import axiosInstance from "../api/axiosInstance.jsx";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //for the percentage calculation in the profile picture upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      function getCookieValue(cookieName) {
        const cookie = document.cookie
          .split(';')
          .map(cookie => cookie.trim())
          .find(cookie => cookie.startsWith(`${cookieName}=`));
      
        return cookie ? cookie.substring(cookieName.length + 1) : null;
      }
            const accessTokenValue = getCookieValue('access_token');
      console.log(accessTokenValue);
      
      const token = accessTokenValue

      const res = await axiosInstance.post(
        `/user/update/${currentUser.user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.status === 200) {
        console.log("hello world")
        console.log(document.cookie)
        dispatch(updateUserSuccess(res.data));
        }
      else {
        dispatch(updateUserFailure(res.data.message));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData?.avatar || currentUser.user.avatar}
          alt=""
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload(image must be below 2mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-green-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-800">
              Profile Pic Updated Successfully!
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3  rounded-lg"
          defaultValue={currentUser.user.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email "
          className="border p-3  rounded-lg"
          defaultValue={currentUser.user.email}
          onChange={handleChange}
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3  rounded-lg"
          value="************"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer"> Delete account </span>
        <span className="text-red-700 cursor-pointer"> sign out </span>
      </div>
    </div>
  );
}
