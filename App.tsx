import React, { useState } from "react";
import { View, Text } from "react-native";

import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import MenuScreen from "./MenuScreen";
import CartScreen from "./CartScreen";
import ChefScreen from "./ChefScreen";

import { MenuItem, Props, Screen, Role } from "./types";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [role, setRole] = useState<Role>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([
    { id: 1, name: "Buffalo Wings", price: 80, image: "MAST-MENU-APP/images/buffalo-wings.jpg", description: "Spicy wings", category: "Starters" },
    { id: 2, name: "Crumbed Mushrooms", price: 70, image: "MAST-MENU-APP/images/crumbed-mushrooms.jpg", description: "Golden mushrooms", category: "Starters" },
    { id: 3, name: "Samosas", price: 50, image: "MAST-MENU-APP/images/Samoosa-Day.jpg", description: "Crispy samosas", category: "Starters" },
    { id: 4, name: "Steak with Mushroom Sauce", price: 200, image: "MAST-MENU-APP/images/steak-mushroom-sauce.jpg", description: "Juicy steak", category: "Main Course" },
    { id: 5, name: "Mutton Bunny Chow", price: 150, image: "MAST-MENU-APP/images/mutton-bunny.jpg", description: "Spicy mutton", category: "Main Course" },
    { id: 6, name: "Butter Chicken", price: 120, image: "MAST-MENU-APP/images/Butter-Chicken.jpg", description: "Creamy chicken", category: "Main Course" },
    { id: 7, name: "Ice Cream", price: 40, image: "MAST-MENU-APP/images/ice-cream2.jpg", description: "Vanilla ice cream", category: "Desserts" },
    { id: 8, name: "Red Velvet Cake", price: 50, image: "MAST-MENU-APP/images/RedVelvetCake9-2.jpg", description: "Rich red velvet", category: "Desserts" },
    { id: 9, name: "Brownies", price: 45, image: "MAST-MENU-APP/images/brownies.jpg", description: "Chocolate brownies", category: "Desserts" },
  ]);
//cart functions 
  const addToCart = (item: MenuItem) => setCart([...cart, item]);
  const removeFromCart = (id: number) => setCart(cart.filter((i) => i.id !== id));
  const resetCart = () => setCart([]);
//menu functions
  const addDish = (item: MenuItem) => setMenu([...menu, item]);
  const removeDish = (id: number) => setMenu(menu.filter((m) => m.id !== id));
// shared props object
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

  if (screen === "login") return <LoginScreen login={(r) => { setRole(r); setScreen("home"); }} />;
  if (screen === "home") return <HomeScreen {...sharedProps} />;
  if (screen === "menu") return <MenuScreen {...sharedProps} />;
  if (screen === "cart") return <CartScreen {...sharedProps} />;
  if (screen === "chef") return <ChefScreen {...sharedProps} />;

  return (
    <View><Text>Loading...</Text></View>
  );
}

