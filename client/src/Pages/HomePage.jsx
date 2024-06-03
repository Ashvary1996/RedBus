import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setCities,
  setFrom,
  setTo,
  setDate,
  setError,
  setStatus,
} from "../redux/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cities, from, to, date } = useSelector((state) => state.booking);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_HOST_URL}/state/getCities`
        );
        const cityAndState = res.data.data.flatMap((elem) =>
          elem.districts.map((district) => `${district}, ${elem.state}`)
        );

        dispatch(setCities(cityAndState.sort()));
      } catch (error) {
        console.error("Error fetching cities:", error.message);
        dispatch(setError(error.message));
      }
    };
    fetchCities();
  }, [dispatch]);

  const handleSearch = () => {
    if (from && to && date) {
      dispatch(setStatus("loading"));
      navigate("/busAndSeatpage", { state: { from, to, date } });
    } else {
      toast.warn("Select All Field", { pauseOnFocusLoss: false });
    }
  };

  return (
    <div className="flex justify-center pt-10 min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="container mx-auto px-4 w-full md:w-3/4">
        <h1 className="text-4xl text-center mb-8 text-red-600 font-extrabold">
          Book Your Trip
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fromLocation" className="block font-semibold mb-2">
              From:
            </label>
            <select
              id="fromLocation"
              name="fromLocation"
              value={from}
              onChange={(e) => dispatch(setFrom(e.target.value))}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select City, And State</option>
              {cities.map((elem, i) => (
                <option key={i} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="toLocation" className="block font-semibold mb-2">
              To:
            </label>
            <select
              id="toLocation"
              name="toLocation"
              value={to}
              onChange={(e) => dispatch(setTo(e.target.value))}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select City, And State</option>
              {cities.map((elem, i) => (
                <option key={i} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateInput" className="block font-semibold mb-2">
              Travel Date
            </label>
            <input
              type="date"
              id="dateInput"
              name="dateInput"
              value={date}
              onChange={(e) => dispatch(setDate(e.target.value))}
              className="cursor-pointer w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          className={`w-full mt-4 bg-orange-500 text-white font-medium rounded-lg py-3 ${
            !from || !to || !date
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-orange-600"
          }`}
          onClick={handleSearch}
          // disabled={!from || !to || !date}
        >
          Search
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">John Doe</p>
                    <p className="text-gray-600 text-sm">
                      Travelled from A to B
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Great experience! Comfortable seats and friendly staff."
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 mb-10 bg-red-600 text-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
          <h2 className="text-2xl font-bold mb-4">ENJOY THE APP!</h2>
          <ul className="mb-4">
            <li className="mb-2">Quick access</li>
            <li className="mb-2">Superior live tracking</li>
          </ul>
          <div className="rating mb-4 md:mb-0">
            <p className="text-xl font-bold">4.6</p>
            <p>50M+ downloads</p>
          </div>
          <div className="download flex flex-col items-center md:flex-row flex-wrap gap-6">
            <div className="store mb-4 md:mb-0">
              <p className="text-lg font-bold">Play Store</p>
              <p className="text-xl font-bold">4.6</p>
              <p>50M+ downloads</p>
            </div>
            <div className="store mb-4 md:mb-0 flex items-center">
              <p className="text-lg font-bold">App Store</p>
              <p className="hidden md:block">Scan to download</p>
              <img
                src="https://s1.rdbuz.com/web/images/homeV2/qrCode.svg"
                alt="QR Code"
                className="w-16 h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
