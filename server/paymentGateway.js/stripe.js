const express = require("express");
const route = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const fuLLdata = {};

route.post("/create-checkout-session", async (req, res, next) => {
  const data = req.body.data;
  const passengerDetails = req.body.passengerDetails;

  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: data.name,
        },

        unit_amount: data.totalPrice * 100,
      },

      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.HOST_URL}/paymentSuccess?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.HOST_URL}/paymentCancel`,
    billing_address_collection: "required",
    // shipping_address_collection: {
    //   allowed_countries: ["IN"],
    // },
  });
   

  fuLLdata[session.id] = {
    data: data,
    passengerDetails: passengerDetails,
  };

  console.log(req.body);
  res.json({
    id: session.id,
    data: data,
    passengerDetails: passengerDetails,
  });
  next();
});

route.post("/retrieve-payment-intent", async (req, res) => {
  const sessionId = req.body.paymentIntent;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentIntentId = session.payment_intent;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Retrieve stored details using session ID
    const sessionDetails = fuLLdata[sessionId];

    res.json({
      success: true,
      transactionId: paymentIntent.id,
      fuLLdata: sessionDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = route;
