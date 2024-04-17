import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SeatSelection from "../components/SeatSelection";

const BusAndSeatSelectionPage = () => {
  const location = useLocation();
  const searchData = location.state;
  const { from, to, date } = searchData;
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [selectBus, setSelectedBus] = useState({
    seatBooked: [],
    busFare: "",
  });
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/state/getBuses")
      .then((res) => {
        const data = res.data.data.map((bus) => ({
          ...bus,
          toggle: false,
        }));

        setBuses(data);
        setFilteredBuses(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handelBusSelection = (bus) => {
    console.log(bus);
    bus.toggle == false ? (bus.toggle = true) : (bus.toggle = false);

    setSelectedBus((prevSelectBus) => ({
      ...prevSelectBus,
      ...bus,
      seatLeft: bus.totalSeats - selectBus.seatBooked.length,
      from,
      to,
      date,
    }));
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
  function convertStringToNumber(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 100 + minutes;
  }
  const handelFilter = () => {
    const checkedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const checkedRadios = document.querySelectorAll(
      'input[type="radio"]:checked'
    );

    const selectedFilters = [...checkedCheckboxes, ...checkedRadios].map(
      (input) => input.value
    );
    console.log(selectedFilters);
    let filteredBuses = buses;

    if (selectedFilters.length > 0) {
      filteredBuses = buses.filter((bus) => {
        return selectedFilters.some((selectedFilter) => {
          // Filter FOr Departure Time//////////////////
          if (
            selectedFilter === "dMorning" ||
            selectedFilter === "dAfternoon" ||
            selectedFilter === "dEvening"
          ) {
            const timeInNumber = convertStringToNumber(bus.departureTime);
            if (selectedFilter === "dMorning") {
              return timeInNumber < 1200;
            } else if (selectedFilter === "dAfternoon") {
              return timeInNumber >= 1200 && timeInNumber < 1800;
            } else if (selectedFilter === "dEvening") {
              return timeInNumber >= 1800;
            }
          }
          // Filter FOr Arrival Time//////////////////
          if (
            selectedFilter === "aMorning" ||
            selectedFilter === "aAfternoon" ||
            selectedFilter === "aEvening"
          ) {
            const timeInNumber = convertStringToNumber(bus.arrivalTime);
            if (selectedFilter === "aMorning") {
              return timeInNumber < 1200;
            } else if (selectedFilter === "aAfternoon") {
              return timeInNumber >= 1200 && timeInNumber < 1800;
            } else if (selectedFilter === "aEvening") {
              return timeInNumber >= 1800;
            }
          }
          // Filter by Category //////////////////
          if (
            selectedFilter === "sleeper" ||
            selectedFilter === "semi_sleeper" ||
            selectedFilter === "a/c_seater" ||
            selectedFilter === "none_a/c_seater"
          ) {
            if (selectedFilter === "sleeper") {
              return bus.category == "Sleeper";
            } else if (selectedFilter === "semi_sleeper") {
              return bus.category == "Semi-Sleeper (2+1)";
            } else if (selectedFilter === "a/c_seater") {
              return bus.category == "A/C Seater (2+2)";
            } else if (selectedFilter === "none_a/c_seater") {
              return bus.category == "Non A/C Seater (3+2)";
            }
          }
          // Filter by Bus Operator //////////////////
          if (
            selectedFilter === "ashok_leyland" ||
            selectedFilter === "mitshuba" ||
            selectedFilter === "volvos" ||
            selectedFilter === "tata"
          ) {
            if (selectedFilter === "ashok_leyland") {
              return (
                bus.name == "Ashok Leyland - Skyline" ||
                bus.name == "Ashok Leyland - Skyline Deluxe"
              );
            } else if (selectedFilter === "mitshuba") {
              return bus.name == "Mitsubishi Fuso - Yutong";
            } else if (selectedFilter === "volvos") {
              return (
                bus.name == "Volvo 9400 - Goldline" ||
                bus.name == "Volvo B9R - Marco Polo" ||
                bus.name == "Volvo B11R - Silverline" ||
                bus.name == "Volvo B7R - Greenline" ||
                bus.name == "Eicher Motors - Volvo"
              );
            } else if (selectedFilter === "tata") {
              return (
                bus.name == "Tata Motors - Marcopolo" ||
                bus.name == "Tata Motors - Starbus Deluxe"
              );
            }
          }
          if (
            selectedFilter === "4star+" ||
            selectedFilter === "3star+" ||
            selectedFilter === "0to2star"
          ) {
            if (selectedFilter === "4star+") {
              return bus.rating >= 4;
            } else if (selectedFilter === "3star+") {
              return bus.rating >= 3;
            } else if (selectedFilter === "0to2star") {
              return bus.rating >= 0 && bus.rating <= 2;
            }
          }

          // Adding more filter conditions
          return false;
        });
      });

      filteredBuses.sort((a, b) => {
        const sortTimeA = convertStringToNumber(a.departureTime);
        const sortTimeB = convertStringToNumber(b.departureTime);
        return sortTimeA - sortTimeB;
      });
    }

    setFilteredBuses(
      filteredBuses.map((bus) => ({ ...bus, toggle: bus.toggle }))
    );
  };

  const clearFilters = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.checked = false;
    });

    handelFilter();
  };
  // console.log("selectBus", selectBus);
  return (
    <div className="busPageSelection ">
      <div className="mainDiv ">
        {/* Filter  */}
        {/* /////////////////////////// Filter Div Started    ///////////////////////////////////// */}

        <div
          id="selectionForm"
          name="leftColForFilter"
          className="w-full md:w-2/5 lg:w-2/6 p-2"
        >
          <div className="flex flex-row justify-between">
            <h1>Filter</h1>
            <button onClick={clearFilters}>Clear All</button>
          </div>
          <div
            name="selection-field"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            <div>
              <h2>Departure Time</h2>
              <input
                type="checkbox"
                name="departureRadio"
                id="morning"
                className="cursor-pointer"
                value="dMorning"
                onChange={(e) => handelFilter(e)}
              />
              <label htmlFor="morning" className="cursor-pointer">
                Morning
              </label>
              <br />
              <input
                type="checkbox"
                // name="departureRadio"
                id="afternoon"
                className="cursor-pointer"
                value="dAfternoon"
                onChange={(e) => handelFilter(e)}
              />
              <label htmlFor="afternoon" className="cursor-pointer">
                Afternoon
              </label>
              <br />
              <input
                type="checkbox"
                name="departureRadio"
                id="evening"
                value="dEvening"
                onChange={(e) => handelFilter(e)}
                className="cursor-pointer"
              />
              <label htmlFor="evening" className="cursor-pointer">
                Evening
              </label>
            </div>
            {/* ------ */}
            <div>
              <h2>Arrival Time</h2>
              <input
                type="checkbox"
                id="aMorning"
                className="cursor-pointer"
                value="aMorning"
                onChange={(e) => handelFilter(e)}
              />
              <label htmlFor="aMorning" className="cursor-pointer">
                Morning Session
              </label>
              <br />
              <input
                type="checkbox"
                id="aafternoon"
                value="aAfternoon"
                onChange={(e) => handelFilter(e)}
                className="cursor-pointer"
              />
              <label htmlFor="aafternoon" className="cursor-pointer">
                Afternoon Session
              </label>
              <br />
              <input
                type="checkbox"
                id="aevening"
                className="cursor-pointer"
                value="aEvening"
                onChange={(e) => handelFilter(e)}
              />
              <label htmlFor="aevening" className="cursor-pointer">
                Evening Session
              </label>
            </div>
            {/* -------------------- */}
            <div>
              <h2>Category</h2>
              <input
                type="radio"
                name="category"
                value="sleeper"
                onChange={(e) => handelFilter(e)}
                id="acCategory"
                className="cursor-pointer"
              />
              <label htmlFor="acCategory" className="cursor-pointer">
                Sleeper
              </label>
              <br />
              <input
                type="radio"
                value="semi_sleeper"
                onChange={(e) => handelFilter(e)}
                id="nonAcCategory"
                name="category"
                className="cursor-pointer"
              />
              <label htmlFor="nonAcCategory" className="cursor-pointer">
                Semi-Sleeper
              </label>
              <br />
              <input
                type="radio"
                value="a/c_seater"
                onChange={(e) => handelFilter(e)}
                id="acSleeperCategory"
                name="category"
                className="cursor-pointer"
              />
              <label htmlFor="acSleeperCategory" className="cursor-pointer">
                A/C Seater
              </label>
              <br />
              <input
                type="radio"
                id="nonAcSleeperCategory"
                name="category"
                value="none_a/c_seater"
                onChange={(e) => handelFilter(e)}
                className="cursor-pointer"
              />
              <label htmlFor="nonAcSleeperCategory" className="cursor-pointer">
                Non A/C Seater
              </label>
              <br />
            </div>
            {/* ////////////////// */}
            <div>
              <h2>Bus Operator</h2>
              <input
                type="checkbox"
                id="eicherOperator"
                value="ashok_leyland"
                onChange={(e) => handelFilter(e)}
                className="cursor-pointer"
              />
              <label htmlFor="eicherOperator" className="cursor-pointer">
                Ashok Leyland
              </label>
              <br />
              <input
                type="checkbox"
                id="bharatBenzOperator"
                value="mitshuba"
                onChange={(e) => handelFilter(e)}
                className="cursor-pointer"
              />
              <label htmlFor="bharatBenzOperator" className="cursor-pointer">
                Mitsubishi
              </label>
              <br />

              <input
                type="checkbox"
                id="volvoOperator"
                value="volvos"
                onChange={(e) => handelFilter(e)}
                className="cursor-pointer"
              />
              <label htmlFor="volvoOperator" className="cursor-pointer">
                Volvo Buses
              </label>

              <br />
              <input
                value="tata"
                onChange={(e) => handelFilter(e)}
                type="checkbox"
                id="tataMotorsOperator"
                className="cursor-pointer"
              />
              <label htmlFor="tataMotorsOperator" className="cursor-pointer">
                Tata Motors
              </label>
              <br />
            </div>

            {/* -------------------- */}

            {/* -------------------- */}
            <div>
              <h2>Bus Rating</h2>
              <input
                type="checkbox"
                id="four-star"
                className="cursor-pointer"
                value="4star+"
                onChange={(e) => handelFilter(e)}
              />
              <label htmlFor="four-star" className="cursor-pointer">
                4 star or more
              </label>
              <br />
              <input
                type="checkbox"
                id="three-star"
                className="cursor-pointer"
                value="3star+"
                onChange={(e) => handelFilter(e)}
              />
              <label htmlFor="three-star" className="cursor-pointer">
                3 star or more
              </label>
              <br />
              <input
                type="checkbox"
                id="zero-two-star"
                className="cursor-pointer"
                value="0to2star"
                onChange={(e) => handelFilter(e)}
              />
              <label htmlFor="zero-two-star" className="cursor-pointer">
                0-2 star
              </label>
            </div>
            {/* -------------------- */}
          </div>
        </div>
        {/* ///////////////////////////////   Filter Div Ended   ///////////////////////////////// */}

        <div className="border-2   p-2 w-full md:w-3/5 lg:w-4/6">
          {/* <div name="dateNavigation">Date Appears here</div> */}
          {/* Buses Div Starts from here */}
          <div name="buses" id="buses" className="flex flex-col">
            {filteredBuses.map((bus, i) => {
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
                <div key={i} className="budSDiv  p-4 md:p-8">
                  <div>
                    <div
                      className="flex flex-col md:flex-row md:justify-between 
                    
                      p-4"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      }}
                    >
                      <div className="  p-4 mb-4 md:mb-0 md:w-3/4">
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
                          <p className="mr-2">----{journeyTime}----</p>
                          <p>
                            {arrivalTime}, {date}
                          </p>
                        </div>
                        <div className="md:flex md:flex-wrap flex mb-2 text-sm text-blue-500 gap-2">
                          {amenities.map((elem, i) => (
                            <div key={i}>
                              <p className="mr-2">{elem}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="  flex flex-col items-center justify-center">
                        <p className="mb-2">Trip Cost</p>
                        <h1 className="text-red-600 text-2xl font-semibold mb-4 ">
                          Rs {seatPrice}
                        </h1>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            handelBusSelection(bus);
                            selectBus.busFare = seatPrice;
                          }}
                        >
                          View Seat
                        </button>
                      </div>
                    </div>
                    {/* Toggle Div For Seat Selection */}
                    {toggle && (
                      <SeatSelection
                        selectBus={selectBus}
                        journeyTime={journeyTime}
                      />
                    )}
                    {/* Toggle Div Ended For Seat Selection */}
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
export default BusAndSeatSelectionPage;
