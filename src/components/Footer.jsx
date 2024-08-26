import React from "react";
import { Link } from "react-router-dom";
import facebook from "../../src/assets/img_fb.svg";
import xtwitter from "../assets/xt_img.png";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="bg-[#44B7BC] text-white py-8">
      <div className="px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full text-center sm:w-1/3 mb-6 sm:mb-0">
            <h2 className="text-lg font-bold mb-4">Home</h2>
            <ul>
              <li className="mb-2">
                <a href="" className="hover:underline font-Poppins">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a href="" className="hover:underline font-Poppins">
                  Tools
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full text-center sm:w-1/3 mb-6 sm:mb-0">
            <h2 className="text-lg font-bold mb-4">Product</h2>
            <ul>
              <li className="mb-2">
                <a href="" className="hover:underline font-Poppins">
                  Xbinlegal
                </a>
              </li>
              <li className="mb-2">
                <a href="" className="hover:underline font-Poppins">
                  Student Corner
                </a>
              </li>
              <li className="mb-2">
                <a href="" className="hover:underline font-Poppins">
                  Kabadi Jee
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full text-center sm:w-1/3">
            <h2 className="text-lg font-bold mb-4">Our Story</h2>
            <ul>
              <li className="mb-2">
                <Link to="/privacy" className="hover:underline font-Poppins">
                  Privacy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="hover:underline font-Poppins">
                  FAQ
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/term-and-con"
                  className="hover:underline font-Poppins"
                >
                  Terms and Condition
                </Link>
              </li>
              <li className="flex justify-center space-x-4 mt-4 items-center">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="rounded-full p-1"
                />
                <span className="rounded-full bg-white text-[#44B7BC] p-1 text-center flex items-center">
                  <BiLogoInstagramAlt className="text-[23px]" />
                </span>
                <span className="rounded-full bg-white text-[#44B7BC] p-1 text-center flex items-center">
                  <TiSocialLinkedinCircular className="text-[23px]" />
                </span>
                <img
                  src={xtwitter}
                  alt="Twitter"
                  className="rounded-full p-1"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm font-Poppins font-normal">
            &copy; copyright {new Date().getFullYear()}, All Rights Reserved by
            Pando India Software Consultants
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
