import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const containerStyle = {
  padding: "20px",
  backgroundColor: "#f5f5f5",
};

const headerStyle = {
  color: "#dc143c",
  marginBottom: "20px",
};

const addButtonStyle = {
  textDecoration: "none",
  color: "#fff",
  backgroundColor: "#dc143c",
  padding: "10px 20px",
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: "bold",
  display: "inline-block",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  backgroundColor: "#000",
  color: "#fff",
  padding: "10px",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const actionButtonStyle = {
  backgroundColor: "#dc143c",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  margin: "0 5px",
  textDecoration: "none",
};

const editButtonStyle = {
  ...actionButtonStyle,
  backgroundColor: "#4CAF50", // Green for edit button
};

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Users</h1>
      <Link to="/add" style={addButtonStyle}>
        Add User
      </Link>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.age}</td>
              <td style={tdStyle}>
                <Link to={`/update/${user.id}`} style={editButtonStyle}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={actionButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
