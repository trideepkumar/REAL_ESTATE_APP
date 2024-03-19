import React, { useState } from "react";
import { app } from "../Firebase/Firebase.jsx";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axiosInstance from "../api/axiosInstance.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "sale",
    bedroom: 0,
    bathroom: 0,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    furnished: false,
  });
  const [imageuploadError, setImageuploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);



  const handleImage = (e) => {
    setLoading(true);
    e.preventDefault();

    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageuploadError(false);
          setLoading(false);
        })
        .catch((err) => {
          setImageuploadError("Only less than 2mb files is supported !");
        });
    } else {
      setImageuploadError("Maximum 6 images is to be uploaded !");
      setLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${progress}% uploaded`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("Upload atleast 1 image !");
      }
      if (formData.regularPrice < formData.discountPrice) {
        return setError(
          "Discount Price must be lower than the Regular Price !"
        );
      }
      setLoader(true);
      function getCookieValue(cookieName) {
        const cookie = document.cookie
          .split(";")
          .map((cookie) => cookie.trim())
          .find((cookie) => cookie.startsWith(`${cookieName}=`));

        return cookie ? cookie.substring(cookieName.length + 1) : null;
      }
      const accessTokenValue = getCookieValue("access_token");
      console.log(accessTokenValue);

      const token = accessTokenValue;
      const res = await axiosInstance.post(
        "/listing/create",
        {
          ...formData,
          userRef: currentUser.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("helo ress");

      const data = await res;
      console.log("res res respose", data.status);
      if (data.status === 200) {
        console.log("data._id",data.data._id)
        console.log("listing created succeddfully !!");
        setLoader(false);
        navigate(`/listing/${data.data._id}`)
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoader(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl  font-semibold text-center my-7">Create List </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Adress"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className=" flex gap-10 flex-wrap mx-auto">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-4"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-4"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-4"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-4"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-4"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mx-auto">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedroom"
                min="1"
                max="100"
                className="p-3 rounded-lg"
                required
                onChange={handleChange}
                value={formData.bedroom}
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="baths"
                min="1"
                max="100"
                className="p-3 rounded-lg"
                required
                onChange={handleChange}
                value={formData.baths}
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1000"
                max="100000000000"
                className="p-3 rounded-lg"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-gray-400 text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  className="p-3 rounded-lg"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span className="text-gray-400 text-xs">($/month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="gap-4 rounded w-full flex flex-col flex-1 m-1">
          <input
            onChange={(e) => setFiles(e.target.files)}
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
          <button
            type="button"
            disabled={loading}
            onClick={handleImage}
            className="p-3 m-5 text-green-700 border border-gray-400 rounded uppercase hover:shadow-md hover:bg-gray-200 disabled:opacity-80"
          >
            {loading ? "loading..." : "upload"}
          </button>
          <p className="text-red-500 text-center font-extralight text-sm">
            {imageuploadError && imageuploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="list of images"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-500 rounded-lg uppercase hover:opacity-50"
                >
                  Delete
                </button>
              </div>
            ))}
          <button disabled={loader || loading} className="p-3 m-5 bg-blue-300 text-gray-900 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">
            {loader ? "Posting the ad..." : "Create List"}
          </button>
          {error && (
            <p className="text-red-400 text-center text-sm font-mono">
              {error}
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
