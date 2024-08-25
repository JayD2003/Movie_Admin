import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const checkAdminAuthentication = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_API+'/admin/checklogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'

            });
            if (response.ok) {
                // Admin is authenticated
                setIsAdminAuthenticated(true);
            } else {
                // Admin is not authenticated
                setIsAdminAuthenticated(false);
               
            }
        }
        catch (error) {
            console.error('An error occurred during admin authentication check', error);
            setIsAdminAuthenticated(false);

        }
    }

    useEffect(() => {
        checkAdminAuthentication();
    }, []);
    return (
        <div className="navbar">
            <img src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png" alt="" />
            <nav>
                {isAdminAuthenticated ? (
                        <>
                            <Link to='/movies'>Add Movie</Link>
                            <Link to='/screens'>Add Screen</Link>
                            <Link to='/schedules'>Add Schedule</Link>
                            <Link to='/celebs'>Add Celeb</Link>
                        </>
                    ) : (
                        <>
                            {/* Show login/signup links for unauthenticated admin */}
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Signup</Link>
                        </>
                    )}
            </nav>
        </div>
    )
}

export default Navbar