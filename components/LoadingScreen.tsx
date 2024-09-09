import { Text, StyleSheet, View, ActivityIndicator, Image } from "react-native";
import React, { Component } from "react";
import Colors from "@/constants/colors";
import { FadeIn, FadeOut } from "react-native-reanimated";
import Animated from "react-native-reanimated";

export const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreen}>
      <Image
        source={require("../assets/splash-screen-icon.png")}
        style={{ width: 390, height: 390 }}
        //   resizeMode="contain"
      />
      <ActivityIndicator />
    </View>
    //   <View style={styles.loadingScreen}>
    //     <ActivityIndicator />
    //   </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.tcnjyellow,
    flex: 1,
  },
});
