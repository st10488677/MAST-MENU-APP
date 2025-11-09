import React, { useState } from "react";

interface Props {
  login: (role: "customer" | "chef") => void;
}

export default function LoginScreen({ login }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const styles = {
    container: {
      backgroundColor: "#0f172a",
      height: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    logo: {
      width: 120,
      marginBottom: 30,
    },
    input: {
      margin: 8,
      padding: 10,
      borderRadius: 6,
      border: "none",
      width: 200,
    },
    button: {
      width: 100,
      padding: 10,
      border: "none",
      borderRadius: 6,
      color: "#fff",
      cursor: "pointer",
      margin: 8,
      fontWeight: "bold",
    },
    customerBtn: {
      backgroundColor: "#15803d",
    },
    chefBtn: {
      backgroundColor: "#1d4ed8",
    },
  };

  return (
    <div style={styles.container}>
      <img src="/images/menu-logo.png" alt="Menu Master" style={styles.logo} />
      <input
        type="text"
        placeholder="Enter username"
        style={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        style={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <button
          style={{ ...styles.button, ...styles.customerBtn }}
          onClick={() => login("customer")}
        >
          Customer
        </button>
        <button
          style={{ ...styles.button, ...styles.chefBtn }}
          onClick={() => login("chef")}
        >
          Chef
        </button>
      </div>
    </div>
  );
}
