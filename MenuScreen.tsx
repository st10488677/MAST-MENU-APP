import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { MenuItem } from "./types";

interface Props {
  menu: MenuItem[];
  addToCart: (item: MenuItem) => void;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

export default function MenuScreen({ menu, addToCart, setScreen }: Props) {
  const [category, setCategory] = useState<"Starters" | "Main Course" | "Desserts">("Starters");

  return (
    <ScrollView style={{ backgroundColor: "#fef08a" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Our Meals</Text>

        <View style={styles.categoryRow}>
          {["Starters", "Main Course", "Desserts"].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && { backgroundColor: "#2563eb" },
              ]}
              onPress={() => setCategory(cat as any)}
            >
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {menu
          .filter((m) => m.category === category)
          .map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.price}>Price: R{item.price}</Text>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#15803d" }]}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1d4ed8" }]}
          onPress={() => setScreen("cart")}
        >
          <Text style={styles.buttonText}>Go to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  categoryRow: { flexDirection: "row", marginBottom: 15 },
  categoryButton: {
    backgroundColor: "#93c5fd",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  categoryText: { fontWeight: "bold" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "95%",
  },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  itemName: { fontWeight: "bold", fontSize: 16 },
  desc: { fontSize: 13, color: "#4b5563", marginVertical: 3 },
  price: { fontWeight: "bold", color: "#000" },
  button: {
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
