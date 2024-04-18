import React, { useState, useEffect } from "react";
import axios from "axios";

function Ticket() {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTicketData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST_URL}/ticket/getTicket`
      );
      setTicketData(response.data.ticket[response.data.ticket.length - 1]);
    } catch (error) {
      setError("Error fetching ticket data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-md shadow-md overflow-hidden p-4 border-2 m-6">
      <h2 className="text-lg font-semibold mb-4">Last Booking Ticket</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : ticketData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="mb-2">
              <span className="font-semibold">Ticket ID:</span> {ticketData._id}
            </p>
            <p className="mb-2">
              <span className="font-semibold">From:</span> {ticketData.from}
            </p>
            <p className="mb-2">
              <span className="font-semibold">To:</span> {ticketData.to}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(ticketData.bookingDate).toLocaleString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Passenger Name:</span>{" "}
              {ticketData.passengerName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Passenger Age:</span>{" "}
              {ticketData.passengerAge}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Passenger Gender:</span>{" "}
              {ticketData.passengerGender}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {ticketData.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Contact Number:</span>{" "}
              {ticketData.number}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Seat Numbers:</span>{" "}
              {ticketData.seatNumber.join(", ")}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Total Price:</span>{" "}
              {ticketData.totalPrice}
            </p>
          </div>
        </div>
      ) : (
        <p>No ticket data available</p>
      )}
    </div>
  );
}

export default Ticket;
