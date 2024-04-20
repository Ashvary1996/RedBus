const Ticket = require("../model/ticketSchema");

const newTicket = async (req, res) => {
  try {
    const {
      tripId,
      passengerName,
      passengerAge,
      passengerGender,
      seatNumber,
      ticketType,
      email,
      number,
      from,
      to,
      paymentId,
      busName,
      busNumber,
      totalPrice,
      bookingDate
    } = req.body;
    // const totalPrice = Math.floor(Math.random() * max)  ;

    const newTicket = new Ticket({
      // tripId: tripId,
      passengerName: passengerName,
      passengerAge: passengerAge,
      passengerGender: passengerGender,
      seatNumber: seatNumber,
      totalPrice: totalPrice,
      email: email,
      number: number,
      from: from,
      to: to,
      paymentId: paymentId,
      busName: busName,
      busNumber: busNumber,
      bookingDate:bookingDate
    });

    await newTicket.save();

    res.status(200).json({
      success: true,
      Ticket: newTicket,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Error",
      detail: error.message,
    });
  }
};

const getTicket = async (req, res) => {
  try {
    const paymentId = req.query.paymentId;
    const ticket = await Ticket.find({ paymentId: paymentId });
    res.status(200).json({
      success: true,
      ticket: ticket,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Error",
      detail: error.message,
    });
  }
};

module.exports = { newTicket, getTicket };
