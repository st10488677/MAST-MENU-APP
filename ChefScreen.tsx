import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuItem, Course } from "./types";

interface Props {
  menu: MenuItem[];
  addDish: (item: MenuItem) => void;
  removeDish: (id: number) => void;
  setScreen: (s: "home" | "chef" | "filter") => void;
}

export default function ChefScreen({ menu, addDish, removeDish, setScreen }: Props) {
  const [dish, setDish] = useState({
    name: "",
    description: "",
    price: "",
    category: "Starters" as Course,
  });

  const submitDish = () => {
    if (!dish.name || !dish.price) return;
    addDish({
      id: Date.now(),
      name: dish.name,
      description: dish.description,
      price: parseFloat(dish.price),
      category: dish.category,
      image: require("../Public/images/mushrooms.jpg"), // default image
    });
    setDish({ name: "", description: "", price: "", category: "Starters" });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👨‍🍳 Chef Panel</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish name"
        value={dish.name}
        onChangeText={(v) => setDish({ ...dish, name: v })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={dish.description}
        onChangeText={(v) => setDish({ ...dish, description: v })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={dish.price}
        onChangeText={(v) => setDish({ ...dish, price: v })}
      />

      <Text style={styles.label}>Select Course</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={dish.category}
          onValueChange={(v) => setDish({ ...dish, category: v as Course })}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Main Course" value="Main Course" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      <Button title="Add Dish" onPress={submitDish} color="#16a34a" />

      <Text style={styles.subtitle}>🗑️ Remove from Menu</Text>
      {menu.map((item) => (
        <View key={item.id} style={styles.removeRow}>
          <Text style={styles.dishText}>{item.name}</Text>
          <Button title="Remove" onPress={() => removeDish(item.id)} color="#dc2626" />
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="⬅ Back to Menu" onPress={() => setScreen("home")} color="#3b82f6" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#0f172a", padding: 15, flex: 1 },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  label: { color: "#fff", marginVertical: 8 },
  pickerWrapper: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    color: "#fff",
  },
  subtitle: { color: "#38bdf8", fontSize: 18, marginVertical: 10 },
  removeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  dishText: { color: "#fff" },
});
