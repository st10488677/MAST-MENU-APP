import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Props, MenuItem } from "./types";

export default function HomeScreen({ menu, setScreen }: Props) {
  const getAverage = (category: string) => {
    const items = menu.filter((m) => m.category === category);
    if (items.length === 0) return 0;
    return (items.reduce((sum, m) => sum + m.price, 0) / items.length).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍽️ Welcome to Our Menu App</Text>
      <Text style={styles.subtitle}>Average Prices by Course</Text>
      <Text>Starters: R{getAverage("Starters")}</Text>
      <Text>Main Course: R{getAverage("Main Course")}</Text>
      <Text>Desserts: R{getAverage("Desserts")}</Text>

      <Text style={[styles.subtitle, { marginTop: 20 }]}>Full Menu</Text>
      {menu.length === 0 ? (
        <Text>No menu items available. Please add some from the Chef Screen.</Text>
      ) : (
        menu.map((item: MenuItem) => (
          <View key={item.id} style={styles.listItem}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>Course: {item.category}</Text>
            <Text>Price: R{item.price}</Text>
          </View>
        ))
      )}

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3b82f6" }]}
          onPress={() => setScreen("menu")}
        >
          <Text style={styles.buttonText}>🍴 View Menu (Filter)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#10b981" }]}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.buttonText}>🛒 View Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f59e0b" }]}
          onPress={() => setScreen("chef")}
        >
          <Text style={styles.buttonText}>👨‍🍳 Chef Tools</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#208dd6ff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#fff" },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 10, color: "#fff" },
  listItem: {
    backgroundColor: "#c3c74eff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  button: { padding: 10, borderRadius: 8, marginVertical: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
