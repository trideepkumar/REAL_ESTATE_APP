import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase/Firebase.jsx";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
  console.log(filePercentage);
  console.log(fileUploadError);
  useEffect(() => {
    console.log(file);
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // const handleFileUpload = (file) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setFilePercentage(progress);
  //       console.log("upload is " + progress + "%done");
  //       console.log("hello");
  //     },
  //     (error) => {
  //       setFileUploadError(true);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
  //         setFormData({ ...formData, avatar: downloadUrl });
  //       });
  //     }
  //   );
  // };
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
        console.log("upload is " + progress + "% done");
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          src={formData.avatar|| currentUser.avatar}
          alt=""
        />
       <p className="text-center">
  {fileUploadError ? (
    <span className="text-red-700">Error Image Upload(image must be below 2mb)</span>
  ) : (
    filePercentage > 0 && filePercentage < 100 ? (
      <span className="text-green-700">{`Uploading ${filePercentage}%`}</span>
    ) : filePercentage === 100 ? (
      <span className="text-green-800">Profile Pic Updated Successfully!</span>
    ) : (
      ""
    )
  )}
</p>

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
