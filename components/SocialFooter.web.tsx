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
          <View style={{ width: 12.04, height: 22.46 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 12.04 22.46"
            >
              <path
                id="_1-social-media-icon-facebook"
                data-name="1-social-media-icon-facebook"
                d="M58.042,13.033l.622-4.071h-3.9V6.326a2.033,2.033,0,0,1,2.3-2.194H58.84V.671A21.8,21.8,0,0,0,55.689.4c-3.212,0-5.315,1.945-5.315,5.474v3.1H46.8v4.071h3.574V22.86h4.4V13.033Z"
                transform="translate(-46.8 -0.4)"
                fill="#fff"
              />
            </svg>
          </View>
        </Link>
        <Link href={"http://twitter.com/tcnj"}>
          <View style={{ width: 22, height: 22.02 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 22 22.018"
            >
              <path
                id="_2-social-media-icon-twitter"
                data-name="2-social-media-icon-twitter"
                d="M13.1,9.324,21.286,0h-1.94L12.231,8.095,6.552,0H0L8.59,12.242,0,22.018H1.94l7.509-8.55,6,8.55H22M2.641,1.433H5.622L19.345,20.656H16.363"
                fill="#fff"
              />
            </svg>
          </View>
        </Link>
        <Link
          href={"https://www.linkedin.com/school/the-college-of-new-jersey/"}
        >
          <View style={{ width: 23.44, height: 22.46 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 23.437 22.46"
            >
              <path
                id="_3-social-media-icon-linkedin"
                data-name="3-social-media-icon-linkedin"
                d="M5.563,2.437A2.426,2.426,0,1,1,3.137,0,2.426,2.426,0,0,1,5.563,2.437Zm.022,4.4H.7V22.46H5.585Zm7.794,0H8.527V22.46h4.851v-8.2c0-4.559,5.885-4.93,5.885,0v8.2h4.874V12.567c0-7.693-8.715-7.412-10.759-3.627V6.84Z"
                transform="translate(-0.7)"
                fill="#fff"
              />
            </svg>
          </View>
        </Link>
        <Link
          style={styles.linkContainer}
          href={"http://instagram.com/tcnj_official"}
        >
          {/* <View style={{ width: 22.46, height: 22.46 }}> */}
          <svg
            id="_4-social-media-icon-instagram"
            data-name="4-social-media-icon-instagram"
            xmlns="http://www.w3.org/2000/svg"
            width={22.46}
            height={22.46}
            viewBox="0 0 22.46 22.46"
          >
            <path
              id="Path_2301"
              data-name="Path 2301"
              d="M142.347,35.8a1.347,1.347,0,1,0,1.347,1.347,1.347,1.347,0,0,0-1.347-1.347Z"
              transform="translate(-125.187 -31.802)"
              fill="#fff"
            />
            <path
              id="Path_2302"
              data-name="Path 2302"
              d="M57.58,50.8a5.68,5.68,0,1,0,5.68,5.68,5.68,5.68,0,0,0-5.68-5.68Zm0,9.315a3.636,3.636,0,1,1,3.636-3.636,3.636,3.636,0,0,1-3.636,3.636Z"
              transform="translate(-46.256 -45.244)"
              fill="#fff"
            />
            <path
              id="Path_2303"
              data-name="Path 2303"
              d="M16.323,22.76H7.348A6.759,6.759,0,0,1,.6,16.012V7.048A6.759,6.759,0,0,1,7.348.3h8.964A6.759,6.759,0,0,1,23.06,7.048v8.964a6.749,6.749,0,0,1-6.736,6.748ZM7.348,2.414A4.641,4.641,0,0,0,2.714,7.048v8.964a4.641,4.641,0,0,0,4.635,4.635h8.964a4.641,4.641,0,0,0,4.635-4.635V7.048a4.641,4.641,0,0,0-4.635-4.635Z"
              transform="translate(-0.6 -0.3)"
              fill="#fff"
            />
          </svg>
          {/* </View> */}
        </Link>
        <Link
          style={styles.linkContainer}
          href={"http://www.youtube.com/tcnjvideo"}
        >
          {/* <View style={{ width: 24.827, height: 17.374 }}> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24.827}
            height={17.374}
            viewBox="0 0 24.827 17.374"
          >
            <path
              id="_5-social-media-icon-youtube"
              data-name="5-social-media-icon-youtube"
              d="M24.915,34.447A5.442,5.442,0,0,0,19.468,29H5.547A5.45,5.45,0,0,0,.1,34.447v6.48a5.442,5.442,0,0,0,5.447,5.447H19.48a5.442,5.442,0,0,0,5.447-5.447v-6.48Zm-8.19,3.726L10.479,41.26c-.246.135-1.082-.049-1.082-.32V34.607c0-.283.836-.455,1.082-.32l5.976,3.259c.258.136.529.492.27.627Z"
              transform="translate(-0.1 -29)"
              fill="#fff"
            />
          </svg>
          {/* </View> */}
        </Link>
      </View>
    </View>
  );
};

export default SocialFooter;
const styles = StyleSheet.create({
  linkContainer: { height: 25 },
  blueContainer: {
    // flex: 1,
    backgroundColor: Colors.tcnjblue,
    flexDirection: "column",
    gap: 20,
    // height: 50,
    paddingTop: 60,
    paddingBottom: 60,
  },
  socialRow: {
    flex: 1,
    // backgroundColor: Colors.tcnjblue,
    flexDirection: "row",
    alignContent: "center",
    // alignItems: "center",
    justifyContent: "center",
    height: 20,
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
