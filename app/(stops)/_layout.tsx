import { Stack, useNavigation } from "expo-router";
import { TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import Colors from "@/constants/colors";
const backIcon = require("@/assets/back-arrow.png"); // Import your back button icon

const StackLayout = () => {
  const navigation = useNavigation(); // Hook to get navigation object
  const deviceWidth = Dimensions.get("window").width;

  return (
    <Stack
      screenOptions={{
        // headerShown: false, // Hide header for "index" screen
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.tcnjyellow,
        },
        headerTintColor: "black", // Color of the back button text
        headerTitleAlign: "center", // Align header title to center
      }}
    >
      <Stack.Screen
        name="[slug]"
        options={{
          headerShown: true,
          headerTitle: "", // Empty string to hide the default header title
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: deviceWidth < 400 ? 4 : 0 }} // Adjust margin as needed
              onPress={() => navigation.goBack()} // Go back when pressed
            >
              <Image
                source={backIcon}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: Platform.OS === "web" ? 15 : 0,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default StackLayout;
