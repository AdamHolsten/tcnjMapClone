import React from "react";
import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { SvgUri, SvgXml } from "react-native-svg";
import Colors from "@/constants/colors";
import { View } from "react-native";
import { TabIcon } from "@/components/TabIcon";

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs screenOptions={{ tabBarActiveTintColor: Colors.tcnjblue }}>
        <Tabs.Screen
          name="(tabs)/(drawer)"
          options={{
            title: "Map",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                width={14.29}
                height={20}
                fill={color}
                uri="https://tcnj.edu/custom/map-app/images/menu-icons/map-two.svg"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(stops)"
          options={{ href: null, headerShown: false }} // Hide this tab
        />
        <Tabs.Screen
          name="(tabs)/discover"
          options={{
            title: "Discover",
            headerShown: false,
            unmountOnBlur: false,
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                width={19}
                height={20}
                fill={color}
                uri="https://tcnj.edu/custom/map-app/images/menu-icons/discover.svg"
              />
            ),
          }} // Hide this tab
        />
        <Tabs.Screen
          name="(tabs)/contact"
          options={{
            title: "Contact",
            headerShown: false,
            unmountOnBlur: false,
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                width={22}
                height={20}
                fill={color}
                uri="https://tcnj.edu/custom/map-app/images/menu-icons/contact.svg"
              />
            ),
            // headerTransparent: true,
          }} // Hide this tab
        />
      </Tabs>
    </QueryClientProvider>
  );
};

export default Layout;
