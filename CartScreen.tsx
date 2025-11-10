import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Props } from "./types";

export default function CartScreen({ cart, resetCart, setScreen }: Props) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text>Your orders will appear here...</Text>
      ) : (
        cart.map((i) => <Text key={i.id}>{i.name} — R{i.price}</Text>)
      )}
      <Text style={{ fontWeight: "bold", marginTop: 10 }}>Total: R{total}</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#dc2626" }]} onPress={resetCart}>
        <Text style={styles.buttonText}>🔁 Reset Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#16a34a" }]} onPress={() => alert("Checkout complete ✅")}>
        <Text style={styles.buttonText}>💳 Checkout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "gray" }]} onPress={() => setScreen("home")}>
        <Text style={styles.buttonText}>🔙 Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#bfdbfe" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  button: { padding: 10, borderRadius: 8, marginTop: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
