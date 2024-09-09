import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { StopTypes } from "../api/mapapi";
import { Link, useRouter } from "expo-router";
import { SvgUri, SvgXml } from "react-native-svg";
import { MapHeader } from "./MapHeader";
import Colors from "../constants/colors";

// const TourStopImage = require("../assets/tour-stops/TourStops_1.svg");

type Props = {
  item: StopTypes;
  index: number;
  width: number;
  imageHeight: number;
  height: number | any;
  horizontalMargin: number;
  stopNumber: number;
};
export const CarouselItem = ({
  item,
  index,
  width,
  height,
  imageHeight,
  horizontalMargin,
  stopNumber,
}: Props) => {
  const router = useRouter(); // Get router object
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  // console.log(deviceHeight);
  return (
    <View
      style={{
        marginHorizontal: 0,
        // marginLeft: index === 0 && deviceWidth / 2 - width / 2,
        // marginRight: 10,
      }}
    >
      <View
        style={[
          styles.container,
          {
            width: width,
            // height: height,
            height: deviceHeight < 700 ? height - 50 : height,
            //   marginHorizontal: horizontalMargin,
            marginHorizontal: 0,
            // marginLeft: index === 0 ? deviceWidth / 2 - width / 2 : 0,
            // marginRight: index === 15 ? deviceWidth / 2 - width / 2 : 0,

            // marginLeft: 500,
          },
        ]}
      >
        <Pressable
          onPress={() => {
            router.push(`/(stops)/${item.slug}`); // Navigate to the specified route

            // Handle navigation when the image is pressed
          }}
        >
          <View style={styles.topContainer}>
            {/* <Link
          href={`/(stops)/${item.slug}`}
          style={{ width: "100%", height: imageHeight }}
        > */}

            <Image
              style={[
                styles.sliderImage,
                {
                  width: width,
                  height: deviceHeight < 700 ? imageHeight - 35 : imageHeight,
                },
              ]}
              source={{
                uri: item.virtualTourSlide.mobileStopImage?.mediaItemUrl,
              }}
            />

            {/* </Link> */}
            <View
              style={{
                alignContent: "center",
                height: height - imageHeight,
              }}
            >
              {/* <SvgUri
              width={Platform.OS === "android" ? 40 : 50}
              height={Platform.OS === "android" ? 40 : 50}
              uri={`https://tcnj.edu/custom/map-app/tour-stops/TourStops_${stopNumber}.svg`}
              style={styles.numberStyle}
            /> */}
              {/* <SvgXml
            xml={arrowSvg}
            width={20}
            height={20}
            style={{ position: "absolute", top: -25, right: 20, zIndex: 1000 }}
          /> */}
              {/* <Link
            href={`/(stops)/${item.slug}`}
            style={{
              paddingLeft: 20,
              marginTop: 14,
            }}
          > */}
              <View
                style={[
                  styles.textWrapper,
                  {
                    // height: height - imageHeight,
                    height:
                      deviceHeight < 700
                        ? height - imageHeight - 15
                        : height - imageHeight,
                  },
                ]}
              >
                <View
                  style={{
                    justifyContent: "center",
                    // alignItems: "center",
                    alignContent: "center",
                    width: "100%", // Adjust spacing between MapHeader and SvgUri
                  }}
                >
                  <MapHeader header={item.title} />
                  {/* <SvgUri
                  style={{ position: "absolute", right: 0 }}
                  width={10}
                  height={20}
                  uri={`https://admissions.tcnj.edu/wp-content/uploads/sites/186/2024/03/working-arrow.svg`}
                /> */}
                </View>
              </View>

              {/* <Image
              source={require("../assets/arrow.png")}
              style={{
                width: 10,
                height: 18,
                paddingLeft: 50,
              }}
            /> */}
              {/* </Link> */}
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: "bold" },
  numberStyle: {
    position: "absolute",
    top: -30,
    right: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    textShadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },

    ...Platform.select({
      android: {
        elevation: 3,
        backgroundColor: Colors.tcnjyellow,
        borderRadius: 50,
        top: -25,
      },
    }),
  },
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    textShadowRadius: 0.5,
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 20,
    overflow: "visible",
    marginBottom: 10,
    marginTop: 3,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  topContainer: {
    flexDirection: "column",
    overflow: "visible",
    height: "100%",
  },
  sliderImage: {
    // height: 120,
    // paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // resizeMode: "cover", // Ensure image fills its container
    position: "relative",
    resizeMode: "cover",
    top: 0,
    // marginTop: -500,
  },
  textWrapper: {
    flexDirection: "row",
    // paddingLeft: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    ...Platform.select({
      android: {
        marginTop: -5,
      },
    }),
  },
});
