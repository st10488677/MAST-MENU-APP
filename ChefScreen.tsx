import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // ✅ Correct import
import { Props, Course, MenuItem } from "./types";

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
      alert("Please fill all required fields!");
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

    setDish({ name: "", price: "", image: "", description: "", category: "Starters" });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👨‍🍳 Add a New Dish</Text>
      <TextInput style={styles.input} placeholder="Dish Name" value={dish.name} onChangeText={(v) => setDish({ ...dish, name: v })} />
      <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={dish.price} onChangeText={(v) => setDish({ ...dish, price: v })} />
      <TextInput style={styles.input} placeholder="Image URL" value={dish.image} onChangeText={(v) => setDish({ ...dish, image: v })} />
      <TextInput style={styles.input} placeholder="Description" value={dish.description} onChangeText={(v) => setDish({ ...dish, description: v })} />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dish.category}
          onValueChange={(v: Course) => setDish({ ...dish, category: v })} // ✅ typed
        >
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Main Course" value="Main Course" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#16a34a" }]} onPress={handleAdd}>
          <Text style={styles.buttonText}>➕ Add Dish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#dc2626" }]} onPress={() => setScreen("home")}>
          <Text style={styles.buttonText}>🔙 Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: { width: "90%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginVertical: 5 },
  pickerContainer: { width: "90%", marginVertical: 5, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 },
  buttonRow: { flexDirection: "row", marginTop: 15 },
  button: { padding: 10, borderRadius: 8, marginHorizontal: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
