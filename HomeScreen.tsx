import React from "react";
import { MenuItem } from "./types";

interface Props {
  menu: MenuItem[];
  setScreen: (screen: string) => void;
}

export default function HomeScreen({ menu, setScreen }: Props) {
  // Calculate averages safely
  const getAverage = (category: string) => {
    const items = menu.filter((m) => m.category === category);
    if (items.length === 0) return 0;
    return (
      items.reduce((sum, m) => sum + m.price, 0) / items.length
    ).toFixed(2);
  };

  const styles = {
    container: {
      backgroundColor: "#e0f2fe",
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
    listItem: {
      backgroundColor: "#f9fafb",
      margin: "10px auto",
      padding: "10px",
      borderRadius: "8px",
      width: "80%",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <h1>🍽️ Welcome to Our Menu App</h1>

      <h3>Average Prices by Course</h3>
      <p>Starters: R{getAverage("Starters")}</p>
      <p>Main Course: R{getAverage("Main Course")}</p>
      <p>Desserts: R{getAverage("Desserts")}</p>

      <h2>Full Menu</h2>
      {menu.length === 0 ? (
        <p>No menu items available. Please add some from the Chef Screen.</p>
      ) : (
        menu.map((item) => (
          <div key={item.id} style={styles.listItem}>
            <h4>{item.name}</h4>
            <p>Course: {item.category}</p>
            <p>Price: R{item.price}</p>
          </div>
        ))
      )}

      <div>
        <button
          style={{ ...styles.button, backgroundColor: "#3b82f6" }}
          onClick={() => setScreen("menu")}
        >
          🍴 View Menu (Filter)
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#10b981" }}
          onClick={() => setScreen("cart")}
        >
          🛒 View Cart
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#f59e0b" }}
          onClick={() => setScreen("chef")}
        >
          👨‍🍳 Chef Tools
        </button>
      </div>
    </div>
  );
}
