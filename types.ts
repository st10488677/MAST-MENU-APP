import React from "react";

// Screen union type
export type Screen = "login" | "home" | "menu" | "cart" | "chef";

// Role union type
export type Role = "" | "customer" | "chef";

// Menu categories
export type Course = "Starters" | "Main Course" | "Desserts";

// Menu item type
export type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: Course;
};

// Props interface shared across screens
export interface Props {
  username: string;
  role: Role;
  menu: MenuItem[];
  cart: MenuItem[];
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  resetCart: () => void;
  addDish: (item: MenuItem) => void;
  removeDish: (id: number) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
}





