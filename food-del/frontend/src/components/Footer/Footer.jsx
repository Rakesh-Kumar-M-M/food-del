import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets/frontend_assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-cont">
        <div className="footer-left">
          <img src={assets.logo} alt="" />
          <p> welcome to our Branch</p>
          <div className="social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-cent">
          <h2>STORE</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>Get in touch</h2>
          <ul>
            <li>9159389689</li>
            <li>Homedelivery@gmail.com</li>
          </ul>
        </div>

        </div>
        <hr />

      <p className="copyright">Copyright @2025-All rights permitted</p>
      
    </div>
  );
};

export default Footer;
