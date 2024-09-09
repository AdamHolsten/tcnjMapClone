import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useFonts, Domine_500Medium } from "@expo-google-fonts/domine";
// import { OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useStore from "@/store/carouselStore"; // Adjust the path as necessary
import { getStops } from "@/api/mapapi";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import Colors from "@/constants/colors";
import { MapHeader } from "./MapHeader";

export default function CustomDrawerComponent(props: any) {
  const [fontsLoaded] = useFonts({
    Domine_500Medium,
    OpenSans_600SemiBold,
  });
  const insets = useSafeAreaInsets(); // Call the useSafeAreaInsets function
  const { top, bottom } = insets; // Access the top and bottom properties on the returned EdgeInsets object
  const { carouselStop, updateCarouselStop } = useStore(); // Call the useStore hook and destructure the carouselStop property

  const stopsQuery = useQuery({
    queryKey: ["stops"],
    queryFn: getStops,
  });
  const navigation = useNavigation();
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").height;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
        position: "relative",
      }}
    >
      {/* <View
        style={[styles.mapButtonView, { top: deviceWidth < 600 ? 20 : 60 }]}
      > */}
      <TouchableOpacity
        style={styles.mapButtonView}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Image
          source={require("../assets/map-icon-buttons/close-button-final.png")}
          style={{
            ...styles.btn,
            width: 40,
            height: 40,
          }}
        />
      </TouchableOpacity>
      {/* </View> */}
      {fontsLoaded && (
        <View style={styles.logoContainer}>
          <MapHeader
            header="Visit TCNJ"
            customStyle={{
              fontSize: 35,
              textAlign: "center",
              maxWidth: undefined,
              // marginVertical: 30,
            }}
          />

          <Text style={styles.introText}>
            Let’s get started! To help you get to know us, we’ve mapped out 16
            hot spots on campus. Have fun exploring the places where we love to
            live and learn.
          </Text>
        </View>
      )}
      {stopsQuery.data && (
        <View
          style={{
            backgroundColor: "white",
            margin: 0,
            paddingVertical: 30,
            paddingHorizontal: 10,
            flex: 1,
            gap: 0,
          }}
        >
          {fontsLoaded &&
            stopsQuery.data.map((item, index) => {
              // Determine background color based on carouselStop
              const backgroundColor =
                index === carouselStop ? Colors.tcnjblue : "transparent";
              const textColor =
                index === carouselStop ? "white" : Colors.tcnjblue;
              return (
                <DrawerItem
                  key={index}
                  label={`${index + 1}. ${item.title}`}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                    setTimeout(() => {
                      updateCarouselStop(item.virtualTourSlide.stopNumber - 1);
                    }, 300);
                  }}
                  style={[styles.drawerItem, { backgroundColor }]} // Apply dynamic background color
                  labelStyle={[styles.drawerItemLabel, { color: textColor }]} // Apply dynamic text color
                />
              );
            })}
        </View>
      )}
      {/* {fontsLoaded && (
        <View
          style={[
            styles.logoContainer,
            { marginVertical: 30, marginBottom: 0 },
          ]}
        >
          <Image
            source={require("@/assets/splash-screen-icon.png")}
            style={styles.logo}
          />
        </View>
      )} */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    // flex: "auto",
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 100,
    textAlign: "center",
    backgroundColor: Colors.tcnjyellow,
    height: 375,
    // paddingTop: 100,
  },
  logo: {
    width: "75%",
    height: 150,
  },
  logoText: {
    fontSize: 24,
    fontFamily: "Domine_500Medium",
    color: Colors.tcnjblue,
    marginVertical: 25,
  },
  introText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 30,
    fontFamily: "Domine_500Medium",
    paddingTop: 10,
  },
  drawerItem: {
    margin: 0, // Adjust vertical margin
    padding: 0, // Adjust vertical padding
    borderRadius: 0,
    // width: 50,
    //     borderBottomColor: Colors.tcnjblue,
    //     borderBottomWidth: 0.5,
    //     flex: 1,
    //     alignContent: "center",
    // con
    //     verticalAlign: "middle",
    // alignItems: "center",
  },
  // drawerItemLabel: {
  //   fontSize: 15, // Adjust font size
  //   color: Colors.tcnjblue, // Default text color
  // },
  drawerItemLabel: {
    fontWeight: "normal", // Adjust font weight
    margin: 0,
    paddingHorizontal: 0,
    fontSize: 14,
    // lineHeight: 25,
    fontFamily: "OpenSans_600SemiBold",
    color: Colors.tcnjblue,
    flex: 1,
    flexWrap: "wrap",
    width: "100%",
    // textAlign: "center",
  },

  mapButtonView: {
    position: "absolute",
    left: 20,
    zIndex: 10,
    top: 20,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  // btnContainer: {
  //   // elevation: 10,
  //   // shadowColor: "black",
  //   // shadowOpacity: 0.3,
  //   // shadowRadius: 6,
  //   // shadowOffset: { width: 1, height: 4 },
  //   borderRadius: 60,
  //   width: 49,
  //   height: 49,
  //   backgroundColor: Colors.tcnjblue,
  //   flex: 1,
  //   alignContent: "center",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  btn: {
    width: 30,
    height: 30,
    // paddingBottom: 30,
  },
});
