import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

interface Props {
  data: string | undefined; // Adjust type to expect string directly
  largeHeroImage: string | undefined; // Adjust type to expect string directly
}

const SlugHero: React.FC<Props> = ({ data, largeHeroImage }) => {
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* White background view */}
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "white",
          height: 400,
          position: "absolute",
          top: deviceWidth > 400 ? 275 : 200,
        }}
      ></View>

      {/* Hero image container */}
      {/* <View
        style={[
          styles.heroImageContainer,
          {
            paddingLeft: deviceWidth > 650 ? 0 : 20,
          },
        ]}
      > */}
      {/* Hero image */}
      <View
        style={[
          styles.newImageContainer,
          {
            marginLeft: deviceWidth < 720 ? 40 : 0,
            paddingLeft: deviceWidth < 720 ? 0 : 0,
            borderRadius: 10,
          },
        ]}
      >
        <img
          src={deviceWidth < 650 ? data : largeHeroImage}
          style={styles.heroImage}
        />
        {/* <img src={} style={styles.heroImage} /> */}
      </View>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    position: "relative",
    alignContent: "center",
    alignItems: "center",
  },
  // heroImageContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "100%",
  //   maxWidth: 700,
  // },
  newImageContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 700,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    position: "relative",
    // resizeMode: "contain",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 0,
    marginHorizontal: "auto",
    flex: 1,
  },
});

export default SlugHero;
