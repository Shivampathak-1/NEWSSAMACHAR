import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataJs = {
      email: credential.email,
      password: credential.password,
    };
    const response = await fetch("http://127.0.0.1:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJs),
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "Logged in successfully") {
      localStorage.setItem("token", data.authtoken);
      localStorage.setItem("IsloggedIn", true);

      navigator("/");
      window.location.reload();
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credential.email}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credential.password}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-3 text-end">
            <a href="#" className="text-primary text-decoration-none">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="mb-0">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary text-decoration-none">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
