import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold tracking-wider hover:text-purple-200 transition-colors duration-200">
                    URL Shortener
                </Link>
                <div className="space-x-6">
                    {token ? (
                        <>
                            <Link to="/" 
                                className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
                            >
                                Home
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" 
                                className="text-white hover:text-purple-200 transition-colors duration-200 font-medium"
                            >
                                Login
                            </Link>
                            <Link to="/register" 
                                className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors duration-200 font-medium"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;