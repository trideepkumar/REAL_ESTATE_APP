import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle"

export default function Listing() {

  SwiperCore.use([Navigation])
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(listing);

  const fetchListing = async () => {
    try {
      const res = await axiosInstance.get(`/listing/getList/${params.id}`);
      const data = await res.data;
      console.log(data);
      if (res.status === 200) {
        setListing(data);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [params.id]);

  if (loading) {
    return (
      <p className="text-bold text-center flex m-5 items-center justify-center">
        Loading ...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 text-center ">
        Error occurred while fetching data!!
      </p>
    );
  }

  

  return (
    <main>
       {listing && !error && !loading && (
        <Swiper navigation>
        {listing.images.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[500px] relative"
              style={{
                border: 'solid 40px white',
                borderRadius: '10px', // Optional: Add border radius for rounded corners
                overflow: 'hidden' // Ensure the image stays within the container
              }}
            >
              <img
                src={url}
                alt={`Image ${index}`}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.8)' }} // Optional: Adjust brightness for glass effect
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      )}
    </main>
  );
}
