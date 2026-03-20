import React, { useState } from "react";
import { useLoader } from "../LoaderContext.js";
//import { useNavigate } from "react-router-dom";
import API from "../../api";

function Signup() {
  const { setLoading } = useLoader();
  //const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // Signup input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Login input
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  // ✅ SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      const res = await API.post("/signUp", dataToSend);

      alert(res.data.message);
      setShowLogin(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    }

    setLoading(false);
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/signIn", loginData);

      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      const token = res.data.token;

      window.location.href = `http://localhost:3001?token=${token}`;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            {!showLogin ? (
              <>
                <h3 className="text-center mb-4">Signup</h3>
                <form onSubmit={handleSignup}>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="password"
                    className="form-control mb-3"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="password"
                    className="form-control mb-3"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  {error && <p className="text-danger">{error}</p>}

                  <button className="btn btn-primary w-100">Sign Up</button>

                  <button
                    type="button"
                    className="btn btn-link w-100 mt-2"
                    onClick={() => setShowLogin(true)}
                  >
                    Already have an account? Login
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />

                  <input
                    type="password"
                    className="form-control mb-3"
                    id="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />

                  {error && <p className="text-danger">{error}</p>}

                  <button className="btn btn-success w-100">Login</button>

                  <button
                    type="button"
                    className="btn btn-link w-100 mt-2"
                    onClick={() => setShowLogin(false)}
                  >
                    New user? Signup
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
