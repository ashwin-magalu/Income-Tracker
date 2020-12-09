import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;

const runTiming = (clock, value, dest) => {
  const [finished, setFinished] = useState(new Value(0));
  const [position, setPosition] = useState(new Value(0));
  const [time, setTime] = useState(new Value(0));
  const [frameTime, setFrameTime] = useState(new Value(0));

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(
        setFinished(0),
        setTime(0),
        setPosition(value),
        setFrameTime(0),
        (config.toValue, dest),
        startClock(clock)
      ),
    ]),
    timing(clock, state, config),
    cond(finished, debug("stop clock", stopClock(clock))),
    position,
  ]);
};

const MusicApp = () => {
  const [buttonOpacity, setButtonOpacity] = useState(new Value(1));
  const [onStateChange, setOnStateChange] = useState(
    event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(setButtonOpacity(runTiming(new Clock(), 1, 0)))
            ),
          ]),
      },
    ])
  );
  const [buttonY, setButtonY] = useState(
    interpolate(buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    })
  );
  const [bgY, setBgY] = useState(
    interpolate(buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    })
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "flex-end" }}
    >
      <Animated.View
        style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: bgY }] }}
      >
        <Image
          source={require("../../assets/bg.jpg")}
          style={{ flex: 1, height: null, width: null }}
        />
      </Animated.View>
      <View style={{ height: height / 3, justifyContent: "center" }}>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity,
              transform: [{ translateY: buttonY }],
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign In</Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View
          style={{
            ...styles.button,
            backgroundColor: "#2e71dc",
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }],
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Sign In with Google
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default MusicApp;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
