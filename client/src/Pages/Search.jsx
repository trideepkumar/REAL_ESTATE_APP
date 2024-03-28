import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="border border-slate-700 rounded-md p-2 m-1 lg:mt-2 border-b-2 shadow-lg sm:border-r-2 sm:w-full md:w-1/4 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="p-3 flex items-center gap-2">
            <input
              type="text"
              id="searchTerm"
              placeholder="What are you looking for ?"
              className="border rounded-md border-white shadow-lg p-3 w-full "
              style={{ background: "#242424", color: "#ffffff" }}
            />
          </div>
          <div className="flex gap-3 mx-4 flex-wrap">
            <label>Type : </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-4" />
              <span>All</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-4" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-4" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Offer" className="w-4" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mx-4">
            <label>Filter :</label>
            <select
              id="sort-order"
              style={{ background: "#242424", color: "#ffffff" }}
              className="border rounded-md p-1"
            >
              <option> Price high to low</option>
              <option> Price low to high</option>
              <option> Recently added</option>
              <option> Older Ad's</option>
            </select>
          </div>
          <button className="rounded-lg border p-2 hover:text-white text-orange-500 hover:border-white border-orange-500 hover:opacity-90">
            Search
          </button>
        </form>
      </div>

      <div className="border w-full m-3 rounded-lg  border-slate-700 p-7">
        <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-64">
          <div class="relative mx-2  mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-36">
            <img
              src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
              alt="card-image"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                Apple AirPods
              </p>
              <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                $95.00
              </p>
            </div>
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              With plenty of talk and listen time, voice-activated Siri access,
              and an available wireless charging case.
            </p>
          </div>
          <div class="p-6 pt-0">
            <button
              class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              type="button"
            >
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
