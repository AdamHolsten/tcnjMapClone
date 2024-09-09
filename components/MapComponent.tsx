import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline, Camera } from "react-native-maps";
import Animated, { FadeInDown } from "react-native-reanimated";
import Colors from "@/constants/colors";
import mapStyle from "@/assets/mapStyle.json";
import useStore from "@/store/carouselStore";
import TourPathText from "./TourPathText";
// import Compass from "./Compass"; // Import your custom compass component

interface MapComponentProps {
  stopsQuery: any;
  routeToggle: boolean;
  region: any;
  jumpStopNumber: number | undefined;
  handleJump: (stopNumber: number) => void;
  handleRouteToggle: () => void;
  handleDrawerToggle: () => void;
  recommendedRoute: { latitude: number; longitude: number }[];
  openDrawer: boolean;
  handleListItemClick: (index: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  stopsQuery,
  routeToggle,
  region,
  jumpStopNumber,
  handleJump,
  handleRouteToggle,
  handleDrawerToggle,
  recommendedRoute,
  openDrawer,
  handleListItemClick,
}) => {
  const { carouselStop, updateCarouselStop } = useStore();
  const { showRecommendedText, toggleRecommendedText } = useStore();

  const deviceHeight = Dimensions.get("window").height;

  const onMarkerSelected = (marker: any) => {
    updateCarouselStop(marker.virtualTourSlide.stopNumber - 1);
  };

  const map = useRef<MapView | null>(null);
  const [showCompass, setShowCompass] = useState(false); // State to control compass visibility

  const initialCamera: Camera = {
    center: {
      latitude: region.latitude,
      longitude: region.longitude,
    },
    // pitch: 50,
    pitch: 0,
    // pitch: Platform.OS === "android" ? 80 : 0,
    heading: 72.05,
    // altitude: 1000,
    altitude: 3000,
    zoom: Platform.OS === "android" ? 16 : 15,
  };

  useEffect(() => {
    // Show compass after a delay or condition if needed
    setTimeout(() => {
      setShowCompass(true);
    }, 2000); // Example: Show after 2 seconds
  }, []);
  const deviceWidth = Dimensions.get("window").width;

  return (
    <>
      <MapView
        style={StyleSheet.absoluteFill}
        showsUserLocation
        rotateEnabled={false}
        customMapStyle={mapStyle}
        ref={(current) => (map.current = current)}
        initialCamera={initialCamera}
        // compassOffset={{ x: 50, y: 100 }}
        showsCompass={false}
      >
        {stopsQuery.data.map(
          (
            stop: {
              virtualTourSlide: {
                latitude: any;
                longitude: any;
                stopNumber: number;
              };
              title: any;
              slug: React.Key | null | undefined;
            },
            index: number
          ) => {
            const stopCoordinate = {
              latitude: stop.virtualTourSlide.latitude,
              longitude: stop.virtualTourSlide.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
              name: stop.title,
            };
            return (
              <Marker
                key={stop.slug}
                coordinate={stopCoordinate}
                onPress={() => onMarkerSelected(stop)}
                image={
                  Platform.OS === "android"
                    ? (jumpStopNumber ?? 0) + 1 ===
                      stop.virtualTourSlide.stopNumber
                      ? require("../assets/map-pin-selected.png")
                      : require("../assets/map-pin.png")
                    : undefined
                }
              >
                {Platform.OS === "ios" && (
                  <Animated.Image
                    entering={FadeInDown.duration(350).delay(75 * index)}
                    source={
                      (jumpStopNumber ?? 0) + 1 ===
                      stop.virtualTourSlide.stopNumber
                        ? require("../assets/map-pin-selected.png")
                        : require("../assets/map-pin.png")
                    }
                    style={{
                      width: deviceWidth < 400 ? 28 : 35, // Adjust width based on deviceWidth
                      height: deviceWidth < 400 ? 28 : 35, // Adjust width based on deviceWidth
                    }}
                    resizeMode="contain"
                  />
                )}
              </Marker>
            );
          }
        )}
        {showRecommendedText &&
          !stopsQuery.isLoading &&
          !stopsQuery.isError && (
            <Polyline
              coordinates={recommendedRoute}
              strokeColor={Colors.tcnjblue}
              strokeWidth={Platform.OS === "android" ? 10.5 : 1.5}
              lineDashPattern={[2, 4]}
            />
          )}
      </MapView>
      {/* {showCompass && <Compass onPress={() => {}} />}{" "} */}
      {/* Render your custom compass component conditionally */}
      <View
        style={[styles.mapButtonView, { top: deviceHeight < 700 ? 40 : 60 }]}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            toggleRecommendedText();
          }}
        >
          <Image
            source={require("../assets/map-icon-buttons/walking-tour-icon.png")}
            style={styles.btn}
          />
        </TouchableOpacity>
      </View>
      <TourPathText />
      <View
        style={[
          styles.mapButtonViewLeft,
          { top: deviceHeight < 700 ? 40 : 60 },
        ]}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleDrawerToggle}
        >
          <Image
            source={require("../assets/map-icon-buttons/side-menu-icon.png")}
            style={styles.btn}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapButtonView: {
    position: "absolute",
    right: 20,
    zIndex: 2,
  },
  mapButtonViewLeft: {
    position: "absolute",
    left: 20,
    zIndex: 2,
  },
  btnContainer: {
    elevation: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 4 },
    borderRadius: 60,
  },
  btn: {
    width: 50,
    height: 50,
  },
});

export default MapComponent;
