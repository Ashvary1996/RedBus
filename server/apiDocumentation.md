# API Documentation

## Trip Endpoints

### Create a new trip

- **URL:** `/trip/newTrip`
- **Method:** POST
- **Request Body:**
  - `date` (Date, optional): Date of the trip. Defaults to current date if not provided.
  - `userName` (String, required): Name of the user.
  - `from` (String, required): Starting location of the trip.
  - `to` (String, required): Destination of the trip.
  - `busOwnerId` (Number, required): ID of the bus owner.
  - `startTime` (Number, required): Start time of the trip.
  - `endTime` (Number, required): End time of the trip.
  - `category` (Number, required): Category of the trip.
  - `SeatBooked` (Array of Numbers, required): Seats booked for the trip.
  - `bus_no` (Number, required): Bus number.
  - `busFare` (Number, required): Fare of the bus.
  - `busName` (String, required): Name of the bus.
- **Response:**
  - `success` (Boolean): Indicates if the request was successful.
  - `tripDetail` (Object): Details of the newly created trip.

### Get last 50 trips

- **URL:** `/trip/last50Trip`
- **Method:** GET
- **Response:**
  - `status` (Boolean): Indicates if the request was successful.
  - `total` (Number): Total number of trips fetched.
  - `allTrips` (Array of Objects): Details of the last 50 trips.

### Get trips by date

- **URL:** `/trip/byDate`
- **Method:** GET
- **Request Body:**
  - `findByDate` (Date, required): Date to filter the trips.
- **Response:**
  - `status` (Boolean): Indicates if the request was successful.
  - `total` (Number): Total number of trips fetched.
  - `trip_Detail` (Array of Objects): Details of the trips filtered by date.

### Get trips by query parameters

- **URL:** `/trip/getTripbyQuery`
- **Method:** GET
- **Query Parameters:**
  - Various query parameters to filter the trips.
- **Response:**
  - `status` (Boolean): Indicates if the request was successful.
  - `total` (Number): Total number of trips fetched.
  - `trip_Detail` (Array of Objects): Details of the trips filtered by query parameters.

## Ticket Endpoints

### Create a new ticket

- **URL:** `/ticket/newTicket`
- **Method:** POST
- **Request Body:**
  - `tripId` (String, required): ID of the trip associated with the ticket.
  - `passengerName` (String, required): Name of the passenger.
  - `passengerAge` (Number, required): Age of the passenger.
  - `passengerGender` (String, required): Gender of the passenger. (Should be one of: 'Male', 'Female', 'Other')
  - `seatNumber` (Array of Numbers, required): Seat numbers booked by the passenger.
  - `ticketType` (String, required): Type of the ticket. (Should be one of: 'Standard', 'Premium', 'VIP')
  - `totalPrice` (Number, optional): Total price of the ticket. If not provided, a random value will be generated.
- **Response:**
  - `success` (Boolean): Indicates if the request was successful.
  - `Ticket` (Object): Details of the newly created ticket.

### Get all tickets

- **URL:** `/ticket/getTicket`
- **Method:** GET
- **Response:**
  - `success` (Boolean): Indicates if the request was successful.
  - `total` (Number): Total number of tickets.
  - `tickets` (Array of Objects): Details of all tickets.



### Server URL : https://redbus-eru5.onrender.com/