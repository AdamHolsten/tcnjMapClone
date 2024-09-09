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
      <View
        style={[
          styles.heroImageContainer,
          {
            paddingLeft: deviceWidth > 650 ? 0 : 20,
          },
        ]}
      >
        {/* Hero image */}
        <Image
          source={{
            uri: data,
          }}
          style={[
            styles.heroImage,
            {
              height: deviceWidth > 650 ? 600 : deviceWidth < 400 ? 300 : 355,
              maxWidth: deviceWidth > 650 ? 850 : deviceWidth < 400 ? 400 : 650,
              borderTopLeftRadius: 10,
              borderTopRightRadius: deviceWidth < 650 ? 0 : 10,
              borderBottomRightRadius: deviceWidth < 650 ? 0 : 10,
              borderBottomLeftRadius: 10,
              // borderRadius: 10,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    position: "relative",
  },
  heroImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    resizeMode: "cover",
  },
});

export default SlugHero;
