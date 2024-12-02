import React from 'react';
import './register.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';

const Register = () => {
    const [error, setError] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setisLoading(true);
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const res = await apiRequest.post("auth/register", {
                username,
                email,
                password,
            });
            navigate('/login');
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }finally{
            setisLoading(false);
        }
    };

    return (
        <div className="registerPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an account</h1>
                    <input type="text" name='username' placeholder='Username' required />
                    <input type="email" name='email' placeholder='Email' required />
                    <input type="password" name='password' placeholder='Password' required />
                    <button type="submit" disabled={isLoading}>Sign Up</button>
                    {error && <span className="error">{error}</span>}
                    <Link to="/login">Already have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="Background" />
            </div>
        </div>
    );
}

export default Register;
