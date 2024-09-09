import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useStore from "@/store/carouselStore";
import TourPathText from "./TourPathText";
import { Feature, LineString } from "geojson"; // Import necessary types
import Colors from "@/constants/colors";
import { Asset } from "expo-asset";
import MapUserLocationIcon from "./MapUserLocationIcon.web";

const selectedPin = Asset.fromModule(
  require("../assets/map-pin-selected.png")
).uri;
const defaultPin = Asset.fromModule(require("../assets/map-pin.png")).uri;
const walkingTourIcon = Asset.fromModule(
  require("../assets/map-icon-buttons/walking-tour-icon-on.png")
).uri;
const walkingTourIconOff = Asset.fromModule(
  require("../assets/map-icon-buttons/walking-tour-icon-off.png")
).uri;
const trackingIcon = Asset.fromModule(
  require("../assets/map-icon-buttons/my-location-on.png")
).uri;
const trackingIconOff = Asset.fromModule(
  require("../assets/map-icon-buttons/my-location-off-white.png")
).uri;
const sideMenuIcon = Asset.fromModule(
  require("../assets/map-icon-buttons/side-menu-icon.png")
).uri;

interface MapComponentProps {
  region: any;
  stopsQuery: any;
  handleDrawerToggle: () => void;
  jumpStopNumber: number | undefined;
}

