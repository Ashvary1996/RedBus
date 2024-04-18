import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seat from "./Seat";

const SeatSelection = ({ selectBus, journeyTime }) => {
  const navigate = useNavigate();

  const totalSeats = selectBus.totalSeats;
  // const busCategory = selectBus.category;
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Sleeper                52 seats
  // Semi-Sleeper (2+1)     49seats
  // A/C Seater (2+2)       52 seats
  // Non A/C Seater (3+2)   51 seats

  const handleSeatClick = (seatNumber) => {
    // Checking if the seat is already selected
    const seatIndex = selectedSeats.indexOf(seatNumber);
    if (seatIndex === -1) {
      // if seat is not selected, adding to the selectedSeats array
      setSelectedSeats([...selectedSeats, seatNumber]);
    } else {
      // if seat is already selected, remove it from the selectedSeats array
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(seatIndex, 1);
      setSelectedSeats(updatedSeats);
      selectBus.seatBooked = [...selectedSeats];
    }
  };
  //   console.log("selectedBus_Ki_Book_Walle_Seat", selectBus.seatBooked);
  //   console.log("totalSeats", totalSeats);
  //   selectBus.seatPrice = selectBus.seatPrice * selectedSeats.length;
  // console.log("selectedSeats", selectBus);

  const renderSeats = () => {
    const seatRows = [];
    let seatNumber = 1;

    while (seatNumber <= totalSeats) {
      const rowSeats = [];

      for (let i = 0; i < 5 && seatNumber <= totalSeats; i++) {
        rowSeats.push(
          <Seat
            key={seatNumber}
            number={seatNumber}
            isSelected={selectedSeats.includes(seatNumber)}
            onSelect={handleSeatClick}
          />
        );
        seatNumber++;
      }
      seatRows.push(
        <div className="mb-2   " key={seatNumber}>
          <div className="flex flex-col mb border-2 border-red-500">
            {rowSeats.slice(0, 3)}
          </div>
          <div className="flex flex-col  border-2 border-green-500 mt-20 ">
            {rowSeats.slice(3)}
          </div>
        </div>
      );
    }

    return seatRows;
  };

  return (
    <div className="container m-auto  p-5  ">
      <h2 className="text-2xl font-semibold mb-4">Select your seats</h2>
      <p className="mt-4">
        Selected Seats:{" "}
        {selectedSeats.length > 0
          ? selectedSeats.sort((a, b) => a - b).join(", ")
          : "None"}
      </p>
      <br />
      {/* displaying  */}
      <div className="flex justify-between p-5">
        {/* /////////////// Div  booking seat coloums/selection////////////////// */}

        <div className="flex w-3/4">{renderSeats()}</div>

        {/* /////////////   Div End  booking seat coloums/selection//////////////////// */}
        <div className="text-center w-1/4 border-2 p-4 ">
          <h2>Boarding And Dropping</h2>
          <p className="text-left mt-10 text-gray-500">from</p>
          <div className="flex justify-between ">
            <p>{selectBus.from}</p>
            <p>{selectBus.departureTime}</p>
          </div>
          <div className="flex  justify-start p-16 text-left">
            <div className="text-left justify-start transform rotate-90">
              -------------------➤
            </div>
          </div>
          <p className="text-left mt-10 text-gray-500  ">to</p>
          <div className="flex justify-between">
            <p>{selectBus.to}</p>
            <p>{selectBus.arrivalTime}</p>
          </div>
          <div className="flex justify-between mt-10">
            <p>Seat No: {selectedSeats.sort((a, b) => a - b).join(", ")}</p>
          </div>
          <div className="flex justify-between mt-10">
            <p>Amount</p>
            <p>INR {(selectBus.seatPrice * selectedSeats.length).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="m m-auto text-center">
        <button
          className="bg-green-400  text-white p-5 "
          onClick={() =>
            navigate("/passengerDetail", {
              state: { selectBus, journeyTime, selectedSeats },
            })
          }
        >
          Proceed to next Page
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
