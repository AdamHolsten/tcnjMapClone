import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Marker } from "react-map-gl";
import { Asset } from "expo-asset";
import Lottie from "lottie-react";

const defaultPin = Asset.fromModule(
  require("../assets/active-location.png")
).uri;
const markerAnimation = require("../assets/Circle_Expand_and_Opacity_3.json"); // Path to your Lottie animation file

interface MapUserLocationIconProps {
  latitude: number;
  longitude: number;
}

const MapUserLocationIcon: React.FC<MapUserLocationIconProps> = ({
  latitude,
  longitude,
}) => {
  return (
    <Marker
      anchor="center"
      longitude={longitude}
      latitude={latitude}
      // pitchAlignment="map"
      // onClick={() => console.log(stopCoordinate.name)}
      style={styles.markerWrapper}
    >
      <img src={defaultPin} alt="marker" style={styles.locationMarker} />
      {/* <View style={styles.markerBg}></View> */}
      <Lottie
        animationData={markerAnimation}
        style={styles.markerBg}
        loop={true}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  locationMarker: {
    width: "50%",
    height: "50%",
    position: "static",
    zIndex: 20,
  },
  markerBg: {
    opacity: 0.5,
    width: "100%",
    height: "100%",
    // backgroundColor: "#33739f",
    marginLeft: "-25%",
    borderRadius: 20,
    zIndex: 10,
    // marginTop: 10,
    position: "absolute",
  },
  markerWrapper: {
    zIndex: 100,
    display: "flex",
    position: "absolute",
    alignItems: "center",
    width: 30,
    height: 30,
    // marginTop: 20,
    // marginLeft: 20,
  },
});
export default MapUserLocationIcon;
