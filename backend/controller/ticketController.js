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
      totalPrice,
    } = req.body;
    // const totalPrice = Math.floor(Math.random() * max)  ;

    const newTicket = new Ticket({
      tripId: tripId,
      passengerName: passengerName,
      passengerAge: passengerAge,
      passengerGender: passengerGender,
      seatNumber: seatNumber,
      ticketType: ticketType,
      totalPrice: totalPrice,
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
    const ticket = await Ticket.find({});
    res.status(200).json({
      success: true,
      total: ticket.length,
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
