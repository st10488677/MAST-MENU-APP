import React, { useState } from "react";
import { View } from "react-native";
import HomeScreen from "./HomeScreen";
import ChefScreen from "./ChefScreen";
import FilterScreen from "./FilterScreen";
import { MenuItem, Course, Screen } from "./types";
import { Picker } from "@react-native-picker/picker";


export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [menu, setMenu] = useState<MenuItem[]>([
    { id: 1, name: "Crumbed Mushrooms", description: "Crispy mushrooms with creamy dip", price: 60, category: "Starters", image: require("./Public/images/mushrooms.jpg") },
    { id: 2, name: "Buffalo Wings", description: "Spicy wings with BBQ sauce", price: 75, category: "Starters", image: require("./Public/images/wings.jpg") },
    { id: 3, name: "Samosas", description: "Crispy fried pastry filled with spiced potatoes", price: 55, category: "Starters", image: require("./Public/images/samosas.jpg") },
    { id: 4, name: "Steak with Mushroom Sauce", description: "Juicy steak topped with mushroom sauce", price: 160, category: "Main Course", image: require("./Public/images/steak.jpg") },
    { id: 5, name: "Mutton Bunny Chow", description: "Traditional Durban-style curry in a bread loaf", price: 120, category: "Main Course", image: require("./Public/images/bunnychow.jpg") },
    { id: 6, name: "Butter Chicken", description: "Creamy Indian-style butter chicken", price: 130, category: "Main Course", image: require("./Public/images/butterchicken.jpg") },
    { id: 7, name: "Ice Cream", description: "Vanilla ice cream with chocolate drizzle", price: 45, category: "Desserts", image: require("./Public/images/icecream.jpg") },
    { id: 8, name: "Red Velvet Cake", description: "Soft red velvet slice with cream cheese frosting", price: 60, category: "Desserts", image: require("./Public/images/redvelvet.jpg") },
    { id: 9, name: "Brownies", description: "Rich chocolate brownies with nuts", price: 55, category: "Desserts", image: require("./Public/images/brownies.jpg") },
  ]);

  const addDish = (item: MenuItem) => setMenu([...menu, { ...item, id: Date.now() }]);
  const removeDish = (id: number) => setMenu(menu.filter((dish) => dish.id !== id));

  if (screen === "home") return <HomeScreen menu={menu} setScreen={setScreen} />;
  if (screen === "chef") return <ChefScreen menu={menu} addDish={addDish} removeDish={removeDish} setScreen={setScreen} />;
  if (screen === "filter") return <FilterScreen menu={menu} setScreen={setScreen} />;
  
  return <View />;
}
