import React, { useState } from 'react';
import pdfIcon from '../assets/pdf.png'; // Adjust the path as needed

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="sticky top-0 bg-white shadow-md z-50 py-6"> 
            <div className="container lg:justify-around justify-between  flex items-center px-6 space-x-6 lg:w-[100vw]"> 
                <div className=""> 
                    <img src={pdfIcon} alt="PDF Icon" className="w-20 h-26" />
                </div>
                <div className="hidden md:flex font-poppins space-x-6 font-semibold "> 
                    <a href="#merge" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Merge PDF</a> 
                    <a href="#split" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Split PDF</a> 
                    <a href="#compress" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Compress PDF</a> 
                    <a href="#convert" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Convert PDF</a>
                    <a href="#all-tools" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">All PDF Tools</a> 
                </div>
                <div className="md:hidden flex items-center justify-end ">
                    <button onClick={toggleMenu} className="outline-none mobile-menu-button">
                        <svg
                            className="w-6 h-6 text-gray-700 hover:bg-[#44B7BC]"
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
                    <a href="#merge" className="block text-gray-700 hover:bg-#44B7BC py-2 px-4 rounded-lg font-poppins font-semibold">Merge PDF</a> 
                    <a href="#split" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg font-poppins font-semibold">Split PDF</a>
                    <a href="#compress" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg font-poppins font-semibold">Compress PDF</a>
                    <a href="#convert" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg font-poppins font-semibold">Convert PDF</a>
                    <a href="#all-tools" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg font-poppins font-semibold">All PDF Tools</a> 
                </div>
            )}
        </div>
    );
}

export default Navbar;