import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginPage = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (userName === "ashwin" && password === "123456") {
      navigation.navigate("Home");
    }
  };

  return (
    <View>
      {/* <Button title="Go to Home" onPress={() => navigation.goBack()} /> */}
      {/* This button is actually not needed */}
      <TextInput
        style={styles.input}
        value={userName}
        placeholder="Enter your username"
        onChangeText={(name) => setUserName(name)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(pass) => setPassword(pass)}
      />
      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 40,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    margin: 10,
    height: 40,
    borderRadius: 5,
    backgroundColor: "greenyellow",
    justifyContent: "center",
    alignItems: "center",
  },
});
