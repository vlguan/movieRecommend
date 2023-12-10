import React, { useState } from 'react';

const Login = () => {
  // State to hold the user input for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // In a real-world scenario, you would likely make an API request to validate the credentials
    // For simplicity, let's just log the credentials for now
    console.log('Username:', username);
    console.log('Password:', password);

    // You can add authentication logic here (e.g., check with a backend server)
    try{
      var session;
      const res = await fetch('http://localhost:8000/api/user/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
              {username: username,
              password: password,
              session}
          ),
      });
  const data = await res.json();
  console.log('Login Response:' , data);
  }catch (error){
    console.error('Login:', error);
  }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
