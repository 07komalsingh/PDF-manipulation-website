import React, { useState } from 'react';
import pdfIcon from '../assets/img_easydoc.png';
import { Link, useNavigate } from 'react-router-dom';
 
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Define navigate using useNavigate hook
 
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
 
 
    const handleNavigation = (path, toolPath) => {
        if (toolPath) {
            navigate(path, { state: { toolPath } });
        } else {
            navigate(path);
        }
    };
 

    return (
        <div className="sticky top-0 bg-white shadow-md z-50 py-6">
            <div className="container lg:justify-around justify-between flex items-center px-6 space-x-6 lg:w-[100vw]">
                <div>
                    <img src={pdfIcon} alt="PDF Icon" className="w-20 h-26" />
                </div>
                <div className="hidden md:flex font-poppins space-x-6 font-semibold">
                    <Link to="/merge" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg" >Merge PDF</Link>
               
                    <button onClick={() => handleNavigation('/file', '/split')} className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Split PDF</button>
                    <button onClick={() => handleNavigation('/file', '/compress')} className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Compress PDF</button>
           
                    <Link to="/convert" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Convert PDF</Link>
                    <Link to="/all-tools" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">All PDF Tools</Link>
                </div>
                <div className="md:hidden flex items-center justify-end">
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
                    <Link to="/merge" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg " onClick={toggleMenu}>Merge PDF</Link>
       
                    <button onClick={() => { handleNavigation('/file', '/split'); toggleMenu(); }} className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg">Split PDF</button>
                    <button onClick={() => { handleNavigation('/file', '/compress'); toggleMenu(); }} className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg">Compress PDF</button>
           
                    <Link to="/convert" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg" onClick={toggleMenu}> Convert PDF</Link>
                    <Link to="/all-tools" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg" onClick={toggleMenu}>All PDF Tools</Link>
                </div>
            )}
        </div>
    );
}
 
export default Navbar;
 
 
// /*on clicking toggleMenu it works with setIsOpen and setIsOpen does the work of negating the value of isOpen. setIsOpen task is to update the value of isOpen
// So when value of isOpen will become true, it will do the isOpen && task/*
 
 
 
