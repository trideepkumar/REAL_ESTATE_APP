import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {getStorage, uploadBytesResumable} from 'firebase/storage'
import { app } from "../Firebase/Firebase.jsx";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);

  useEffect(()=>{
    console.log('helo')
    if(file){
      handleFileUpload(file)
    }
  },[file])

  const handleFileUpload = (file) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime()+file.name
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred/
      snapshot.totalBytes) *100;
      console.log('upload is '+ progress+'%done')
      console.log("hello")
    }
    )
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onChange={(e) => setFile(e.target.files[0])}
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt=""
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3  rounded-lg"
          value={currentUser.username}
        />
        <input
          type="email"
          id="email"
          placeholder="email "
          className="border p-3  rounded-lg"
          value={currentUser.email}
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3  rounded-lg"
          value="************"
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
