import "./App.css";
import HomePage from "./Pages/HomePage";
import BusPage from "./Pages/BusPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import TravellerDetail from "./components/TravellerDetail";
import Payment from "./Pages/Payment";
import Ticket from "./Pages/Ticket";
import StripPaymentGateway from "./components/StripPaymentGateway";
function App() {
  return (
    <div className="App  ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/buspage" element={<BusPage />} />
          <Route path="/travellerPage" element={<TravellerDetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/stripPaymentGateway" element={<StripPaymentGateway />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
