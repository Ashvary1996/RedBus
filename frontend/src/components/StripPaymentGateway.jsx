import React from "react";
import { useLocation } from "react-router-dom";

function StripPaymentGateway() {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return <div>StripPaymentGateway</div>;
}

export default StripPaymentGateway;
