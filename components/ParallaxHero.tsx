import {
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Colors from "@/constants/colors";

const { width } = Dimensions.get("window");
// const IMG_HEIGHT = width > 800 ? 675 : 430;
const IMG_HEIGHT = width > 1600 ? 700 : width > 800 ? 550 : 430;

export const ParallaxHero = ({
  offset,
  title,
  heroImage,
  heroImageLarge,
}: {
  offset: Animated.SharedValue<number>;
  title: string;
  heroImage: ImageSourcePropType;
  heroImageLarge: ImageSourcePropType;
}) => {
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            offset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT / 3]
          ),
        },
        {
          scale: interpolate(
            offset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [1.5, 1, 1]
          ),
        },
      ],
    };
  });

  const selectedImage = width > 800 ? heroImageLarge : heroImage;
  //   console.log("Selected Image:", selectedImage);

  return (
    <View style={{ backgroundColor: "#474747" }}>
      <Animated.Image
        source={selectedImage}
        style={[styles.heroImage, imageAnimatedStyle]}
        entering={FadeIn.duration(500)}
      />
      <Animated.Text
        style={styles.title}
        entering={FadeInDown.duration(600).delay(200)}
      >
        {title}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heroImage: { width, height: IMG_HEIGHT },
  title: {
    position: "absolute",
    top: IMG_HEIGHT / 2 - 30,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 50,
    lineHeight: 60,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    elevation: 1,
    fontFamily: "AlfaSlabOne_400Regular",
  },
});
