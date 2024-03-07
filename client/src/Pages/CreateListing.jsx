import React, { useState } from "react";
import {app} from '../Firebase/Firebase.jsx'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";


export default function CreateListing() {
   
   const [files,setFiles] = useState([])
   const [formData,setFormData] = useState({
    imageUrls : []
   })
   const [imageuploadError,setImageuploadError] = useState(false)

   console.log("formData",formData)

   const handleImage =   (e) => {
        e.preventDefault()
        if(files.length > 0 && files.length < 7){
             const promises = []

             for(let i=0; i< files.length;i++){
              promises.push(storeImage(files[i]))
             }

             Promise.all(promises).then((urls)=>{
              setFormData({ ...formData, imageUrls:formData.imageUrls.concat(urls)})
              setImageuploadError(false)
             }).catch(err){
              setImageuploadError('0-6 images maximum')
             }
        }
   }

   const storeImage = async(file)=>{
          return new Promise ((resolve,reject)=>{
            const storage = getStorage(app )
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage,fileName)
            const uploadTask =  uploadBytesResumable(storageRef,file)
            uploadTask.on(
              "state_changed",
              (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`${progress}% uploaded`)
              },
              (error)=>{
                reject(error)
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL)
                })
              }
            )
          })
   }

  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl  font-semibold text-center my-7">Create List </h1>
      <form className="flex flex-col sm:flex-row gap-4" >

        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Adress"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="62"
            minLength="10"
            required
          />
          <div className=" flex gap-10 flex-wrap mx-auto">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-4" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-4" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mx-auto">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
                min="10"
                max="10"
                className="p-3 rounded-lg"
                required
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="baths"
                min="10"
                max="10"
                className="p-3 rounded-lg"
                required
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="10"
                max="10"
                className="p-3 rounded-lg"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-gray-400 text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="10"
                max="10"
                className="p-3 rounded-lg"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-gray-400 text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-4 rounded w-full flex flex-col flex-1 m-1">
          <input
            onChange={(e)=>setFiles(e.target.files)}
            type="file"
            id="images"
            accept="image/*"
            multiple
            className="border p-3 rounded-lg"
            required
          />
          <div className="">
            <p className="font-semibold m-5">
              Upload Images{" "}
              <span className="font-normal ml-2 text-xs text-gray-400 ">
                (maximum 6 images is to be uploaded)
              </span>
            </p>
          </div>
          <button type="button" onClick={handleImage} className="p-3 m-5 text-green-700 border border-gray-400 rounded uppercase hover:shadow-md hover:bg-gray-200 disabled:opacity-80">
            Upload
          </button>
          <button className="p-3 m-5 bg-blue-300 text-gray-900 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">Create Listing</button>

        </div>

      </form>
    </main>
  );
}
