import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TravellerDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const pData = location.state.selectBus;
  const {
    from,
    to,
    date,
    category,
    name,
    rating,
    totalWindowSeatsAvailable,
    arrivalTime,
    busNumber,
    busOwnerID,
    departureTime,
    SeatBooked,
    seatLeft,
    seatPrice,
    totalPrice,
    animeties_list,
    totalSeats,
  } = location.state.selectBus;
  const journeyTime = location.state.journeyTime;
  const tax = Math.floor((8 / 100) * seatPrice);
  const other = Math.floor((5 / 100) * seatPrice);
  const [passenger, setPassengerDetail] = useState({
    ticket_id: "",
    name: "",
    gender: "",
    age: "",
    email: "",
    mobileNumber: "",
    from: from,
    to: from,
  });
  // console.log(pData);
  // console.log(passenger);
  const handelPassengerFn = (e) => {
    const { name, value } = e.target;
    setPassengerDetail((prevPassengerDetails) => ({
      ...prevPassengerDetails,
      [name]: value,
    }));
  };

  const handelPaymentFn = async () => {
    axios
      .post("http://localhost:5000/ticket/newTicket", {
        passengerName: passenger.name,
        passengerAge: passenger.age,
        passengerGender: passenger.gender,
        seatNumber: ["2F", "4N"],
        email: passenger.email,
        totalPrice: 298,
        number: passenger.mobileNumber,
        from: from,
        to: to,
        date: date,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success !== false) {
          passenger.ticket_id = response.data.Ticket._id;
          console.log("Ticket created successfully:", response.data.Ticket._id);
          // navigate("/payment", { state: { pData, passenger } });
        } else {
          console.error("Failed to create ticket");
        }
      })
      .catch((error) => {
        console.error("Error creating ticket:", error);
      });

    axios
      .post("http://localhost:5000/trip/newtrip", {
        from,
        to,
        busOwnerId: busOwnerID,
        startTime: departureTime,
        endTime: arrivalTime,
        category,
        SeatBooked: ["2", "3Fn"],
        bus_no: busNumber,
        animeties_list: animeties_list,
        busFare: seatPrice,
        busName: name,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success !== false) {
          passenger.ticket_id = response.data.success;
          console.log("Trip created successfully:", response.data.tripDetail);
          // navigate("/payment", { state: { pData, passenger } });
        } else {
          console.error("Failed to create ticket");
        }
      })
      .catch((error) => {
        console.error("Error creating ticket:", error);
      });
    navigate("/stripPaymentGateway", { state: { pData, passenger } });
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4">
          <div className="w-full md:w-2/3 md:mr-4 mb-4 md:mb-0">
            <h1 className="text-lg font-bold mb-2">
              {name} Rating{" "}
              <span className="text-sm text-gray-500">{rating}</span>
            </h1>
            <p className="mb-2 text-sm">
              {category} | {totalSeats} seats left | {totalWindowSeatsAvailable}{" "}
              windows seats
            </p>
            <div className="flex mb-2">
              <p className="mr-2">{departureTime},</p>
              <p className="mr-2">{journeyTime}</p>
              <div>
                {arrivalTime},
                <p className="inline-block text-gray-600">{date}</p>
              </div>
            </div>

            <div className="flex justify-between mb-2 text-sm text-blue-600 gap-2">
              <div>
                <p className="mr-2">{from}</p>
                <p className="mr-2">( Mahavir Bus Station )</p>
              </div>
              <div>
                <p className="mr-2">{to}</p>
                <p className="mr-2">( South Civil Line )</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="mb-2">Fare Detail</p>
              <div className="flex flex-col mb-4">
                <div className="flex justify-between mb-2">
                  <p>Bus Fare</p>
                  <p className="font-bold">Rs {seatPrice}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Tax</p>
                  <p className="font-bold"> {tax}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Other applied</p>
                  <p className="font-bold"> {other}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Price</p>
                  <p className="font-bold text-2xl">
                    Rs {seatPrice + tax + other}
                  </p>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handelPaymentFn()}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <h1 className="text-xl font-bold mb-4">Enter Traveller Details</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <h3 className="mb-2 md:mb-0">Passenger {1}</h3>
            <h3 className="mb-2 md:mb-0">Seat {12}</h3>
          </div>

          <form className="flex flex-w md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-2 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => handelPassengerFn(e)}
            />
            <select
              name="gender"
              id="gender"
              className="border-2 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => handelPassengerFn(e)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              name="age"
              placeholder="Age (in yrs)"
              className="border-2 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => handelPassengerFn(e)}
            />
            <input
              type="text"
              name="email"
              placeholder="Email-id"
              className="border-2 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => handelPassengerFn(e)}
            />
            <input
              type="number"
              name="mobileNumber"
              placeholder="Mobile No"
              className="border-2 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => handelPassengerFn(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default TravellerDetail;
