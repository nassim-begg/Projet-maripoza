import React from "react";
import { Link } from "react-router-dom";
import pay from "../../img/pay.png";
import play from "../../img/play.jpg";
import app from "../../img/app.jpg";
import logo from "../../img/logo3.png";

function Footer() {
  return (
    <>
      <footer className="py-10 px-20 flex justify-between mb-0">
        <div className="space-y-4">
          <h4 className="text-lg text-black">Contact</h4>
          <p className="text-base text-gray-700 my-1">
            <strong className="font-bold">Address </strong>Mkira, Tizi Ouzou
          </p>
          <p className="text-base text-gray-700 my-1">
            <strong className="font-bold">Phone </strong> 0797645330
          </p>
          <p className="text-base text-gray-700 my-1">
            <strong className="font-bold">Hours</strong> 24/24 7/7
          </p>
          <div className="follow">
            <h4 className="text-lg text-black">Follow Us</h4>
            <div className="icons flex space-x-2">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-pinterest-p"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>
        <div className="space-y-4 ml-20">
          <h4 className="text-lg text-black">About</h4>
          <Link to="/about" className="block mt-2">
            About us
          </Link>
          <Link to="/delivery" className="block mt-2">
            Delivery Information
          </Link>
          <Link to="/privacy" className="block mt-2">
            Privacy Policy
          </Link>
          <Link to="/terms" className="block mt-2">
            Terms and Conditions
          </Link>
          <Link to="/contact" className="block mt-2">
            Contact
          </Link>
        </div>
        <div className="space-y-4 ml-20">
          <h4 className="text-lg text-black">My Account</h4>
          <Link to="/account" className="block mt-2">
            Account
          </Link>
          <Link to="/signin" className="block mt-2">
            Sign In
          </Link>
          <Link to="/cart" className="block mt-2">
            View cart
          </Link>
          <Link to="/wishlist" className="block mt-2">
            My wishlist
          </Link>
          <Link to="/trackorder" className="block mt-2">
            Track My Order
          </Link>
          <Link to="/help" className="block mt-2">
            Help
          </Link>
        </div>
        <div className="space-y-4 ml-20">
          <h4 className="text-lg text-black">Install App</h4>
          <p className="text-base text-gray-700">
            From App Store Or Google Play
          </p>
          <div className="row flex space-x-2">
            <img src={play} className="w-8 object-cover w-auto" alt="logo" />
            <img src={app} className="w-8 object-cover w-auto" alt="logo" />
          </div>
          <p className="text-base text-gray-700">Secured Payments Getways</p>
          <img src={pay} className="w-8 object-cover w-auto" alt="logo" />
        </div>
      </footer>
      <div className="copyright mt-10 text-center">
        <p className="text-base text-gray-700">
          © 2024 BeggacheNassim All rights reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
