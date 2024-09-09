import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import React from "react";
import { OpenSans_600SemiBold, useFonts } from "@expo-google-fonts/open-sans";

import Colors from "@/constants/colors";

type Props = {
  header: string;
};
export const ListItem = ({ header }: Props) => {
  const [fontsLoaded] = useFonts({
    OpenSans_600SemiBold,
  });
  if (!fontsLoaded) {
    // Fonts are not yet loaded
    return <ActivityIndicator />;
  }
  return <Text style={styles.header}>{header}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
    textAlign: "left",
    lineHeight: 20,
    color: Colors.tcnjblue,
  },
});
