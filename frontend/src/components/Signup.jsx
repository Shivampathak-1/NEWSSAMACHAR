import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPass: "",
  });

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataJs = {
      name: credential.name,
      email: credential.email,
      mobile: credential.mobile,
      gender: credential.gender,
      password: credential.password,
      confirmPass: credential.confirmPass,
      profile_image: "http://127.0.0.1:3001/image/user.png",
    };
    const response = await fetch("http://127.0.0.1:3001/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJs),
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "Registered Successfully") {
      alert("Registered Successfully");
      navigator("/login");
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
      <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={credential.name}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credential.email}
              onChange={onChange}
              className="form-control"
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* Mobile & Gender */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile No.
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={credential.mobile}
                onChange={onChange}
                className="form-control"
                placeholder="Enter your Mobile"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={credential.gender}
                onChange={onChange}
                className="form-select"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="row">
            <div className="col-md-6 mb-3">
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
                placeholder="Create a password"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPass"
                value={credential.confirmPass}
                onChange={onChange}
                className="form-control"
                placeholder="Re-enter the password"
                required
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>

          {/* Already Registered */}
          <div className="mt-3 text-center">
            <span>Already Registered? </span>
            <Link to="/login" className="text-primary text-decoration-none">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
