import React, { useState } from 'react';
import pdfIcon from '../assets/pdf.png'; // Adjust the path as needed


const AbtUs = () => {
    
      const [isOpen, setIsOpen] = useState(false);
    
      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    
      return (
        <div className="sticky top-0 bg-white shadow-md z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <div className="flex items-center">
              <img src={pdfIcon} alt="PDF Icon" className="w-8 h-8" />
              <span className="ml-2 text-blue-600 font-bold text-xl">PDF</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#merge" className="text-gray-700 hover:text-blue-600">Merge PDF</a>
              <a href="#split" className="text-gray-700 hover:text-blue-600">Split PDF</a>
              <a href="#compress" className="text-gray-700 hover:text-blue-600">Compress PDF</a>
              <a href="#convert" className="text-gray-700 hover:text-blue-600">Convert PDF</a>
              <a href="#all-tools" className="text-gray-700 hover:text-blue-600">All PDF Tools</a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="outline-none mobile-menu-button">
                <svg
                  className="w-6 h-6 text-gray-700 hover:text-blue-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="md:hidden">
              <a href="#merge" className="block text-gray-700 hover:text-blue-600 py-2 px-4">Merge PDF</a>
              <a href="#split" className="block text-gray-700 hover:text-blue-600 py-2 px-4">Split PDF</a>
              <a href="#compress" className="block text-gray-700 hover:text-blue-600 py-2 px-4">Compress PDF</a>
              <a href="#convert" className="block text-gray-700 hover:text-blue-600 py-2 px-4">Convert PDF</a>
              <a href="#all-tools" className="block text-gray-700 hover:text-blue-600 py-2 px-4">All PDF Tools</a>
            </div>
          )}
         
        </div>
      )
    }
    
          export default AbtUs;
    
 
