import React, { useState } from "react";
import { Props, Course, MenuItem } from "./types"; // Use central Props

export default function MenuScreen({
  role,
  menu,
  addToCart,
  removeDish,
  setScreen,
}: Props) {
  const [category, setCategory] = useState<Course>("Starters");

  const filtered = menu.filter((m) => m.category === category);

  const styles = {
    container: {
      backgroundColor: "#fde047",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "Arial, sans-serif",
      textAlign: "center" as const,
    },
    button: {
      padding: "10px 15px",
      border: "none",
      borderRadius: 10,
      margin: "5px",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
    },
    menuItem: {
      backgroundColor: "#fff",
      borderRadius: 10,
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      width: 320,
      margin: "15px auto",
      padding: 10,
    },
    img: { width: "100%", borderRadius: 10 },
  };

  return (
    <div style={styles.container}>
      <h2>🍴 Our Meals</h2>
      <div>
        {["Starters", "Main Course", "Desserts"].map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.button,
              backgroundColor: category === cat ? "#2563eb" : "#93c5fd",
            }}
            onClick={() => setCategory(cat as Course)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.map((item) => (
        <div key={item.id} style={styles.menuItem}>
          <img src={item.image} alt={item.name} style={styles.img} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>💸 Price: R{item.price}</p>

          {role === "customer" ? (
            <button
              style={{ ...styles.button, backgroundColor: "#1d4ed8" }}
              onClick={() => addToCart(item)}
            >
              ➕ Add to Cart
            </button>
          ) : (
            <button
              style={{ ...styles.button, backgroundColor: "#dc2626" }}
              onClick={() => removeDish(item.id)}
            >
              ❌ Remove Item
            </button>
          )}
        </div>
      ))}

      <button
        style={{ ...styles.button, backgroundColor: "#dc2626" }}
        onClick={() => setScreen("home")}
      >
        🔙 Back
      </button>
    </div>
  );
}

