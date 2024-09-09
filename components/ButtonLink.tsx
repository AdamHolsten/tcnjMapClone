import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/colors";

import React from "react";
interface ButtonLinkProps {
  url: string;
  linkText: string;
  blueBorder?: boolean; // Optional boolean prop
  noMarginBottom?: boolean; // Optional boolean prop
  marginRightAndBottom?: boolean; // Optional boolean prop
}

export const ButtonLink = ({
  url,
  linkText,
  blueBorder,
  noMarginBottom,
  marginRightAndBottom,
}: ButtonLinkProps) => {
  return (
    <Link
      href={url}
      style={[
        styles.button,
        blueBorder && styles.blueBorderButton,
        noMarginBottom && styles.noMarginBottom,
        marginRightAndBottom && styles.marginRightAndBottom,
      ]}
    >
      <Text>{linkText}</Text>
    </Link>
  );
};
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tcnjblue,
    color: "white",
    padding: 10,
    textAlign: "center",
    borderRadius: 0,
    // marginVertical: 20,
    fontFamily: "OpenSans_600SemiBold",
    textTransform: "uppercase",
    paddingVertical: 30,
    marginTop: 30,
    fontSize: 16,
    lineHeight: 30,
    width: "100%",
    maxWidth: 600,
    marginHorizontal: deviceWidth > 800 ? "auto" : 0,

    ...Platform.select({
      web: {
        marginBottom: 60,
      },
    }),
  },
  blueBorderButton: {
    borderColor: Colors.tcnjblue,
    borderWidth: 2,
    color: Colors.tcnjblue,
    backgroundColor: "white",
  },
  noMarginBottom: {
    marginBottom: 0,
  },
  marginRightAndBottom: {
    marginTop: 15,
    marginHorizontal: deviceWidth > 800 ? "auto" : 15,
    width: deviceWidth > 800 ? "100%" : "auto",
    marginBottom: 60,
  },
});
