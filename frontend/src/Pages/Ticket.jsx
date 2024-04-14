import React, { useState, useEffect } from "react";

function Ticket() {
  const [ticketData, setTicketData] = useState(null);

  const fetchTicketData = () => {
    const lastTicket = {
      id: 1,
      from: "City A",
      to: "City B",
      date: "2024-04-15",
    };

    setTicketData(lastTicket);
  };

  useEffect(() => {
    fetchTicketData();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Last Booking Ticket</h2>
        {ticketData ? (
          <div>
            <p className="mb-2">Ticket ID: {ticketData.id}</p>
            <p className="mb-2">From: {ticketData.from}</p>
            <p className="mb-2">To: {ticketData.to}</p>
            <p className="mb-2">Date: {ticketData.date}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Ticket;
