import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { getStops } from "@/api/mapapi";
import { useQuery } from "@tanstack/react-query";
import { MapCarousel } from "@/components/MapCarousel";
import MapComponent from "@/components/MapComponent"; // Import the new component
import { LoadingScreen } from "@/components/LoadingScreen";
import Colors from "@/constants/colors";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ListItem } from "@/components/ListItem";
import { useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { DrawerActions } from "@react-navigation/native";
import useStore from "@/store/carouselStore";
const Page = () => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const stopsQuery = useQuery({
    queryKey: ["stops"],
    queryFn: getStops,
  });

  const { carouselStop, updateCarouselStop, setDrawerOpen, mapLoaded } =
    useStore(); // Call the useStore hook and destructure the carouselStop property

  const handleJump = (stopNumber: number) => {
    setJumpStopNumber(stopNumber);
  };

  const INITIAL_REGION = {
    // 40.269732004710804, -74.77817899992237
    // , -74.77830774595107
    // 40.26883970214793, -74.7779858808793
    // 40.2683567077767, -74.77766401580752
    // 40.269126222602644, -74.7779429655364
    // 40.26884788846348, -74.77787859252204
    // 40.268757838937944, -74.7776962023147
    // 40.268610484910255, -74.77767474464325
    // 40.269322693070045, -74.77786786368631
    // 40.269560094123385, -74.77788932135778
    // 40.2690279871549, -74.77779276183622
    // latitude: deviceWidth > 400 ? 40.268610484910255 : 40.2690279871549,
    latitude: 40.268610484910255,
    // old latitude: deviceWidth > 400 ? 40.268674651951486 : 40.26763499879864,

    // 40.268528621422824,
    longitude: -74.78082902234672,
    // old longitude: -74.78053934378211,
    latitudeDelta: 0.0109,
    longitudeDelta: 0.0109,
    // pitch: 160,
  };

  const [routeToggle, toggleRouteToggle] = useState(false);
  const [region, setRegion] = useState(INITIAL_REGION);
  const [jumpStopNumber, setJumpStopNumber] = useState<number | undefined>(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const recommendedRoute = [
    { latitude: 40.268871, longitude: -74.780656 },
    { latitude: 40.26993, longitude: -74.776339 },
    { latitude: 40.269243, longitude: -74.776076 },
    { latitude: 40.268868, longitude: -74.775986 },
    { latitude: 40.267938, longitude: -74.775579 },
    { latitude: 40.267555, longitude: -74.774925 },
    { latitude: 40.268605, longitude: -74.773848 },
    { latitude: 40.26891, longitude: -74.77435 },
    { latitude: 40.26917218565455, longitude: -74.77474423258727 },
    { latitude: 40.26941902228165, longitude: -74.77541992665783 },
    { latitude: 40.26976177193765, longitude: -74.77595678308381 },
    { latitude: 40.269912246850275, longitude: -74.775886663069 },
    { latitude: 40.2700075474535, longitude: -74.77600279935707 },
    { latitude: 40.26999082805914, longitude: -74.77618686441741 },
    { latitude: 40.26996073314995, longitude: -74.77623945444327 },
    { latitude: 40.27002761073234, longitude: -74.77633806072559 },
    { latitude: 40.27009448824858, longitude: -74.77627670570548 },
    { latitude: 40.27091038862587, longitude: -74.77659881956843 },
    { latitude: 40.27158751159617, longitude: -74.77686834342144 },
    { latitude: 40.2714983035264, longitude: -74.77722807062867 },
    { latitude: 40.271758208344416, longitude: -74.77733267677607 },
    { latitude: 40.27154741947407, longitude: -74.77817757258202 },
    { latitude: 40.271070583974286, longitude: -74.77798177133174 },
    { latitude: 40.270737001772815, longitude: -74.77928532488137 },
    { latitude: 40.27119132804153, longitude: -74.77945162184146 },
    { latitude: 40.27026016055315, longitude: -74.77909488807579 },
    { latitude: 40.26978536251487, longitude: -74.7808249128833 },
    { latitude: 40.269550008809794, longitude: -74.78090806135945 },
    { latitude: 40.26987131757842, longitude: -74.78238059409202 },
    { latitude: 40.26958070716713, longitude: -74.78249592907504 },
    { latitude: 40.26947837926027, longitude: -74.7825173867463 },
    { latitude: 40.26933102680237, longitude: -74.7825120223285 },
    { latitude: 40.26913660291056, longitude: -74.78246910701527 },
    { latitude: 40.26903018118541, longitude: -74.78248251805981 },
    { latitude: 40.2690260880388, longitude: -74.7826461328032 },
    { latitude: 40.2691161372072, longitude: -74.78266759047445 },
    { latitude: 40.26903632090488, longitude: -74.78304846413936 },
    { latitude: 40.268259710187785, longitude: -74.78279115233426 },

    // { latitude: 40.268957, longitude: -74.77482 },
    // { latitude: 40.26923231738667, longitude: -74.77551307619616 },
  ];

  const handleRouteToggle = () => {
    toggleRouteToggle(!routeToggle);
  };

  const navigataion = useNavigation();
  const handleDrawerToggle = () => {
    // setOpenDrawer(!openDrawer);
    setDrawerOpen(true);
    navigataion.dispatch(DrawerActions.toggleDrawer());
  };

  const handleListItemClick = (index: number) => {
    setOpenDrawer(!openDrawer);
    setTimeout(() => {
      setJumpStopNumber(index);
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      {stopsQuery.data && (
        <>
          <MapComponent
            stopsQuery={stopsQuery}
            routeToggle={routeToggle}
            region={region}
            jumpStopNumber={carouselStop}
            handleJump={handleJump}
            handleRouteToggle={handleRouteToggle}
            handleDrawerToggle={handleDrawerToggle}
            recommendedRoute={recommendedRoute}
            openDrawer={openDrawer}
            handleListItemClick={handleListItemClick}
          />
          {/* {openDrawer && !stopsQuery.isLoading && (
            <Animated.View
              entering={FadeInLeft}
              exiting={FadeOutLeft}
              style={styles.drawerContainer}
            >
              <View style={styles.innerDrawerContainer}>
                <FlashList
                  data={stopsQuery.data}
                  estimatedItemSize={16}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.liContainer}
                      onPress={() => handleListItemClick(index)}
                    >
                      <ListItem header={item.title} />
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Animated.View>
          )} */}
        </>
      )}
      {stopsQuery.isLoading && !mapLoaded && <LoadingScreen />}
      {/* {Platform.OS !== "web" && ( */}
      <View
        style={[
          styles.mapBackgroundContainer,
          Platform.OS === "web" ? { paddingBottom: 0 } : {},
        ]}
      >
        {stopsQuery.data && (
          <MapCarousel
            data={stopsQuery.data}
            jumpStopNumber={carouselStop}
            setJumpStopNumber={updateCarouselStop}
          />
        )}
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.tcnjyellow },
  mapBackgroundContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    elevation: 1,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 100,
  },
  drawerContainer: {
    width: "175%",
    height: "150%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    marginTop: "-50%",
    position: "absolute",
    top: 0,
    left: 0,
    elevation: 100,
    zIndex: 100,
    flex: 1,
    // opacity: 0,
  },
  innerDrawerContainer: {
    width: "50%",
    height: "100%",
    backgroundColor: "white",
    marginTop: "20%",
    paddingTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 100,
  },
  liContainer: {
    paddingVertical: 10,
    borderBottomColor: "#b2bfc9",
    borderBottomWidth: 1,
  },
});

export default Page;
