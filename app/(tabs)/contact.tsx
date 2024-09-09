import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Linking,
  Dimensions,
  Button,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import Colors from "@/constants/colors";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import { Domine_500Medium } from "@expo-google-fonts/domine";
import {
  OpenSans_600SemiBold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { Overpass_900Black } from "@expo-google-fonts/overpass";
import { SvgUri, SvgXml } from "react-native-svg";
import SocialFooter from "@/components/SocialFooter";
import { WhiteCard } from "@/components/WhiteCard";
import { ButtonLink } from "@/components/ButtonLink";
import { InnerContainer } from "@/components/InnerContainer";
import { ParallaxHero } from "@/components/ParallaxHero";
import AdmissionHeadshotGallery from "@/components/AdmissionHeadshotGallery";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 430;
const Contact = () => {
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Domine_500Medium,
    OpenSans_600SemiBold,
    OpenSans_800ExtraBold,
    Overpass_900Black,
  });
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOfset = useScrollViewOffset(scrollRef);

  // const imageAnimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: interpolate(
  //           scrollOfset.value,
  //           [-IMG_HEIGHT, 0, IMG_HEIGHT],
  //           // [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
  //           [-IMG_HEIGHT / 2, 0, IMG_HEIGHT / 3]
  //         ),
  //       },
  //       {
  //         scale: interpolate(
  //           scrollOfset.value,
  //           [-IMG_HEIGHT, 0, IMG_HEIGHT],
  //           [1.5, 1, 1]
  //         ),
  //       },
  //     ],
  //   };
  // });
  const handleEmail = async () => {
    try {
      await Linking.openURL("mailto:example@example.com");
    } catch (error) {
      console.error("Failed to open email client:", error);
    }
  };
  const handleCall = async () => {
    try {
      await Linking.openURL("tel:+16097712131"); // Replace +123456789 with the phone number you want to call
    } catch (error) {
      console.error("Failed to open phone app:", error);
    }
  };
  const defaultAnim = useSharedValue<number>(0);
  const lowerPosition = useSharedValue<number>(-50);
  // const changedAnim = useSharedValue<number>(200);

  const opacityFade = useAnimatedStyle(() => ({
    // transform: [{ translateX: defaultAnim.value }],
    opacity: defaultAnim.value,
  }));
  const positionLowerToUp = useAnimatedStyle(() => ({
    transform: [{ translateY: lowerPosition.value }],
    // opacity: defaultAnim.value,
  }));

  useFocusEffect(
    useCallback(() => {
      // console.log("Hello");
      defaultAnim.value = 0;
      defaultAnim.value = withDelay(
        200,
        withTiming(1, {
          duration: 500,

          easing: Easing.inOut(Easing.ease),
        })
      );

      lowerPosition.value = 30;
      lowerPosition.value = withDelay(
        300,
        withTiming(0, {
          duration: 700,

          easing: Easing.bezier(0.55, -0.01, 0.52, 0.98),
        })
      );
      // changedAnim.value = withSpring(-changedAnim.value);
    }, [defaultAnim, lowerPosition])
  );
  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={6}>
        {fontsLoaded && (
          <>
            <ParallaxHero
              offset={scrollOfset}
              title="Contact"
              heroImage={require("@/assets/hero-image-A.jpg")}
              heroImageLarge={{
                uri: "https://www.tcnj.edu/custom/map-app/images/hero-image-A-web.jpg",
              }}
            />
            {/* <View style={{ backgroundColor: Colors.lightgrey }}>
              <Animated.Image
                source={require("@/assets/hero-image-A.jpg")}
                style={[styles.heroImage, imageAnimatedStyle]}
              />
              <Animated.Text
                style={styles.title}
                entering={FadeInDown.duration(600).delay(200)}
              >
                Contact
              </Animated.Text>
            </View> */}
            <View
              style={{
                width: "100%",
                // height: "100%",
                backgroundColor: Colors.tcnjyellow,
              }}
            >
              <WhiteCard topCard>
                <Text style={[styles.cardTitle, { paddingBottom: 0 }]}>
                  Our team is here to help
                </Text>

                <View style={styles.headshotsContainer}>
                  {/* <Image
                    style={{ width: 64, height: 64 }} // Set width and height using style prop
                    source={{
                      uri: "https://tcnj.edu/custom/map-app/images/contact/headshot1.jpg",
                    }} // Use require for local assets
                  />
                  <Image
                    style={{ width: 64, height: 64 }} // Set width and height using style prop
                    source={{
                      uri: "https://tcnj.edu/custom/map-app/images/contact/headshot2.jpg",
                    }} // Use require for local assets
                  />
                  <Image
                    style={{ width: 64, height: 64 }} // Set width and height using style prop
                    source={{
                      uri: "https://tcnj.edu/custom/map-app/images/contact/headshot3.jpg",
                    }} // Use require for local assets
                  /> */}
                  <AdmissionHeadshotGallery />
                </View>
                <Text style={styles.introText}>
                  We’re available to answer your questions and guide you
                  throughout your college process, Monday through Friday,
                  between 8:30 a.m. and 4:30 p.m.
                </Text>
                <View style={styles.contactButtonsContainer}>
                  <View style={[styles.contactButtons, { paddingTop: 30 }]}>
                    <Image
                      style={{ width: 29.14, height: 20 }} // Set width and height using style prop
                      source={{
                        uri: "https://tcnj.edu/custom/map-app/images/contact/email-micro-icon.jpg",
                      }} // Use require for local assets
                    />
                    <Pressable onPress={handleEmail}>
                      <Text style={[styles.introText, styles.underline]}>
                        admiss@tcnj.edu
                      </Text>
                    </Pressable>
                  </View>
                  <View style={[styles.contactButtons]}>
                    <Image
                      style={{ width: 27.02, height: 29.32 }} // Set width and height using style prop
                      source={{
                        uri: "https://tcnj.edu/custom/map-app/images/contact/phone-micro-icon.jpg",
                      }} // Use require for local assets
                    />

                    <Pressable onPress={handleCall}>
                      <Text style={[styles.introText, styles.underline]}>
                        (609) 771-2131
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </WhiteCard>
              {/* <View
                style={[
                  styles.whiteCard,
                  {
                    marginTop: -60,
                  },
                ]}
              >
                <Text style={styles.cardTitle}>Our team is here to help</Text>
                <View style={styles.headshotsContainer}>
                  <Image
                    style={{ width: 64, height: 64 }} // Set width and height using style prop
                    source={{
                      uri: "https://tcnj.edu/custom/map-app/images/contact/headshot1.jpg",
                    }} // Use require for local assets
                  />
                  <Image
                    style={{ width: 64, height: 64 }} // Set width and height using style prop
                    source={{
                      uri: "https://tcnj.edu/custom/map-app/images/contact/headshot2.jpg",
                    }} // Use require for local assets
                  />
                  <Image
                    style={{ width: 64, height: 64 }} // Set width and height using style prop
                    source={{
                      uri: "https://tcnj.edu/custom/map-app/images/contact/headshot3.jpg",
                    }} // Use require for local assets
                  />
                </View>
                <Text style={styles.introText}>
                  We’re available to answer your questions and guide you
                  throughout your college process, Monday through Friday,
                  between 8:30 a.m. and 4:30 p.m.
                </Text>
                <View style={styles.contactButtonsContainer}>
                  <View style={[styles.contactButtons, { paddingTop: 30 }]}>
                    <Image
                      style={{ width: 29.14, height: 20 }} // Set width and height using style prop
                      source={{
                        uri: "https://tcnj.edu/custom/map-app/images/contact/email-micro-icon.jpg",
                      }} // Use require for local assets
                    />
                    <Pressable onPress={handleEmail}>
                      <Text style={[styles.introText, styles.underline]}>
                        admiss@tcnj.edu
                      </Text>
                    </Pressable>
                  </View>
                  <View style={[styles.contactButtons]}>
                    <Image
                      style={{ width: 27.02, height: 29.32 }} // Set width and height using style prop
                      source={{
                        uri: "https://tcnj.edu/custom/map-app/images/contact/phone-micro-icon.jpg",
                      }} // Use require for local assets
                    />

                    <Pressable onPress={handleCall}>
                      <Text style={[styles.introText, styles.underline]}>
                        (609) 771-2131
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View> */}
            </View>
            <InnerContainer>
              <Text style={styles.cardTitle}>Ready to apply?</Text>

              <Text style={styles.introText}>
                Getting started can be overwhelming, but our admissions team is
                here to support you at every step.
              </Text>
              <ButtonLink
                url="https://admissions.tcnj.edu/apply/"
                linkText="START YOUR APPLICATION"
                noMarginBottom
              />
            </InnerContainer>
            {/* <View style={[styles.whiteCard, styles.yellowBg]}>
              <Text style={styles.cardTitle}>Ready to apply?</Text>

              <Text style={styles.introText}>
                Getting started can be overwhelming, but our admissions team is
                here to support you at every step.
              </Text>
              <ButtonLink
                url="https://admissions.tcnj.edu/apply/"
                linkText="START YOUR APPLICATION"
              />
         
            </View> */}
            <WhiteCard lastCard>
              <Text style={styles.cardTitle}>Learn More</Text>

              <Text style={styles.introText}>
                Want to learn more about the college with the best four-year
                graduation rate (among public universities) in NJ?
              </Text>
              <ButtonLink
                url="https://connect.tcnj.edu/register/prospect"
                linkText="Request Info"
                blueBorder
                noMarginBottom
              />
              {/* <Link
                style={styles.blueBorderButton}
                href={`https://connect.tcnj.edu/register/prospect`}
              >
                <Text>Request Info</Text>
              </Link> */}
            </WhiteCard>
            {/* <View style={[styles.whiteCard, { marginBottom: 60 }]}>
              <Text style={styles.cardTitle}>Learn More</Text>

              <Text style={styles.introText}>
                Want to learn more about the college with the best four-year
                graduation rate (among public universities) in NJ?
              </Text>
              <Link
                style={styles.blueBorderButton}
                href={`https://connect.tcnj.edu/register/prospect`}
              >
                <Text>Request Info</Text>
              </Link>
            </View> */}
            <SocialFooter />
            {/* <View style={{ height: 2000 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Parallax Scroll
              </Text>
            </View> */}
          </>
        )}
      </Animated.ScrollView>
    </View>
  );
};
export default Contact;
const styles = StyleSheet.create({
  underline: { textDecorationLine: "underline" },
  container: {
    flex: 1,
    backgroundColor: Colors.tcnjyellow,
    // maxWidth: 800,
    // marginHorizontal: "auto",
  },
  // heroImage: { width, height: IMG_HEIGHT },
  // title: {
  //   position: "absolute",
  //   // top: IMG_HEIGHT / 2 - 30,
  //   // top: IMG_HEIGHT / 2 - 55,
  //   top: IMG_HEIGHT / 2 - 30,

  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   color: "white",
  //   fontSize: 50,
  //   lineHeight: 60,

  //   textAlign: "center",
  //   textShadowColor: "rgba(0,0,0,0.5)",
  //   textShadowOffset: { width: 1, height: 1 },
  //   textShadowRadius: 1,
  //   elevation: 1,
  //   fontFamily: "AlfaSlabOne_400Regular",
  // },
  cardTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: "OpenSans_800ExtraBold",
    textTransform: "uppercase",
    letterSpacing: -0.5,
    // alignContent: "center",
    textAlign: "center",
    paddingBottom: 15,
  },
  introText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 30,
    fontFamily: "Domine_500Medium",
  },
  contactButtonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
  },
  contactButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
  headshotsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    // paddingBottom: 15,
    height: 90,
  },
  // blueButton: {
  //   backgroundColor: Colors.tcnjblue,
  //   color: "white",
  //   padding: 10,
  //   textAlign: "center",
  //   borderRadius: 0,
  //   marginVertical: 20,
  //   fontFamily: "OpenSans_600SemiBold",
  //   textTransform: "uppercase",
  //   paddingVertical: 30,
  //   marginTop: 30,
  //   fontSize: 16,
  //   lineHeight: 30,
  // },
  // blueBorderButton: {
  //   borderColor: Colors.tcnjblue,
  //   borderWidth: 2,
  //   color: Colors.tcnjblue,
  //   padding: 10,
  //   textAlign: "center",
  //   fontFamily: "OpenSans_600SemiBold",
  //   textTransform: "uppercase",
  //   paddingVertical: 30,
  //   marginTop: 30,
  //   fontSize: 16,
  //   lineHeight: 30,
  // },
  yellowBg: {
    backgroundColor: Colors.tcnjyellow,
    shadowOpacity: 0,
    elevation: 0,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    textShadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 60,
    paddingHorizontal: 45,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
});
