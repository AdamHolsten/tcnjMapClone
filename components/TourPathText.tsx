import { Dimensions, StyleSheet, Text, View, Platform } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import useStore from "@/store/carouselStore"; // Adjust the path as necessary
import { useFonts, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import Colors from "@/constants/colors";

const TourPathText = () => {
  const [fontsLoaded] = useFonts({
    OpenSans_700Bold,
  });
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const { showRecommendedText, tracking } = useStore(); // Call the useStore hook and destructure the carouselStop property

  // Shared value for opacity
  const opacity = useSharedValue(showRecommendedText || tracking ? 1 : 0);

  useEffect(() => {
    // Animate opacity based on showRecommendedText value
    opacity.value = withDelay(
      Platform.OS === "android" ? 0 : showRecommendedText || tracking ? 100 : 0,
      withTiming(showRecommendedText || tracking ? 1 : 0, {
        duration: showRecommendedText || tracking ? 100 : 0,
      })
    );
  }, [showRecommendedText || tracking]);

  // Animated style for the container
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.tourPathTextContainer,
        { top: deviceWidth < 600 ? 15 : 60, zIndex: 120 },
        animatedStyle,
      ]}
    >
      <View style={styles.secondaryContainer}>
        {fontsLoaded && (
          <Text
            style={[styles.tourText, { fontSize: deviceWidth > 400 ? 15 : 10 }]}
          >
            {showRecommendedText && tracking ? (
              <>
                Tracking Location & <br />
                Recommended Tour Path
              </>
            ) : showRecommendedText ? (
              "Recommended Tour Path"
            ) : tracking ? (
              "Tracking Location"
            ) : null}

            {/* {tracking && "Tracking Location"} */}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

export default TourPathText;

const styles = StyleSheet.create({
  tourPathTextContainer: {
    position: "absolute",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    // zIndex: 1,
    pointerEvents: "none",
    // backgroundColor: "white",
    // padding: 5,
    // borderRadius: 500,
    // marginHorizontal: "auto",
  },
  tourText: {
    // fontSize: deviceWidth > 400 ? 15 : 10,
    lineHeight: 15,
    color: Colors.tcnjblue,
    // borderColor: Colors.tcnjblue,
    // borderWidth: 1,
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    elevation: 10,
    // shadowColor: "white",
    // shadowOpacity: 1,
    // shadowRadius: 2.5,
    // shadowOffset: { width: 1, height: 1 },
    // backgroundColor: "white",
    paddingHorizontal: 10,
    // borderRadius: 500,
  },
  secondaryContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 500,
    marginHorizontal: "auto",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 4 },
    elevation: 10,
  },
});
