import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function KMForm() {
  // signup form state and logic
  const { login } = useToken();
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    isKM: true,
    termsBoolean: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignup((prev) => ({
      ...prev,
      [name]: name === "termsBoolean" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // post for create user
    try {
      const url = `${process.env.REACT_APP_API_HOST}/user`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      if (!response.ok) throw new Error("Signup failed");
      await login(signup.username, signup.password);
      alert("Signup and login successful");
      navigate("/property/create");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container margin-bottom">
        <form onSubmit={handleSubmit}>
          <h2>Create Member Login</h2>
          <input
            type="text"
            name="first_name"
            value={signup.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={signup.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            name="username"
            value={signup.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={signup.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <label>
            <input
              type="checkbox"
              name="terms_boolean"
              onChange={handleChange}
              checked={signup.termsBoolean}
              required
            />
            Accept Terms & Conditions
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default KMForm;