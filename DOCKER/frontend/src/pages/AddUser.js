import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formStyle = {
  backgroundColor: "#f5f5f5",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  margin: "auto",
};

const labelStyle = {
  display: "block",
  margin: "10px 0 5px",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginBottom: "10px",
};

const buttonStyle = {
  backgroundColor: "#dc143c",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
};

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", { name, email, age });
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div
      style={{ textAlign: "center", padding: "20px", backgroundColor: "#fff" }}
    >
      <h1 style={{ color: "#dc143c" }}>Add User</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
