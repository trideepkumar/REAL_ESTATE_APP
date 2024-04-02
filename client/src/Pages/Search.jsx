import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import CardPlacehoderSkeleton from "../components/Placeholders/CardPlacehoderSkeleton.jsx";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Search() {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);

  console.log("listing", listing);

  console.log(sidebarData);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setSidebarData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search/${searchQuery}`);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const res = await axiosInstance.get(`/listing/get?${urlParams}`);
      setListing(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sidebarData]);

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="border border-slate-700 rounded-md p-2 m-1 lg:mt-2 border-b-2 shadow-lg sm:border-r-2 sm:w-full md:w-1/4 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div
            className="p-3 flex items-center gap-2  bg rounded-md"
            style={{ background: "#363636" }}
          >
            <input
              type="text"
              id="searchTerm"
              placeholder="What are you looking for ?"
              className="border rounded-md border-white shadow-lg p-3 w-full "
              style={{ background: "#242424", color: "#ffffff" }}
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="p-3 rounded-md" style={{ background: "#363636" }}>
            <select
              id="type"
              className="block appearance-none w-full  border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              style={{ background: "#242424", color: "#ffffff" }}
              value={sidebarData.type}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
              <option value="offer">Offer</option>
            </select>
          </div>

          <div className="p-3 rounded-md" style={{ background: "#363636" }}>
            <select
              id="sort_order"
              className="block appearance-none w-full  border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              style={{ background: "#242424", color: "#ffffff" }}
              defaultValue={"created_at_desc"}
              onChange={handleChange}
            >
              <option value="regular_price_desc">Recently added</option>
              <option value="regular_price_asc">Price high to low</option>
              <option value="createdAt_desc">Price low to high</option>
              <option value="createdAt_asc">Older Ads</option>
            </select>
          </div>

          <button className="rounded-lg  border    p-2 m-3 hover:text-white text-orange-500 hover:border-white border-orange-500 hover:opacity-90">
            Search
          </button>
        </form>
      </div>

      <div className="border w-full m-3 rounded-lg border-slate-700 p-7 flex flex-wrap justify-between">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="border w-80 m-2 rounded-lg border-slate-700 p-7 h-80 animate-pulse"
            >
              <CardPlacehoderSkeleton />
            </div>
          ))
        ) : listing.length === 0 ? (
          <div className="text-white text-2xl overflow-auto font-bold shadow-lg p-4 border rounded-lg h-20 m-20">
            NO DATA AVAILABLE
          </div>
        ) : (
          listing.map((item, index) => (
            <div
              className="p-1 border text-white border-gray-600 h-[420px] rounded-md"
              onClick={() => navigate(`/listing/${item._id}`)}
              key={index}
            >
              <div
                className="relative my-1 flex flex-col shadow-md bg-clip-border rounded-xl w-64 card"
                style={{ background: "#242323" }}
              >
<div className="relative mx-2 mt-4  hover:scale-105 transition-all  o overflow-hidden bg-clip-border rounded-xl h-36 cursor-pointer hover:cursor-pointer">
                    <img
                      src={item.images[0]||"https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"}
                      alt="placeholder-image"
                      className="object-fill w-full h-full"
                    />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {item.name && (
                        <span className="inline-block max-w-[150px] overflow-hidden text-blue-gray-900 whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </p>

                    
                  </div>
                  <p className="block font-sans text-white  text-xl  font-bold antialiased font-xl leading-relaxed ">
                      ${item.regularPrice}
                    </p>
                  <div>
                    <p className="font-sans text-xs antialiased font-fa-xs leading-relaxed text-blue-gray-900 flex items-center">
                      {item.address && (
                        <span className="flex items-center max-w-[150px] overflow-hidden text-blue-gray-900 whitespace-nowrap">
                          <FaMapMarkerAlt className="mr-1" />
                          {item.address}
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {" "}
                    {item.description && (
                      <span className="inline-block  max-w-[200px] overflow-hidden text-blue-gray-900 whitespace-nowrap">
                        {item.description}
                      </span>
                    )}
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <button
                    className="align-middle border select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-white shadow-none  hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                    onClick={() => navigate(`/listing/${item._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
