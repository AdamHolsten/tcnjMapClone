import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import React from "react";

interface InnerContainerProps {
  children: React.ReactNode;
  paddingBottom?: number;
}

const deviceWidth = Dimensions.get("window").width;

export const InnerContainer = ({
  children,
  paddingBottom,
}: InnerContainerProps) => {
  // Create the dynamic style for paddingBottom
  const dynamicStyle = {
    paddingBottom: paddingBottom !== undefined ? paddingBottom : 60,
  };

  return <View style={[styles.innerContainer, dynamicStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  innerContainer: {
    paddingHorizontal: deviceWidth < 400 ? 25 : 45,
    maxWidth: 600,
    marginHorizontal: deviceWidth > 650 ? "auto" : 15,
    paddingTop: 60,
    ...Platform.select({
      web: {
        paddingBottom: 0,
      },
    }),
  },
});
