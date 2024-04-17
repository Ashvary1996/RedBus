import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

function PassengerDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectBus, journeyTime, selectedSeats } = location.state;
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
    seatPrice,
    animeties_list,
    totalSeats,
  } = selectBus;
  const [data, setData] = useState({});
  console.log(data);
  // selectBus.seatBooked = [...selectedSeats];
  // let totalPrice = selectBus.seatPrice * selectedSeats.length;
  // selectBus.seatPrice = totalPrice;
  // console.log(selectBus.seatPrice);
  // console.log(selectedSeats);
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
  const tax = Math.floor((8 / 100) * seatPrice * selectedSeats.length);
  const other = Math.floor((5 / 100) * seatPrice * selectedSeats.length);
  const totalPrice = seatPrice * selectedSeats.length + tax + other;
  const handelPassengerFn = (e) => {
    const { name, value } = e.target;
    setPassengerDetail((prevPassengerDetails) => ({
      ...prevPassengerDetails,
      [name]: value,
    }));
  };

  const createTicket = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/ticket/newTicket",
        {
          passengerName: passenger.name,
          passengerAge: passenger.age,
          passengerGender: passenger.gender,
          seatNumber: selectedSeats,
          email: passenger.email,
          totalPrice: totalPrice,
          number: passenger.mobileNumber,
          from: from,
          to: to,
          date: date,
        }
      );
      if (response.data.success !== false) {
        passenger.ticket_id = response.data.Ticket._id;
        console.log("Ticket created successfully:", response.data.Ticket._id);
      } else {
        console.error("Failed to create ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const createTrip = async () => {
    try {
      const response = await axios.post("http://localhost:5000/trip/newtrip", {
        from,
        to,
        busOwnerId: busOwnerID,
        startTime: departureTime,
        endTime: arrivalTime,
        category,
        SeatBooked: [],
        bus_no: busNumber,
        animeties_list: animeties_list,
        busFare: seatPrice,
        busName: name,
      });
      if (response.data.success !== false) {
        passenger.ticket_id = response.data.success;
        console.log("Trip created successfully:", response.data.tripDetail);
      } else {
        console.error("Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  const handelPaymentFn = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIP_KEY);
    const body = {
      passengerDetails: passenger,
      data: data,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
      console.log("Response:", response);
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (!result.error) {
        await createTicket();
        await createTrip();
        console.log("Ticket and trip saved successfully.");
        setPassengerDetail({
          ticket_id: "",
          name: "",
          gender: "",
          age: "",
          email: "",
          mobileNumber: "",
          from: from,
          to: from,
        });
        
        console.log("result",result);
      } else {
        console.error("Error redirecting to checkout:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setPassengerDetail({
      ticket_id: "",
      name: "",
      gender: "",
      age: "",
      email: "",
      mobileNumber: "",
      from: from,
      to: from,
    });
    setData({
      ...selectBus,
      journeyTime,
      seatBooked: selectedSeats,
      totalPrice: totalPrice,
    });
  }, [location.state]);

  const isDisabled =
    !passenger.name ||
    !passenger.gender ||
    !passenger.age ||
    !passenger.email ||
    !passenger.mobileNumber;

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
                {arrivalTime},{" "}
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
                  <p className="text-gray-500 text-sm">{`( ₹${seatPrice} *${selectedSeats.length} )`}</p>
                  <p className="font-bold">
                    {" "}
                    Rs {seatPrice * selectedSeats.length}
                  </p>
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
                  <p className="font-bold text-2xl">Rs {totalPrice}</p>
                </div>
              </div>
              <button
                disabled={isDisabled}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full${
                  isDisabled ? " cursor-not-allowed bg-blue-400" : ""
                }`}
                onClick={handelPaymentFn}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 ">
          <h1 className="text-xl font-bold mb-4">Enter Traveller Details</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-2 ml-2">
            <h3 className="mb-2 md:mb-0">Passenger : {selectedSeats.length}</h3>
            <h3 className="mb-2 md:mb-0">Seats : {selectedSeats.join(", ")}</h3>
          </div>
          <form className="flex flex-wrap md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-style p-2"
              onChange={(e) => handelPassengerFn(e)}
            />
            <select
              name="gender"
              id="gender"
              className="input-style p-2"
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
              className="input-style p-2"
              onChange={(e) => handelPassengerFn(e)}
            />
            <input
              type="text"
              name="email"
              placeholder="Email-id"
              className="input-style p-2"
              onChange={(e) => handelPassengerFn(e)}
            />
            <input
              type="number"
              name="mobileNumber"
              placeholder="Mobile No"
              className="input-style p-2"
              onChange={(e) => handelPassengerFn(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default PassengerDetail;
