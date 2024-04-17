import React from "react";
import { useLocation } from "react-router-dom";

function PaymentCancel() {
  const location = useLocation();
  const data = location.state || [];
  const passenger = data.passenger || [];
  const busData = data.pData || [];

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>We're sorry, but your payment could not be processed.</p>
    </div>
  );
}

export default PaymentCancel;
