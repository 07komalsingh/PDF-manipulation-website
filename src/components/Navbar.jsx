import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


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

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            console.log('User signed in:', result.user);
            navigate('/'); // Navigate to the home page or any other page after successful login
        } catch (error) {
            console.error('Error signing in with Google:', error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
            navigate('/'); // Navigate to the home page or any other page after successful sign out
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    return (
        <div className="sticky top-0 bg-white shadow-md z-50 py-6">
            <div className="container lg:justify-around justify-between flex items-center px-6 space-x-6 lg:w-[100vw]">
                
                <div className="hidden md:flex font-poppins space-x-6 font-semibold ">
                    
                    <button onClick={() => handleNavigation('/file', '/split')} className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Split PDF</button>
                    <Link to="/compress" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Compress PDF</Link>
                    <Link to="/convert" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Convert PDF</Link>
                    <Link to="/all-tools" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">All PDF Tools</Link>
                </div>
                <div className="hidden md:flex space-x-6 items-center">
                    {user ? (
                        <>
                            <span className="text-gray-700 font-semibold">{user.displayName || 'User'}</span>
                            <button
                                onClick={handleSignOut}
                                className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (''
                        // <button
                        //     onClick={handleGoogleSignIn}
                        //     className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg"
                        // >
                        //     Sign in with Google
                        // </button>
                    )}
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
                    <Link to="/merge" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg" onClick={toggleMenu}>Merge PDF</Link>
                    <button onClick={() => { handleNavigation('/file', '/split'); toggleMenu(); }} className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg">Split PDF</button>
                    <Link to="/compress" className="text-gray-700 hover:text-[#44B7BC] py-2 px-4 rounded-lg">Compress PDF</Link>
                    <Link to="/convert" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg" onClick={toggleMenu}>Convert PDF</Link>
                    <Link to="/all-tools" className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg" onClick={toggleMenu}>All PDF Tools</Link>
                    {user ? (
                        <>
                            <span className="block text-gray-700 font-semibold py-2 px-4 rounded-lg">{user.displayName || 'User'}</span>
                            <button
                                onClick={() => { handleSignOut(); toggleMenu(); }}
                                className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (''
                        // <button
                        //     onClick={() => { handleGoogleSignIn(); toggleMenu(); }}
                        //     className="block text-gray-700 hover:bg-[#44B7BC] py-2 px-4 rounded-lg"
                        // >
                        //     Sign in with Google
                        // </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
