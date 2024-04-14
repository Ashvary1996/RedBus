import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BusPage = () => {
  const location = useLocation();
  const searchData = location.state;
  const { from, to, date } = searchData;
  console.log(from, to, date);
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [filter, setFilter] = useState({
    departure: [],
    arrival: [],
    category: "",
    windowSeats: [],
    busRating: [],
    busOperator: [],
  });

  const [selectBus, setSelectedBus] = useState({
    seatBooked: [],
    busFare: "",
  });
  console.log(selectBus);

  useEffect(() => {
    axios
      .get("http://localhost:5000/state/getBuses")
      .then((res) => {
        const data = res.data.data;
        const addToggleWithData = data.map((bus) => ({
          ...bus,
          toggle: false,
        }));
        const displayData = [...addToggleWithData];
        // if (filter) {
        // }

        setBuses(displayData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handelBusSelection = (bus) => {
    const updatedBuses = buses.map((b) => ({
      ...b,
      toggle: b.name === bus.name ? !b.toggle : false,
    }));
    setSelectedBus((prevSelectBus) => ({
      ...prevSelectBus,
      ...bus,
      seatLeft: bus.totalSeats - selectBus.seatBooked.length,
      toggle: !prevSelectBus.toggle,
      from,
      to,
      date,
    }));
    setBuses(updatedBuses);
  };
  const calculateTotalTime = (departureTime, arrivalTime) => {
    const departureDate = new Date(`2000-01-01T${departureTime}:00`);
    const arrivalDate = new Date(`2000-01-01T${arrivalTime}:00`);

    if (arrivalDate < departureDate) {
      arrivalDate.setDate(arrivalDate.getDate() + 1);
    }

    const totalTravelTimeMs = arrivalDate.getTime() - departureDate.getTime();

    const totalTravelHours = Math.floor(totalTravelTimeMs / (1000 * 60 * 60));
    const totalTravelMinutes = Math.floor(
      (totalTravelTimeMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    const formattedTotalTravelTime = `${totalTravelHours} hours ${totalTravelMinutes} minutes`;

    return formattedTotalTravelTime;
    // console.log(formattedTotalTravelTime);
  };
  // console.log("selectBus", selectBus);
  return (
    <div className="busPageSelection ">
      <div className="mainDiv ">
        {/* Filter  */}
        <div
          id="selectionForm"
          name="leftColForFilter"
          className="w-[20%] p-2 "
        >
          <div className="flex flex-row justify-between ">
            <h1>Filter</h1>
            <button
              onClick={() =>
                setFilter({
                  departure: [],
                  arrival: [],
                  category: "",
                  windowSeats: [],
                  busRating: [],
                  busOperator: [],
                })
              }
            >
              Clear All
            </button>
          </div>
          <div name="selection-field">
            <div>
              <h1>Departure Time</h1>
              <input type="checkbox" id="morning" className="cursor-pointer" />
              <label htmlFor="morning" className="cursor-pointer">
                Morning Session
              </label>
              <br />
              <input
                type="checkbox"
                id="afternoon"
                className="cursor-pointer"
              />
              <label htmlFor="afternoon" className="cursor-pointer">
                Afternoon Session
              </label>
              <br />
              <input type="checkbox" id="evening" className="cursor-pointer" />
              <label htmlFor="evening" className="cursor-pointer">
                Evening Session
              </label>
            </div>
            {/* ------ */}
            <div>
              <h1>Arrival Time</h1>
              <input type="checkbox" id="amorning" className="cursor-pointer" />
              <label htmlFor="amorning" className="cursor-pointer">
                Morning Session
              </label>
              <br />
              <input
                type="checkbox"
                id="aafternoon"
                className="cursor-pointer"
              />
              <label htmlFor="aafternoon" className="cursor-pointer">
                Afternoon Session
              </label>
              <br />
              <input type="checkbox" id="aevening" className="cursor-pointer" />
              <label htmlFor="aevening" className="cursor-pointer">
                Evening Session
              </label>
            </div>
            {/* -------------------- */}
            <div>
              <h1>Category</h1>
              <input
                type="radio"
                name="category"
                id="acCategory"
                className="cursor-pointer"
                onClick={() => setFilter({ ...filter, category: "A/C" })}
              />
              <label htmlFor="acCategory" className="cursor-pointer">
                A/C
              </label>
              <br />
              <input
                type="radio"
                id="nonAcCategory"
                name="category"
                className="cursor-pointer"
                onClick={() => setFilter({ ...filter, category: "Non A/C" })}
              />
              <label htmlFor="nonAcCategory" className="cursor-pointer">
                Non A/c
              </label>
              <br />
              <input
                type="radio"
                id="acSleeperCategory"
                name="category"
                className="cursor-pointer"
                onClick={() =>
                  setFilter({ ...filter, category: "A/C Sleeper" })
                }
              />
              <label htmlFor="acSleeperCategory" className="cursor-pointer">
                A/C Sleeper
              </label>
              <br />
              <input
                type="radio"
                id="nonAcSleeperCategory"
                name="category"
                className="cursor-pointer"
                onClick={() =>
                  setFilter({ ...filter, category: "Non A/C Sleeper" })
                }
              />
              <label htmlFor="nonAcSleeperCategory" className="cursor-pointer">
                Non A/C Sleeper
              </label>
              <br />
              <input
                type="radio"
                id="acSeaterCategory"
                name="category"
                className="cursor-pointer"
                onClick={() => setFilter({ ...filter, category: "A/C Seater" })}
              />
              <label htmlFor="acSeaterCategory" className="cursor-pointer">
                A/C Seater
              </label>
              <br />
              <input
                type="radio"
                id="nonAcSeaterCategory"
                name="category"
                className="cursor-pointer"
                onClick={() =>
                  setFilter({ ...filter, category: "Non A/C Seater" })
                }
              />
              <label htmlFor="nonAcSeaterCategory" className="cursor-pointer">
                Non A/C Seater
              </label>
              <br />
            </div>

            <div>
              <h1>Bus Operator</h1>
              <input
                type="checkbox"
                id="eicherOperator"
                className="cursor-pointer"
                onClick={() =>
                  setFilter({ ...filter, busOperator: "Eicher Motors Rating" })
                }
              />
              <label htmlFor="eicherOperator" className="cursor-pointer">
                Eicher Motors Rating
              </label>
              <br />
              <input
                type="checkbox"
                id="bharatBenzOperator"
                className="cursor-pointer"
                onClick={() =>
                  setFilter({ ...filter, busOperator: "BharatBenz Rating" })
                }
              />
              <label htmlFor="bharatBenzOperator" className="cursor-pointer">
                BharatBenz
              </label>
              <br />
              <input
                type="checkbox"
                id="volvoOperator"
                className="cursor-pointer"
                onClick={() =>
                  setFilter({ ...filter, busOperator: "Volvo Buses" })
                }
              />
              <label htmlFor="volvoOperator" className="cursor-pointer">
                Volvo Buses
              </label>
              <br />
              <input
                type="checkbox"
                id="tataMotorsOperator"
                className="cursor-pointer"
                onClick={() =>
                  setFilter({ ...filter, busOperator: "Tata Motors" })
                }
              />
              <label htmlFor="tataMotorsOperator" className="cursor-pointer">
                Tata Motors
              </label>
              <br />
            </div>

            {/* -------------------- */}
            <div>
              <h1>Window Seats Availability</h1>
              <input
                type="checkbox"
                id="kolkata-drop"
                name="window-seats"
                className="cursor-pointer"
              />
              <label htmlFor="kolkata-drop" className="cursor-pointer">
                1
              </label>
              <br />
              <input
                type="checkbox"
                id="mumbai-drop"
                name="window-seats"
                className="cursor-pointer"
              />
              <label htmlFor="mumbai-drop" className="cursor-pointer">
                2
              </label>
              <br />
              <input
                type="checkbox"
                id="bangalore-drop"
                name="window-seats"
                className="cursor-pointer"
              />
              <label htmlFor="bangalore-drop" className="cursor-pointer">
                4
              </label>
            </div>

            {/* -------------------- */}
            <div>
              <h1>Bus Rating</h1>
              <input
                type="checkbox"
                id="four-star"
                className="cursor-pointer"
              />
              <label htmlFor="four-star" className="cursor-pointer">
                4 star or more
              </label>
              <br />
              <input
                type="checkbox"
                id="three-star"
                className="cursor-pointer"
              />
              <label htmlFor="three-star" className="cursor-pointer">
                3 star or more
              </label>
              <br />
              <input
                type="checkbox"
                id="zero-two-star"
                className="cursor-pointer"
              />
              <label htmlFor="zero-two-star" className="cursor-pointer">
                0-2 star
              </label>
            </div>
            {/* -------------------- */}
          </div>
        </div>
        {/* //////////////////////// */}

        <div className="border-2 border-red-500 p-2 w-full">
          {/* <div name="dateNavigation">Date Appears here</div> */}
          {/* Buses Div Starts from here */}
          <div name="buses" className="flex flex-col">
            {buses.map((bus, i) => {
              const {
                amenities,
                category,
                name,
                rating,
                totalSeats,
                totalWindowSeatsAvailable,
                toggle,
                departureTime,
                arrivalTime,
                seatPrice,
              } = bus;

              const journeyTime = calculateTotalTime(
                departureTime,
                arrivalTime
              );

              return (
                <div key={i}>
                  <div>
                    <div className="flex justify-between">
                      <div className="border-4 p-4 mr-4">
                        <h1 className="text-lg mb-2 font-bold">
                          {name}
                          <p className="inline text-sm text-gray-500 ml-2">
                            Rating {rating}
                          </p>
                        </h1>
                        <p className="mb-2 text-sm">
                          {category} | {totalSeats} seats left |{" "}
                          {totalWindowSeatsAvailable} windows seats
                        </p>
                        <div className="flex mb-2">
                          <p className="mr-2">{departureTime},</p>
                          {/* <p className="mr-2">{date}</p> */}
                          <p className="mr-2">----{journeyTime}----</p>
                          <p>
                            {arrivalTime}, {date}
                          </p>
                        </div>
                        <div className="flex mb-2 text-sm text-blue-500 gap-2">
                          {amenities.map((elem, i) => (
                            <div key={i}>
                              <p className="mr-2">{elem}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2">Trip Cost</p>
                        <h1 className="text-red-600 text-2xl mb-4">
                          Rs {seatPrice}
                        </h1>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            // console.log(bus);
                            handelBusSelection(bus);
                            selectBus.busFare = seatPrice;
                          }}
                        >
                          View Seat
                        </button>
                      </div>
                    </div>
                    {/* Toggle DIv For Seat Selsection  */}
                    {toggle && (
                      <button
                        className="bg-green-700"
                        onClick={() =>
                          navigate("/travellerPage", {
                            state: { selectBus, journeyTime },
                          })
                        }
                      >
                        Proceed to next Page
                      </button>
                    )}
                    {/* Toggle DIv Ended For Seat Selsection  */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BusPage;
