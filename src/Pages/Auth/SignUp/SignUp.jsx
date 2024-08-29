import React from 'react'
import { useState } from 'react';
import './SignUp.css';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignup = async () => {
        try {
      console.log(import.meta.env.VITE_BACKEND_API);
          const response = await fetch(import.meta.env.VITE_BACKEND_API+'/admin/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
            credentials: 'include'
          });
    
          if (response.ok) {
            const data = await response.json();
            // Handle successful signup, e.g., show a success message
            console.log('Admin registration successful', data);
    
            toast.success('Admin Registration Successful', {
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/");
          } else {
            // Handle signup error
            console.error('Admin registration failed', response.statusText);
            toast.error('Admin Registration Failed', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        }
        catch (error) {
          toast.error('An error occurred during registration');
          console.error('An error occurred during registration', error);
        }
    }

      
    return (
        <div className='formpage'>
            <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign up</button>
        </div>
    )
}

export default SignUp