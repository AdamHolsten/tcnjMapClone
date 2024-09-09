import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TextStyle,
} from "react-native";
import React from "react";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import Colors from "@/constants/colors";

type Props = {
  header: string;
  customStyle?: TextStyle;
};

export const MapHeader = ({ header, customStyle }: Props) => {
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
  });

  if (!fontsLoaded) {
    // Fonts are not yet loaded
    return <ActivityIndicator />;
  }

  return <Text style={[styles.header, customStyle]}>{header}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "AlfaSlabOne_400Regular",
    fontSize: 18,
    textAlign: "left",
    color: Colors.tcnjblue,
    maxWidth: 225,
  },
});
