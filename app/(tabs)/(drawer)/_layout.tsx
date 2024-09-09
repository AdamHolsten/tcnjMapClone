import React, { useEffect } from "react";
import { View, Platform } from "react-native";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawerComponent from "@/components/CustomDrawerComponent";
import useStore from "@/store/carouselStore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const DrawerLayout = () => {
  const navigation = useNavigation();
  const { drawerOpen, setDrawerOpen } = useStore();

  return (
    <>
      {Platform.OS === "web" ? (
        <View style={{ flex: 1 }}>
          <Drawer
            drawerContent={CustomDrawerComponent}
            screenOptions={{
              drawerHideStatusBarOnOpen: false,
              drawerStyle: {
                backgroundColor: "#FDD700",
                width: "87%",
                margin: 0,
                padding: 0,
                maxWidth: 400,
                opacity: drawerOpen ? 1 : 0, // Adjust opacity based on Zustand state
              },
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
          </Drawer>
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={CustomDrawerComponent}
            screenOptions={{
              drawerHideStatusBarOnOpen: Platform.OS === "ios" ? true : false,
              drawerStyle: {
                backgroundColor: "#FDD700",
                width: "87%",
                margin: 0,
                padding: 0,
                maxWidth: 400,
                opacity: drawerOpen ? 1 : 0, // Adjust opacity based on Zustand state
              },
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      )}
    </>
  );
};

export default DrawerLayout;
