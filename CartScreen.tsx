// src/screens/CartScreen.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { MenuItem, Screen } from "./types"; // correct import

interface CartProps {
  cart: MenuItem[];
  removeFromCart: (id: number) => void;
  resetCart: () => void;
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export default function CartScreen({ cart, removeFromCart, resetCart, setScreen }: CartProps) {
  const total = cart.reduce((s: number, i: MenuItem) => s + i.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Your Cart</Text>

      <ScrollView style={{ flex: 1 }}>
        {cart.length === 0 ? (
          <Text style={styles.emptyText}>Your orders will appear here...</Text>
        ) : (
          cart.map((i: MenuItem) => (
            <View key={i.id} style={styles.item}>
              <Text style={styles.name}>{i.name}</Text>
              <Text style={styles.price}>R{i.price}</Text>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromCart(i.id)}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.total}>TOTAL: R{total}</Text>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#dc2626" }]}
          onPress={resetCart}
        >
          <Text style={styles.btnText}>Reset Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#16a34a" }]}
          onPress={() => alert("Checkout complete ✅")}
        >
          <Text style={styles.btnText}>Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#3b82f6" }]}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.btnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 50, flex: 1, backgroundColor: "#bfdbfe" },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  emptyText: { textAlign: "center", color: "#374151", marginTop: 20 },
  item: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: { fontWeight: "bold", fontSize: 16 },
  price: { color: "#374151", marginTop: 4 },
  removeBtn: {
    marginTop: 8,
    backgroundColor: "#dc2626",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  footer: { padding: 12, alignItems: "center", borderTopWidth: 1, borderColor: "#93c5fd" },
  total: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  btn: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
