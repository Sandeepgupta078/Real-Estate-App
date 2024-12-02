import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import './Login.scss'
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';


const Login = () => {

  const { updateUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setisLoading(true);
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    // console.log(data);

    try {
      const res = await apiRequest.post('/auth/login', {
        username,
        password
      });
      // console.log(res);
      updateUser(res.data);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setisLoading(false);
    }
  }


  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name='username'
            required
            type="username"
            placeholder="Username"
            minLength={3}
            maxLength={20}
          />
          <input
            name='password'
            required
            type="password"
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          <Link to="/register">Don't have an account?</Link>
          {error && <span className="error">{error}</span>}
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  )
}

export default Login