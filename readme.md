# Red Bus Website

Welcome to the Red Bus Website project! This project is a web application for booking bus tickets. Users can search for buses based on their destination, select seats, provide passenger details, make payments, and generate tickets for their trips.

## Features

- **Home Page**
  - Enter 'from' and 'to' destinations.
  - Select a date for the journey.
  - Click on the search button to find available buses.

- **Bus Selection Page**
  - Displays a list of all available buses based on the selected date, 'from', and 'to' destinations.
  - Users can view bus details such as bus name, departure time, arrival time, fare, and amenities.

- **Select Bus by View Seat**
  - Users can view seat layout for the selected bus.
  - Select seats for the journey.
  - Proceed to the next page after seat selection.

- **Passenger Detail Page**
  - Users can fill in traveler details for booking tickets.
  - Enter passenger name, age, gender, email, and contact number.
  - Proceed to the payment page after providing passenger details.

- **Payment Page**
  - Users can make payments securely.
  - Payment methods supported: Credit/Debit Card.

- **Ticket and Trip Creation**
  - After successful payment, the ticket is generated for the user.
  - A new trip is initiated in the system when no existing trip with the same details is found. This includes the chosen bus, seat details, and passenger information.

## Technologies Used

- Frontend:
  - React: JavaScript library for building the user interface.
  - React Router: For routing within the application.
  - Axios: For making HTTP requests to the backend.
  - Tailwind CSS: Utility-first CSS framework for styling.

- Backend:
  - Node.js: JavaScript runtime for the server-side.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database for storing bus, trip, and user data.
  - Mongoose: MongoDB object modeling for Node.js.

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/Ashvary1996/RedBus

2. Install dependencies and start
  For FRONTEND:
    Navigate to the client folder:
     ```sh 
     cd RedBus/client
     npm install
     npm start

3. 
   Install dependencies BACKEND:
     Navigate to the server folder:
     ```sh 
     cd RedBus/server
     npm install
     nodemon index.js

## Deployment

- The frontend is deployed on [Netlify](https://red-bus-by-ashvary.netlify.app/) :https://red-bus-by-ashvary.netlify.app/
- The backend is currently hosted at [https://redbus-eru5.onrender.com/](https://redbus-eru5.onrender.com/)

To run or deploy the backend and frontend , make sure to set up environment variables and adjust configurations accordingly.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request
