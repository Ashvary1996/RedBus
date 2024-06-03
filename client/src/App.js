import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BusAndSeatSelectionPage from "./Pages/BusAndSeatSelectionPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PassengerDetail from "./Pages/PassengerDetail";
import PaymentSuccess from "./Pages/PaymentSuccess";
import Ticket from "./Pages/Ticket";
import PaymentCancel from "./Pages/PaymentCancel";
import SeatSelection from "./components/SeatSelection";
function App() {
  return (
    <div className="App  ">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/busAndSeatpage" element={<BusAndSeatSelectionPage />} />
          <Route path="/passengerDetail" element={<PassengerDetail />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/paymentCancel" element={<PaymentCancel />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/seatSelection" element={<SeatSelection />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
