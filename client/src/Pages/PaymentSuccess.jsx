import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const data = location.state || {};
  const passenger = data.passenger || {};
  // const busData = data.pData || {};
  //   Ticket ID:	66215685cb747ff2b570d063
  //   Payment ID:	pi_3P6ydvSBRlmSf9LE0TXi7ELL
  const [fullData, setFullData] = useState({});
  const [transactionId, setTransactionId] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  console.log("ticketId", ticketId);
  console.log(fullData);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("id");

    axios
      .post(`${process.env.REACT_APP_HOST_URL}/api/retrieve-payment-intent`, {
        paymentIntent: sessionId,
      })
      .then((res) => {
        const transactionId = res.data.transactionId;
        setTransactionId(transactionId);
        setFullData(res.data.fuLLdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);
  const createTicket = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_URL}/ticket/newTicket`,
        {
          passengerName: fullData.passengerDetails.name,
          passengerAge: fullData.passengerDetails.age,
          passengerGender: fullData.passengerDetails.gender,
          seatNumber: fullData.data.seatBooked,
          email: fullData.passengerDetails.email,
          number: fullData.passengerDetails.mobileNumber,
          from: fullData.data.from,
          to: fullData.data.to,
          date: fullData.data.date,
          paymentId: transactionId,
          busName: fullData.data.name,
          busNumber: fullData.data.busNumber,
          totalPrice: fullData.data.totalPrice,
        }
      );
      if (response.data.success !== false) {
        // passenger.ticket_id = response.data._id;
        setTicketId(response.data.Ticket._id);
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
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_URL}/trip/newtrip`,
        {
          from: fullData.data.from,
          to: fullData.data.to,
          busOwnerId: fullData.data.busOwnerID,
          startTime: fullData.data.departureTime,
          endTime: fullData.data.arrivalTime,
          category: fullData.data.category,
          SeatBooked: fullData.data.seatBooked,
          animeties_list: fullData.data.animeties_list,
          busFare: fullData.data.seatPrice,
          busName: fullData.data.name,
          busNumber: fullData.data.busNumber,
          totalPrice: fullData.data.totalPrice,
        }
      );
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
  const fetchTicketData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST_URL}/ticket/getTicket`,
        {
          params: {
            paymentId: transactionId,
          },
        }
      );
      setTicketId(response.data.ticket[0]._id);
      console.log(response.data.ticket[0]._id);
    } catch (error) {
      console.log("Error fetching ticket data: " + error.message);
    }
  };

  useEffect(() => {
    const isTicketTripCreated = localStorage.getItem("transactionId");

    if (transactionId && transactionId !== isTicketTripCreated) {
      createTicket();
      createTrip();
      localStorage.setItem("transactionId", transactionId);
    } else {
      fetchTicketData();
    }
  }, [transactionId]);
  // console.log(fullData);
  return (
    <div className="container mt-4 mb-4 w-4/5 mx-auto px-2 py-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center flex-col mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Booking Confirmation
        </h1>
        <img
          src="https://previews.123rf.com/images/outchill/outchill1711/outchill171118157/90391927-confirmed-text-written-on-green-simple-circle-rubber-vintage-stamp.jpg"
          alt="Logo"
          className="w-50 h-40 mt-2"
        />
      </div>

      <div className="mb-8 w-3/4 m-auto">
        <h2 className="text-lg font-semibold mb-2">Ticket Details</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold">Ticket ID:</td>
                <td>{ticketId ? ticketId : ""}</td>
              </tr>
              <tr>
                <td className="font-semibold">Payment ID:</td>
                <td>{transactionId}</td>
              </tr>
              <tr>
                <td className="font-semibold">Bus Name:</td>
                <td>{fullData.data?.name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Passenger Details:</td>
                <td>
                  {fullData.passengerDetails?.name},{" "}
                  {fullData.passengerDetails?.gender &&
                    fullData.passengerDetails?.gender.toUpperCase().slice(0, 1)}
                  , {fullData.passengerDetails?.age} yrs
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Seat Booked:</td>
                <td>{fullData.data?.seatBooked.join(", ")}</td>
              </tr>
              <tr>
                <td className="font-semibold">Contact Details:</td>
                <td>{fullData.passengerDetails?.mobileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full md:w-3/4 mx-auto">
        <h2 className="text-lg font-semibold mb-2">Bus Details</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{fullData.data?.name}</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600">Rating: {fullData.data?.rating}</p>
            </div>
            <div>
              <p className="text-gray-600">
                {fullData.data?.from} to {fullData.data?.to}
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{fullData.data?.category}</p>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-gray-600">{fullData.data?.from}</p>
              <p className="text-gray-600">( Mahavir Bus Station )</p>
            </div>
            <div>
              <p className="text-gray-600">{fullData.data?.to}</p>
              <p className="text-gray-600">( South Civil Line )</p>
            </div>
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-4">
              {fullData.data?.amenities?.map((amenity, index) => (
                <li key={index} className="text-blue-500">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
