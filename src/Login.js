import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import MusicApp from "./app/index";

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const Login = () => {
  const [isReady, setIsReady] = useState(false);

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require("../assets/bg.jpg")]);
    await Promise.all([...imageAssets]);
  };

  return (
    <View style={styles.container}>
      {isReady ? (
        <MusicApp />
      ) : (
        <AppLoading
          startAsync={_loadAssetsAsync}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
