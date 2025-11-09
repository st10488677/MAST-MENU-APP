import React from "react";
import { Props } from "./types"; // Import the shared Props interface

export default function HomeScreen({ setScreen, role, username }: Props) {
  const styles = {
    container: {
      backgroundColor: "#e0f2fe",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center" as const,
      fontFamily: "Arial, sans-serif",
    },
    card: {
      backgroundColor: "#bfdbfe",
      borderRadius: 20,
      padding: 20,
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      width: 300,
    },
    welcome: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: 10,
      border: "none",
      fontSize: "16px",
      marginBottom: 10,
      cursor: "pointer",
      fontWeight: "bold",
    },
    viewMenu: {
      backgroundColor: "#3b82f6",
      color: "#fff",
    },
    viewCart: {
      backgroundColor: "#16a34a",
      color: "#fff",
    },
    back: {
      backgroundColor: "#dc2626",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.welcome}>WELCOME {username || role.toUpperCase()}!</h3>
        <button
          style={{ ...styles.button, ...styles.viewMenu }}
          onClick={() => setScreen("menu")}
        >
          🍽 View menu
        </button>

        <button
          style={{ ...styles.button, ...styles.viewCart }}
          onClick={() => setScreen("cart")}
        >
          🛒 View cart
        </button>

        {role === "chef" && (
          <button
            style={{ ...styles.button, backgroundColor: "#fbbf24", color: "#000" }}
            onClick={() => setScreen("chef")}
          >
            👨‍🍳 Chef tools
          </button>
        )}

        <button
          style={{ ...styles.button, ...styles.back }}
          onClick={() => setScreen("login")}
        >
          🔙 back
        </button>
      </div>
    </div>
  );
}
