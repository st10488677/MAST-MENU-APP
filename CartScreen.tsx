import React from "react";
import { Props } from "./types"; // Import the shared Props interface

export default function CartScreen({ cart, resetCart, setScreen }: Props) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const styles = {
    container: {
      backgroundColor: "#bfdbfe",
      minHeight: "100vh",
      padding: 20,
      textAlign: "center" as const,
      fontFamily: "Arial, sans-serif",
    },
    button: {
      border: "none",
      borderRadius: 8,
      padding: 10,
      color: "#fff",
      margin: 5,
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your orders will appear here...</p>
      ) : (
        cart.map((i) => <p key={i.id}>{i.name} — R{i.price}</p>)
      )}
      <h3>Total: R{total}</h3>

      <button
        style={{ ...styles.button, backgroundColor: "#dc2626" }}
        onClick={() => resetCart()}
      >
        🔁 Reset Cart
      </button>

      <button
        style={{ ...styles.button, backgroundColor: "#16a34a" }}
        onClick={() => alert("Checkout complete ✅")}
      >
        💳 Checkout
      </button>

      <button
        style={{ ...styles.button, backgroundColor: "gray" }}
        onClick={() => setScreen("home")}
      >
        🔙 Back
      </button>
    </div>
  );
}
