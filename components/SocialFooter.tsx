import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Linking,
  Dimensions,
  Button,
} from "react-native";
import { Link } from "expo-router";

import Colors from "@/constants/colors";
import { SvgUri, SvgXml } from "react-native-svg";

import React from "react";

const SocialFooter = () => {
  return (
    <View style={styles.blueContainer}>
      <Text style={styles.cardTitle}>Follow Us</Text>

      <View style={styles.socialRow}>
        <Link href={"http://www.facebook.com/tcnjlions"}>
          <SvgUri
            width={12.04}
            height={22.46}
            uri={`https://tcnj.edu/custom/map-app/images/social-icons/facebook.svg`}
          />
        </Link>
        <Link href={"http://twitter.com/tcnj"}>
          <SvgUri
            width={22}
            height={22.02}
            uri={`https://tcnj.edu/custom/map-app/images/social-icons/twitter.svg`}
          />
        </Link>
        <Link
          href={"https://www.linkedin.com/school/the-college-of-new-jersey/"}
        >
          <SvgUri
            width={23.44}
            height={22.46}
            uri={`https://tcnj.edu/custom/map-app/images/social-icons/linkedin.svg`}
          />
        </Link>
        <Link href={"http://instagram.com/tcnj_official"}>
          <SvgUri
            width={22.46}
            height={22.46}
            uri={`https://tcnj.edu/custom/map-app/images/social-icons/instagram.svg`}
          />
        </Link>
        <Link href={"http://www.youtube.com/tcnjvideo"}>
          <SvgUri
            width={24.83}
            height={17.37}
            uri={`https://tcnj.edu/custom/map-app/images/social-icons/youtube.svg`}
          />
        </Link>
      </View>
    </View>
  );
};

export default SocialFooter;
const styles = StyleSheet.create({
  blueContainer: {
    flex: 1,
    backgroundColor: Colors.tcnjblue,
    flexDirection: "column",
    gap: 20,
    paddingTop: 60,
    paddingBottom: 70,
  },
  socialRow: {
    flex: 1,
    // backgroundColor: Colors.tcnjblue,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  cardTitle: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: "Overpass_900Black",
    textTransform: "uppercase",
    letterSpacing: -0.5,
    // alignContent: "center",
    textAlign: "center",
    // paddingBottom: 15,
    color: "white",
  },
});
