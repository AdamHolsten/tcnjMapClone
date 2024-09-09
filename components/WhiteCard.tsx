import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import React from "react";
// const { width } = Dimensions.get("window");
interface WhiteCardProps {
  children: React.ReactNode;
  topCard?: boolean; // Optional boolean prop
  lastCard?: boolean; // Optional boolean prop
}

export const WhiteCard = ({ children, topCard, lastCard }: WhiteCardProps) => {
  return (
    <View
      style={[
        styles.whiteCard,
        topCard && styles.topCard,

        lastCard && styles.lastCard,
      ]}
    >
      {children}
    </View>
  );
};

// export default WhiteCard
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  whiteCard: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    textShadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
    // marginHorizontal: 15,
    paddingVertical: 60,
    // paddingBottom: 60,
    // paddingHorizontal: 45,
    paddingHorizontal: deviceWidth < 400 ? 25 : 45,
    maxWidth: 600,
    marginHorizontal: deviceWidth > 650 ? "auto" : 15,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  topCard: { marginTop: -60 },
  lastCard: { marginBottom: 60 },
});