const MapComponent: React.FC<MapComponentProps> = ({
  stopsQuery,
  region,
  jumpStopNumber,
  handleDrawerToggle,
}) => {
  const { carouselStop, updateCarouselStop, carouselHeight } = useStore();
  const { showRecommendedText, toggleRecommendedText } = useStore();
  const {
    viewport,
    tracking,
    setTracking,
    startTracking,
    stopTracking,
    mapLoaded,
    setMapLoaded,
  } = useStore();

  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;

  const onMarkerSelected = (marker: any) => {
    updateCarouselStop(marker.virtualTourSlide.stopNumber - 1);
  };

  const lineStringData: Feature<LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-74.780656, 40.268871],
        [-74.776339, 40.26993],
        [-74.776076, 40.269243],
        [-74.775986, 40.268868],
        [-74.775579, 40.267938],
        [-74.774925, 40.267555],
        [-74.773848, 40.268605],
        [-74.77435, 40.26891],
        [-74.77474423258727, 40.26917218565455],
        [-74.77541992665783, 40.26941902228165],
        [-74.77595678308381, 40.26976177193765],
        [-74.775886663069, 40.269912246850275],
        [-74.77600279935707, 40.2700075474535],
        [-74.77618686441741, 40.26999082805914],
        [-74.77623945444327, 40.26996073314995],
        [-74.77633806072559, 40.27002761073234],
        [-74.77627670570548, 40.27009448824858],
        [-74.77659881956843, 40.27091038862587],
        [-74.77686834342144, 40.27158751159617],
        [-74.77722807062867, 40.2714983035264],
        [-74.77733267677607, 40.271758208344416],
        [-74.77817757258202, 40.27154741947407],
        [-74.77798177133174, 40.271070583974286],
        [-74.77928532488137, 40.270737001772815],
        [-74.77945162184146, 40.27119132804153],
        [-74.77909488807579, 40.27026016055315],
        [-74.7808249128833, 40.26978536251487],
        [-74.78090806135945, 40.269550008809794],
        [-74.78238059409202, 40.26987131757842],
        [-74.78249592907504, 40.26958070716713],
        [-74.7825173867463, 40.26947837926027],
        [-74.7825120223285, 40.26933102680237],
        [-74.78246910701527, 40.26913660291056],
        [-74.78248251805981, 40.26903018118541],
        [-74.7826461328032, 40.2690260880388],
        [-74.78266759047445, 40.2691161372072],
        [-74.78304846413936, 40.26903632090488],
        [-74.78279115233426, 40.268259710187785],
        // Add more coordinates here
      ],
    },
  };
  const handleMapLoad = () => {
    // console.log("Map has loaded");
    // setTimeout(() => {
    setMapLoaded(true); // Update the state after the delay
    // }, 500); // 500 milliseconds = 0.5 seconds
  };

  // useEffect(() => {
  //   if (mapLoaded) {
  //     // Perform any actions that depend on the map being loaded
  //     console.log("The map is now fully loaded.");
  //   }
  // }, [mapLoaded]);
  // const [viewport, setViewport] = useState({});
  // const [tracking, setTracking] = useState(false);
  // const [watchID, setWatchID] = useState<number | null>(null);

  // const startTracking = () => {
  //   const id = navigator.geolocation.watchPosition(
  //     (pos) => {
  //       setViewport({
  //         latitude: pos.coords.latitude,
  //         longitude: pos.coords.longitude,
  //       });

  //       console.log(pos);
  //     },
  //     (error) => {
  //       console.error("Error watching position:", error);
  //     },
  //     {
  //       timeout: 10000, // 10 seconds
  //       maximumAge: 1000, // 1 second
  //       enableHighAccuracy: true, // Use GPS for higher accuracy
  //     }
  //   );

  //   setWatchID(id);
  // };

  // const stopTracking = () => {
  //   if (watchID) {
  //     navigator.geolocation.clearWatch(watchID);
  //     setWatchID(null);
  //     setViewport({
  //       latitude: null,
  //       longitude: null,
  //     });
  //   }
  // };

  useEffect(() => {
    if (tracking) {
      startTracking();
    } else {
      stopTracking();
    }

    // Cleanup the watch on component unmount
    return () => {
      stopTracking();
    };
  }, [tracking]);

  // Review watchPosition() method
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
  // https://github.com/michalchudziak/react-native-geolocation/blob/master/example/src/examples/WatchPosition.tsx
  // https://stackoverflow.com/questions/41415058/navigator-geolocation-watchposition-only-return-each-100-m
  return (
    <>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiaG9sc3RlbmEiLCJhIjoiY2x4Yzh4MTNpMDQ1ZzJ3cHhwbm52aXRpcSJ9.nklr93yqNb-6HxV8llYneg"
        initialViewState={{
          latitude: 40.26893262976378,
          // latitude: 40.267538625901636,
          // longitude: region.longitude,40.26923626393474,40.2681467399457,
          // GOOD longitude: -74.78206894797663,
          longitude: -74.78006894797663,
          // zoom: 16,
          // zoom: 14.75,
          zoom: 15.125,
          // rotation: 1,
          pitch: 0,
          bearing: 72.05,
          // camera{} dragRotate:false
        }}
        style={{ width: `100%`, height: `100%` }}
        // minPitch={20}
        // maxPitch={30}
        // minZoom={2}
        maxZoom={17}
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle="mapbox://styles/holstena/cm0g0bk9f00m601qr7iw468c8"
        dragRotate={false}
        touchPitch={false}
        onIdle={handleMapLoad}
        // maxBounds={[
        //   [-74.84387734326042, 40.19806142642308], // Southwest corner [longitude, latitude]
        //   [-74.7122897529737, 40.33034864950689], // Northeast corner [longitude, latitude]
        // ]}
      >
        {showRecommendedText && (
          <Source id="my-data" type="geojson" data={lineStringData}>
            <Layer
              id="lineLayer"
              type="line"
              source="my-data"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": Colors.darklinkblue,
                "line-width": 2,
                "line-dasharray": [4, 3], // This creates a dotted line pattern
              }}
            />
          </Source>
        )}

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
              stopNumber: stop.virtualTourSlide.stopNumber,
              name: stop.title,
            };
            return (
              <Marker
                key={stop.slug}
                anchor="center"
                longitude={stopCoordinate.longitude}
                latitude={stopCoordinate.latitude}
                pitchAlignment="map"
                // onClick={() => console.log(stopCoordinate.name)}
                onClick={() => onMarkerSelected(stop)}
              >
                {(jumpStopNumber ?? 0) + 1 === stopCoordinate.stopNumber ? (
                  <img
                    src={selectedPin}
                    alt="marker"
                    style={{ width: 20, height: "auto", cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src={defaultPin}
                    alt="marker"
                    style={{ width: 20, height: "auto", cursor: "pointer" }}
                  />
                )}
              </Marker>
            );
          }
        )}
        {/* <Text style={styles.mapButtonView}>
          Latitude: {viewport.latitude}
          <br />
          Longitude: {viewport.longitude}
        </Text> */}
        {viewport.latitude !== null && viewport.longitude !== null && (
          <MapUserLocationIcon
            latitude={viewport.latitude}
            longitude={viewport.longitude}
          />
        )}
        {/* <MapLocationTracking /> */}
        {/* <MapLocation /> */}
      </Map>
      <View
        style={[styles.mapButtonView, { top: deviceWidth < 600 ? 20 : 60 }]}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            toggleRecommendedText();
          }}
        >
          {!showRecommendedText ? (
            <img
              src={walkingTourIcon}
              style={{
                ...styles.btn,
                width: deviceWidth > 600 ? 60 : 40,
                height: deviceWidth > 600 ? 60 : 40,
              }}
            />
          ) : (
            <img
              src={walkingTourIconOff}
              style={{
                ...styles.btn,
                width: deviceWidth > 600 ? 60 : 40,
                height: deviceWidth > 600 ? 60 : 40,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.mapButtonViewLeft,
          {
            bottom:
              deviceWidth < 600 ? carouselHeight + 40 : carouselHeight + 80,
            zIndex: 110,
          },
        ]}
      >
        {deviceWidth < 700 && carouselHeight > 100 && carouselHeight && (
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => {
              setTracking(!tracking);
            }}
          >
            {!tracking ? (
              <img src={trackingIcon} style={styles.btn} />
            ) : (
              <img src={trackingIconOff} style={styles.btn} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <TourPathText />
      <View
        style={[styles.mapButtonViewLeft, { top: deviceWidth < 600 ? 20 : 60 }]}
      >
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleDrawerToggle}
        >
          <img
            src={sideMenuIcon}
            style={{
              ...styles.btn,
              width: deviceWidth > 600 ? 60 : 40,
              height: deviceWidth > 600 ? 60 : 40,
            }}
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
    // zIndex: 2,
    zIndex: 110,
  },
  mapButtonViewLeft: {
    position: "absolute",
    left: 20,
    // zIndex: 2,
    zIndex: 110,
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
    width: 40,
    height: 40,
  },
});

export default MapComponent;
