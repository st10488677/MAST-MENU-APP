import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";
import ChefScreen from "./ChefScreen";

import { MenuItem, Course, Props, Screen, Role } from "./types";

function App() {
  // State
  const [screen, setScreen] = useState<Screen>("login");
  const [role, setRole] = useState<Role>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([
    { id: 1, name: "Crumbed Mushrooms", price: 70, image: "crumbed-mushrooms.jpg", description: "Golden-fried mushrooms with a crispy coating.", category: "Starters" },
    { id: 2, name: "Samoosas", price: 40, image: "Samoosa-Day.jpg", description: "Crispy triangular pastry stuffed with spiced filling.", category: "Starters" },
    { id: 3, name: "Buffalo Wings", price: 70, image: "buffalo-wings.jpg", description: "Spicy chicken wings served with a cooling dip.", category: "Starters" },
    { id: 4, name: "Butter Chicken", price: 120, image: "Butter-Chicken.jpg", description: "Tender chicken in a creamy, buttery tomato sauce.", category: "Main Course" },
    { id: 5, name: "Steak with Mushroom Sauce", price: 160, image: "steak-mushroom-sauce.jpg", description: "Juicy grilled steak topped with rich mushroom sauce.", category: "Main Course" },
    { id: 6, name: "Mutton Bunny Chow", price: 110, image: "mutton-bunny.jpg", description: "Spicy mutton curry served inside a hollowed bread loaf.", category: "Main Course" },
    { id: 7, name: "Red Velvet Cake", price: 50, image: "RedVelvetCake9-2.jpg", description: "Moist red velvet cake with cream cheese frosting.", category: "Desserts" },
    { id: 8, name: "Ice Cream", price: 45, image: "ice-cream2.jpg", description: "Classic ice cream sundae with chocolate and toppings.", category: "Desserts" },
    { id: 9, name: "Brownies", price: 55, image: "brownies.jpg", description: "Rich chocolate brownies with a fudgy center.", category: "Desserts" },
  ]);

  // Cart functions
  const addToCart = (item: MenuItem) => setCart([...cart, item]);
  const removeFromCart = (id: number) => setCart(cart.filter((i) => i.id !== id));
  const resetCart = () => setCart([]);

  // Menu functions
  const addDish = (item: MenuItem) => setMenu([...menu, item]);
  const removeDish = (id: number) => setMenu(menu.filter((m) => m.id !== id));

  // Shared props
  const sharedProps: Props = {
    username,
    role,
    menu,
    cart,
    setScreen,
    addToCart,
    removeFromCart,
    resetCart,
    addDish,
    removeDish,
    setUsername,
    setPassword,
    password,
    setRole,
  };

  // Render screens
  switch (screen) {
    case "login":
      return (
        <LoginScreen
          login={(selectedRole: "customer" | "chef") => {
            setRole(selectedRole);
            setScreen("home"); // navigate to home after login
          }}
          {...sharedProps}
        />
      );
    case "home":
      return <HomeScreen {...sharedProps} />;
    case "menu":
      return <MenuScreen {...sharedProps} />;
    case "cart":
      return <CartScreen {...sharedProps} />;
    case "chef":
      return <ChefScreen {...sharedProps} />;
    default:
      return <div>Loading...</div>;
  }
}

export default App;
