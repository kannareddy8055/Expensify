import React, { useState } from "react";
import './index.css';
import { Navigate, useNavigate } from "react-router";
import Cookies from "js-cookie"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate();
  const toggleForm = () => setIsLogin(!isLogin);

  const onChangeName = (e) => {
    setName(e.target.value);
  }
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const validateName = () => {
    if (name.trim() == ''){
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  }

  const validateEmail = () => {
    if (email.trim() == ''){
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  }

  const validatePassword = () => {
    if (password.trim() == '' ){
      setPasswordError("Password is required");
    } else if (password.length < 8){
      setPasswordError("Invalid password");
    } else {
      setPasswordError("");
    }
  }
  const validateConfirmPassword = () => {
    if (confirmPassword.trim() == ''){
      setConfirmPasswordError("Confirm Password is required");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Password does not match");
    } 
    else {
      setConfirmPasswordError("");
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {email, password};
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(userDetails)
    }
    const response = await fetch("https://expensify-2.onrender.com/login", options);
    const data = await response.json();
    console.log("response", response);
    console.log("data", data);
    if (response.ok) {
      console.log("Login successful");
      setEmail("");
      setPassword("");
      setShowSubmitError(false);
      Cookies.set('jwt_token', data.jwtToken, {expires: 30000000})
      setErrorMsg("");
      navigate("/");
    } else {
      console.log("Login failed");
      setShowSubmitError(true);
      setErrorMsg("Invalid name or password");
      navigate("/login");
    }
    
  };

  const username = name;

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {name, email, password, confirmPassword};
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json"} ,
      body: JSON.stringify(userDetails),
    }
    const response = await fetch("https://expensify-2.onrender.com/signup", options);
    const data = await response.json();
    console.log("response",response)
    console.log("data",data)
    if (response.ok){
        setShowSubmitError(false);
        setIsLogin(!isLogin);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        console.log("ok")
    } else {
      setShowSubmitError(true);
      setErrorMsg("SignUp failed");
      console.log("not ok")
    }
  };
  
  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/"  />
  }
  return (
    <div className="main-container">
      <div className="logo-container">
        <img className="logo" src="https://res.cloudinary.com/drskskzys/image/upload/v1756633216/Screenshot_2025-08-31_150447_ppjn74.png" alt="Logo"/>
        <h1 className="app-title">Xpensify</h1>
      </div>
      
    <div className="auth-container">
      <h2 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
      
        {!isLogin && (
          
        <form className="auth-form" onSubmit={handleSignUpSubmit}>
          <input
            className="auth-input"
            type="text"
            name="username"
            placeholder="Username"
            value={name}
            onBlur={validateName}
            onChange={onChangeName}
            required
          />
          <p className="username-error">{nameError}</p>
          <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onBlur={validateEmail}
          onChange={onChangeEmail}
          required
        />
        <p className="email-error">{emailError}</p>
        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onBlur={validatePassword}
          onChange={onChangePassword}
          required
        />
        <p className="password-error">{passwordError}</p>
        <input
            className="auth-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onBlur={validateConfirmPassword}
            onChange={onChangeConfirmPassword}
            required
          />
          <p className="confirmPassword-error">{confirmPasswordError}</p>
          <button type="submit">Sign Up</button>
        </form>
        )}

        {isLogin && (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onBlur={validateEmail}
          onChange={onChangeEmail}
          required
        />
        <p className="email-error">{emailError}</p>
        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onBlur={validatePassword}
          onChange={onChangePassword}
          required
        />
        <p className="password-error">{passwordError}</p>
        <button type="submit">Login</button>
        </form>)}
        
      <p className="error-message">{showSubmitError ? errorMsg: ""}</p>
      <p onClick={toggleForm} className="toggle-link">
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </p>
    </div>
    </div>
  );
};

export default Login;