import React from "react";
import { ScrollView, Text, View, Image, Button, StyleSheet } from "react-native";
import { MenuItem } from "./types";

interface Props {
  menu: MenuItem[];
  setScreen: (screen: "home" | "chef" | "filter") => void;
}

export default function HomeScreen({ menu, setScreen }: Props) {
  const avgPrices = (course: string) => {
    const items = menu.filter((m) => m.category === course);
    if (!items.length) return 0;
    return (items.reduce((sum, i) => sum + i.price, 0) / items.length).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍽️ Chef's Menu</Text>
      {["Starters", "Main Course", "Desserts"].map((course) => (
        <View key={course}>
          <Text style={styles.courseTitle}>
            {course} (Avg: R{avgPrices(course)})
          </Text>
          {menu.filter((item) => item.category === course).map((item) => (
            <View style={styles.card} key={item.id}>
              <Image source={item.image} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
      <View style={styles.buttons}>
        <Button title="Add / Remove Dishes" onPress={() => setScreen("chef")} />
        <Button title="Filter Menu" onPress={() => setScreen("filter")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#0f172a", padding: 10 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", marginVertical: 10, textAlign: "center" },
  courseTitle: { color: "#38bdf8", fontSize: 18, marginVertical: 5 },
  card: { flexDirection: "row", backgroundColor: "#1e293b", marginVertical: 5, borderRadius: 10, padding: 10 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  name: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  desc: { color: "#94a3b8" },
  price: { color: "#facc15", marginTop: 4 },
  buttons: { marginTop: 20, gap: 10 },
});
