import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SeatSelection = ({ selectBus, journeyTime }) => {
  const { from, to } = selectBus;

  const navigate = useNavigate();
  const totalSeats = selectBus.totalSeats;
  const [preBookedSeats, setPreBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // console.log("preBookedSeats", preBookedSeats);
  // console.log("selectedSeats", selectedSeats);

  const handleSeatClick = (seatNumber) => {
    // console.log(seatNumber);
    if (preBookedSeats.includes(seatNumber)) {
      return;
    }
    // const seatIndex = selectedSeats.indexOf(seatNumber);
    // if (seatIndex === -1) {
    //   setSelectedSeats([...selectedSeats, seatNumber]);
    // } else {
    //   const updatedSeats = [...selectedSeats];
    //   updatedSeats.splice(seatIndex, 1);
    //   // setSelectedSeats(updatedSeats);
    //   selectBus.seatBooked = [...selectedSeats];
    // }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  const Seat = ({ number, isSelected }) => {
    let seatColor = isSelected
      ? "bg-green-500 text-white hover:bg-green-400 "
      : "bg-gray-200 hover:bg-green-400 hover:text-white";
    if (preBookedSeats.includes(number)) { 
      seatColor = "bg-red-500 text-white cursor-not-allowed";
    }
    return (
      <button
        className={`singleSeat w-8 h-7 mr-1 mb-1  rounded-lg border border-gray-300 ${seatColor}`}
        onClick={() => handleSeatClick(number)}
      >
        {number}
      </button>
    );
  };

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
          />
        );
        seatNumber++;
      }
      seatRows.push(
        <div className="mb-4" key={seatNumber}>
          <div className="   ">{rowSeats.slice(0, 3)}</div>
          <div className="   ">{rowSeats.slice(3)}</div>
        </div>
      );
    }

    return seatRows;
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log(selectBus.name);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_HOST_URL}/trip/getTripbyQuery?from=${from}&=${to}&busName=${selectBus.name}`
        );
        // console.log(res.data.trip_Detail[0]);
        const seatBookedNumbers =
          res.data.trip_Detail[0].seatBooked.map(Number);
        setPreBookedSeats(seatBookedNumbers);
        // setSelectedSeats(seatBookedNumbers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); 
  }, [from,to,selectBus.name]);
  return (
    <div className="seatSelectionMainDiv m-auto p-5 ">
      <h2 className="text-center text-2xl font-semibold mb-4">
        Select your seats
      </h2>
      <p className="mt-2 ml-8">
        Selected Seats:{" "}
        {selectedSeats.length > 0
          ? selectedSeats.sort((a, b) => a - b).join(", ")
          : "None"}
      </p>

      {/* ///////////// */}
      <div className="seatSelectionDiv    ">
        <div className=" seatBtnDIV ">{renderSeats()}</div>
        <div className="seatREsultDiv ">
          <h2 className="mb-4 text-lg font-medium">Boarding And Dropping</h2>
          <p className="text-gray-500">
            From: {selectBus.from} - {selectBus.departureTime}
          </p>
          <div className="my-6 text-gray-500">-------------------➤</div>
          <p className="text-gray-500">
            To: {selectBus.to} - {selectBus.arrivalTime}
          </p>
          <div className="mt-6 p-2">
            <p className="mb-2 mt-2 text-left">
              Selected Seats: {selectedSeats.join(", ")}
            </p>
            <p className="font-medium ">
              Amount: ₹ {selectBus.seatPrice * selectedSeats.length}
            </p>
          </div>
        </div>
      </div>
      {/* ///////////// */}
      <div className="mx-auto text-center mt-4">
        <button
          disabled={!selectedSeats.length}
          className={`inline-block ${
            !selectedSeats.length
              ? "bg-green-200 cursor-not-allowed"
              : "bg-green-400 hover:bg-green-500"
          } focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 text-white px-8 py-4 rounded-lg transition duration-300 ease-in-out text-lg`}
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
