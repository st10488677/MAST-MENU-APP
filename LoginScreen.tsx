import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Role } from "./types";

interface LoginProps {
  login: (role: Role) => void;
}

export default function LoginScreen({ login }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://picsum.photos/120" }} style={styles.logo} />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity
          style={[styles.button, styles.customerBtn]}
          onPress={() => login("customer")}
        >
          <Text style={styles.buttonText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.chefBtn]}
          onPress={() => login("chef")}
        >
          <Text style={styles.buttonText}>Chef</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  customerBtn: { backgroundColor: "#15803d" },
  chefBtn: { backgroundColor: "#1d4ed8" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

