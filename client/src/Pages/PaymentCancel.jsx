import React from "react";

function PaymentCancel() {
  return (
    <div className="container mx-auto p-4 lg:p-8">
      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-4 lg:mb-8">
        Payment Failed
      </h1>
      <p className="text-lg lg:text-xl text-center">
        We're sorry, but your payment could not be processed.
      </p>
    </div>
  );
}

export default PaymentCancel;
