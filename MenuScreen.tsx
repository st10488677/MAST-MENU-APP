import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Props, MenuItem } from "./types";

export default function MenuScreen({ menu, addToCart, setScreen }: Props) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍴 Menu</Text>
      {menu.map((item: MenuItem) => (
        <View key={item.id} style={styles.item}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>Course: {item.category}</Text>
          <Text>Price: R{item.price}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#16a34a" }]}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]} onPress={() => setScreen("home")}>
        <Text style={styles.buttonText}>🔙 Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e0f2fe" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  item: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginVertical: 5 },
  button: { padding: 10, borderRadius: 8, marginTop: 5, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
