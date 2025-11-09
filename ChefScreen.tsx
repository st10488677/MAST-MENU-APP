import React, { useState } from "react";
import { Props, Course, MenuItem } from "./types"; // Import the shared Props interface

export default function ChefScreen({ addDish, setScreen }: Props) {
  const [dish, setDish] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "Starters" as Course,
  });

  const handleAdd = () => {
    if (!dish.name || !dish.price || !dish.image) {
      alert("Please fill in all required fields");
      return;
    }

    const newDish: MenuItem = {
      id: Date.now(),
      name: dish.name,
      price: parseFloat(dish.price),
      image: dish.image,
      description: dish.description,
      category: dish.category,
    };

    addDish(newDish);
    alert("Dish added successfully!");

    // Reset form
    setDish({
      name: "",
      price: "",
      image: "",
      description: "",
      category: "Starters",
    });
  };

  const styles = {
    container: {
      backgroundColor: "#fff3cd",
      height: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      width: "80%",
      padding: 10,
      margin: 5,
      borderRadius: 8,
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px 15px",
      borderRadius: 8,
      border: "none",
      color: "#fff",
      margin: 5,
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2>👨‍🍳 Add a New Dish</h2>

      <input
        placeholder="Dish name"
        style={styles.input}
        value={dish.name}
        onChange={(e) => setDish({ ...dish, name: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        style={styles.input}
        value={dish.price}
        onChange={(e) => setDish({ ...dish, price: e.target.value })}
      />
      <input
        placeholder="Image URL"
        style={styles.input}
        value={dish.image}
        onChange={(e) => setDish({ ...dish, image: e.target.value })}
      />
      <textarea
        placeholder="Description"
        style={styles.input}
        value={dish.description}
        onChange={(e) => setDish({ ...dish, description: e.target.value })}
      />
      <select
        style={styles.input}
        value={dish.category}
        onChange={(e) => setDish({ ...dish, category: e.target.value as Course })}
      >
        <option>Starters</option>
        <option>Main Course</option>
        <option>Desserts</option>
      </select>

      <div>
        <button
          style={{ ...styles.button, backgroundColor: "#16a34a" }}
          onClick={handleAdd}
        >
          ➕ Add Dish
        </button>

        <button
          style={{ ...styles.button, backgroundColor: "#dc2626" }}
          onClick={() => setScreen("menu")}
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}


