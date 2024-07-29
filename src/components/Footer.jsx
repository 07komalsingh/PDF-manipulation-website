
import React from 'react'
import facebook from '../../src/assets/img_fb.svg'
import xtwitter from '../assets/xt_img.png'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { TiSocialLinkedinCircular } from "react-icons/ti";
const Footer = () => {

  return (
    <footer className="bg-[#44B7BC]  text-white py-8 ">
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
              <li className="flex justify-center space-x-4 mt-4 items-center">
                
                {/* <a href="#" className=" rounded-full  bg-black hover:text-gray-300">
                 <i className="fab fa-twitter"></i>
               </a> */}

                {/* <a href="#" className=" rounded-xl bg-black hover:text-gray-300">
                 <i className="fab fa-facebook-f"></i>
                </a> */}
                 {/* <img src={twitter} alt="Documents" className="rounded-full p-1 " /> */}
                <img src={facebook} alt="Documents" className="rounded-full p-1  " />
                <span className="rounded-full bg-white text-[#44B7BC]  p-1 text-center  flex items-center">
                  <BiLogoInstagramAlt className='text-[23px]'  />
                </span> 
                {/* <img src={git} alt="Documents" className="rounded-full p-1 hover:text-gray-300 " /> */}
                <span className="rounded-full bg-white text-[#44B7BC]  p-1 text-center  flex items-center">
                  <TiSocialLinkedinCircular className='text-[23px]'  />
                </span> 
                <img src={xtwitter} alt="Documents" className="rounded-full p-1  " />
                {/* <a href="#" className="rounded-full p-1 bg-black hover:text-gray-300"                   </a              {/* <a href="#" className=""             <img src={git} alt="Documents" className="rounded-full p-1 bg-black hover:text-gray-300 " />                 <i className="fab fa-github"></i> 
               </a>  */} 
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm font-Poppins font-normal">
            &copy; copyright {new Date().getFullYear()}, All Rights Reserved by Pando india software Consultants
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const app = express();
// const port = 8080;
 
// app.use(cors()); // Enable CORS
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
 
// // Configure multer for file upload
// const upload = multer({ dest: 'uploads/' });
 
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   console.log(req.file);
//   res.status(200).send({ message:'File uploaded successfully', file: req.file });
// });
 
// app.get('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   console.log(req.file);
//   res.status(200).send({ message:'File uploaded successfully', file: req.file });
// });
// app.post('/tool', (req, res) => {
//   const { tool, file } = req.body;
//   if (!tool || !file) {
//     return res.status(400).send('Tool or file not provided.');
//   }
//   console.log(`Tool: ${tool}, File: ${file}`);
//   res.status(200).send({ message: `Tool ${tool} applied successfully` });
// });
 
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
//  explain each line