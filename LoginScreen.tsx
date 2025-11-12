// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

interface LoginProps {
  login: (role: "customer" | "chef") => void;
}

export default function LoginScreen({ login }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image source={require("../assets/menu-logo.png")} style={styles.logo} />
      <TextInput placeholder="Enter username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Enter password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <TouchableOpacity style={[styles.button, styles.customerBtn]} onPress={() => login("customer")}>
          <Text style={styles.btnText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.chefBtn]} onPress={() => login("chef")}>
          <Text style={styles.btnText}>Chef</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 20, resizeMode: "contain" },
  input: { width: 260, backgroundColor: "#fff", padding: 10, borderRadius: 8, marginVertical: 6 },
  button: { padding: 12, borderRadius: 8, marginHorizontal: 8 },
  customerBtn: { backgroundColor: "#15803d" },
  chefBtn: { backgroundColor: "#1d4ed8" },
  btnText: { color: "#fff", fontWeight: "bold" },
});
