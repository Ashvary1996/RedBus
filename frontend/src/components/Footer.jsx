import React from "react";

function Footer() {
  return (
    <footer className="footer bg-yellow-50 text-sm py-6">
      <div className="container mx-auto flex flex-wrap justify-around">
        <div className="footer-section flex flex-col w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
          <h1 className="text-orange-500 text-xl font-bold mb-2">RESERVE</h1>
          <p className="mb-2">When you have a choice. Choose Reserve</p>
          <p className="mb-2">
            Reserve offers bus ticket booking through its website, iOS, and
            Android mobile apps for all major cities
          </p>
          <p>reserver.bus@reserve.com</p>
        </div>

        <div className="footer-section w-full md:w-1/4 lg:w-1/6 px-4 mb-4">
          <h1 className="font-bold mb-2">About</h1>
          <p className="mb-2">About us</p>
          <p>Contact us</p>
        </div>

        <div className="footer-section w-full md:w-1/4 lg:w-1/6 px-4 mb-4">
          <h1 className="font-bold mb-2">Useful Links</h1>
          <p className="mb-2">Careers</p>
          <p className="mb-2">FAQ</p>
          <p className="mb-2">Terms & Conditions</p>
          <p className="mb-2">Privacy Policy</p>
          <p>Blog</p>
        </div>

        <div className="footer-section w-full md:w-1/4 lg:w-1/6 px-4 mb-4">
          <h1 className="font-bold mb-2">Follow us</h1>
          <p>Instagram</p>
          <p>Facebook</p>
        </div>
      </div>
      <p className="text-center mt-6 text-gray-600">
        All rights reserved - 2024
      </p>
    </footer>
  );
}

export default Footer;
