import React from "react";
import { StyleSheet } from "react-native";
import Home from "./src/Home";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./src/LoginPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login Page">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Login Page"
          component={LoginPage}
          options={{
            title: "Sign-in or Sign-up",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/* 
For routing guidance visit https://reactnavigation.org/

install some packages using the below commands:

  npm install @react-navigation/native
  npm install @react-navigation/stack //Stack screens, like an array having pop and push
  expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

initialRouteName and options={{title: "xyz"}} are optional

visit https://rnfirebase.io/ for help regarding react-native and firebase
*/
