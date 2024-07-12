
import React from 'react'
import facebook from '../../src/assets/fb.png'
import twitter from '../../src/assets/twitter.png'
import git from '../../src/assets/git1.png'
import insta from '../../src/assets/insta.png'
const Footer = () => {
  return (
    <footer className="bg-[#44B7BC]  text-white py-8 mt-12">
      <div className="  px-4 "> 
        <div className="flex flex-wrap justify-between">
          <div className="w-full text-center sm:w-1/3 mb-6 sm:mb-0 ">
            <h2 className="text-lg font-bold mb-4">Home</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline font-Poppins">Features</a></li>
              <li className="mb-2"><a href="#" className="hover:underline  font-Poppins">Tools</a></li>
            </ul>
          </div>
          <div className="w-full text-center sm:w-1/3 mb-6 sm:mb-0">
            <h2 className="text-lg font-bold mb-4">Product</h2>
            <ul>
              
              <li className="mb-2"><a href="#" className="hover:underline font-Poppins">Xbinlegal</a></li>
              <li className="mb-2"><a href="#" className="hover:underline font-Poppins">Student Corner</a></li>
              <li className="mb-2"><a href="#" className="hover:underline font-Poppins">Kabadi Jee</a></li>
            </ul>
          </div>
          <div className="w-full text-center sm:w-1/3">
            <h2 className="text-lg font-bold mb-4">Our Story</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline  font-Poppins">Terms and Condition</a></li>
              <li className="flex justify-center space-x-4 mt-4">
              <img src={twitter} alt="Documents" className="rounded-full p-1 bg-black hover:text-gray-300 " />
                {/* <a href="#" className=" rounded-full  bg-black hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a> */}


                {/* <a href="#" className=" rounded-xl bg-black hover:text-gray-300">
                  <i className="fab fa-facebook-f"></i>
                </a> */}

                <img src={facebook} alt="Documents" className="rounded-full p-1 bg-black hover:text-gray-300 " />
                <img src={insta} alt="Documents" className="rounded-full p-1 bg-black hover:text-gray-300 " />
                <img src={git} alt="Documents" className="rounded-full p-1 bg-black hover:text-gray-300 " />

                {/* <a href="#" className="">
                <img src={insta} alt="Documents" className="rounded-full p-1 bg-black hover:text-gray-300 " />
                </a> */}
                 {/* <a href="#" className="">
                <img src={git} alt="Documents" className="rounded-full p-1 bg-black hover:text-gray-300 " />
                 <i className="fab fa-github"></i> 
                </a>  */}
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm font-Poppins">
            &copy; copyright {new Date().getFullYear()}, All Rights Reserved by Panda Consultant Software
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
