import React from "react";

// All possible screens
export type Screen = "login" | "home" | "menu" | "cart" | "chef";

// User roles
export type Role = "" | "customer" | "chef";

// Course categories
export type Course = "Starters" | "Main Course" | "Desserts";

// Menu item structure
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: Course;
}

// Shared props across screens
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
