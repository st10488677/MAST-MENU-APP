import React, { useState } from "react";
import { View, Text, Button, Image, ScrollView, StyleSheet } from "react-native";
import { MenuItem } from "./types";

interface Props {
  menu: MenuItem[];
  setScreen: (s: "home" | "chef" | "filter") => void;
}

export default function FilterScreen({ menu, setScreen }: Props) {
  const [filter, setFilter] = useState<string>("All");

  const filteredMenu =
    filter === "All" ? menu : menu.filter((item) => item.category === filter);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍴 Filter by Course</Text>

      <View style={styles.buttonRow}>
        <Button title="All" onPress={() => setFilter("All")} />
        <Button title="Starters" onPress={() => setFilter("Starters")} />
        <Button title="Main Course" onPress={() => setFilter("Main Course")} />
        <Button title="Desserts" onPress={() => setFilter("Desserts")} />
      </View>

      {filteredMenu.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>R{item.price}</Text>
          </View>
        </View>
      ))}

      <Button title="⬅ Back to Home" onPress={() => setScreen("home")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#0f172a", padding: 10 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginVertical: 10, textAlign: "center" },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  card: { flexDirection: "row", backgroundColor: "#1e293b", marginVertical: 6, borderRadius: 10, padding: 10 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  name: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  desc: { color: "#94a3b8" },
  price: { color: "#facc15", marginTop: 4 },
});
