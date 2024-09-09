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
  Pressable,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import Colors from "@/constants/colors";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import { Domine_500Medium } from "@expo-google-fonts/domine";
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { Overpass_900Black } from "@expo-google-fonts/overpass";
import { SvgUri, SvgXml } from "react-native-svg";
import SocialFooter from "@/components/SocialFooter";
import { useQuery } from "@tanstack/react-query";
import { getUndergradPrograms } from "@/api/mapapi";
import AdmissionEventsCarousel from "@/components/AdmissionEventsCarousel";
import { WhiteCard } from "@/components/WhiteCard";
import { ButtonLink } from "@/components/ButtonLink";
import { ParallaxHero } from "@/components/ParallaxHero";
import { InnerContainer } from "@/components/InnerContainer";
// import KeenCarousel from "@/components/KeenCarousel.web";
const { width } = Dimensions.get("window");
const IMG_HEIGHT = 430;
const deviceWidth = Dimensions.get("window").width;
const dynamicWidth = deviceWidth - 30;
const Discover = () => {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: ["program"],
    queryFn: getUndergradPrograms,
  });

  // console.log(data);
  // function getRandomElements(arr: string | any[] | undefined, num: number) {
  //   const shuffled = (arr as string[]).slice(0);
  //   let i = (arr as string[]).length;
  //   const min = i - num;
  //   let temp;
  //   let index;

  //   while (i-- > min) {
  //     index = Math.floor((i + 1) * Math.random());
  //     temp = shuffled[index];
  //     shuffled[index] = shuffled[i];
  //     shuffled[i] = temp;
  //   }

  //   return shuffled.slice(min);
  // }

  // const randomFour = getRandomElements(data, 4);

  const renderPrograms = data?.map((program: any) => {
    // console.log(program);
    const appImage = program.program.appImage?.sourceUrl;
    const programOptions = program.program.programOptions;
    const additionalOptions = program.program.additionalOptions;
    const progOptionSort: { [key: string]: number } = {
      Major: 0,
      Minor: 1,
      Certificate: 2,
      "Three-Year Bachelor's": 3,
      Accelerated: 4,
      "Dual Degree": 5,
      "Teacher Education": 6,
      Undeclared: 7,
      Prelaw: 2.5,
      Premed: 9,
    };

    return (
      <Pressable
        onPress={() => {
          router.push(
            `https://undergraduate-astro-site-t6y1l.kinsta.page/${program.program.slug}`
          ); // Navigate to the specified route

          // Handle navigation when the image is pressed
        }}
        key={program.program.slug}
      >
        <View style={[styles.whiteCard, styles.programCard]}>
          <View
            style={[
              styles.cardContentWrapper,
              { margin: deviceWidth < 400 ? 10 : 15 },
            ]}
          >
            {appImage && (
              <Image
                source={{ uri: appImage }}
                width={128}
                height={128}
                style={styles.programImage}
              />
            )}

            <View style={styles.titleAndOptions}>
              <Text style={styles.programTitle}>{program.title}</Text>
              <View style={styles.horizontalRule}></View>
              <View style={styles.optionsWrapper}>
                {(programOptions || additionalOptions) &&
                  [...(programOptions || []), ...(additionalOptions || [])] // Combine programOptions and additionalOptions
                    .slice() // Create a shallow copy to avoid mutating the original array
                    .sort((a, b) => progOptionSort[a] - progOptionSort[b]) // Sort the combined array
                    .map((option, index) => {
                      const formatOption = (option: string) => {
                        return option
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w-]/g, "");
                      };
                      return (
                        <View key={index} style={styles.iconRow}>
                          {Platform.OS !== "web" && (
                            <SvgUri
                              // style={{ marginRight: deviceWidth < 400 ? 3 : 5 }}
                              style={styles.svgContainer}
                              width={deviceWidth < 400 ? 10 : 15}
                              height={deviceWidth < 400 ? 10 : 15}
                              uri={`https://tcnj.edu/custom/map-app/images/card-icons/${formatOption(
                                option
                              )}.svg`}
                            />
                          )}

                          <Text style={styles.iconText}>{option}</Text>
                        </View>
                      );
                    })}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  });

  // console.log(randomFour);
  // const formattedData = data?.programs?.nodes;
  // console.log(formattedData);
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Domine_500Medium,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_800ExtraBold,
    Overpass_900Black,
  });
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOfset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            // [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT / 3]
          ),
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [1.5, 1, 1]
          ),
        },
      ],
    };
  });
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
  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={6}>
        {fontsLoaded && (
          <>
            {/* {Platform.OS === "web" && <KeenCarousel />} */}
            <ParallaxHero
              offset={scrollOfset}
              title="Discover"
              heroImage={require("@/assets/hero-image-C.jpg")}
              heroImageLarge={{
                uri: "https://www.tcnj.edu/custom/map-app/images/hero-image-C-web.jpg",
              }}
            />
            {/* <View
              style={{
                backgroundColor: Colors.lightgrey,
                position: "relative",
                flex: 1,
              }}
            >
              <Animated.Image
                source={require("@/assets/hero-image-C.jpg")}
                // source={{
                //   uri: "https://www.tcnj.edu/custom/map-app/images/hero-image-C.jpg",
                // }}
                // entering={FadeIn.duration(400).delay(100)}
                style={[styles.heroImage, imageAnimatedStyle]}
              />
              <Animated.Text
                style={styles.title}
                entering={FadeInDown.duration(600).delay(200)}
              >
                Discover
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
                <Text style={styles.cardTitle}>
                  Higher Education, Elevated.
                </Text>

                <Text style={styles.introText}>
                  TCNJ offers boundless opportunities for students to grow,
                  connect, explore, and succeed. Browse our admission events,
                  see selected programs, and connect to our social accounts
                  below.
                </Text>
              </WhiteCard>
              {/* <View
                style={[
                  styles.whiteCard,
                  {
                    marginTop: -60,
                  },
                ]}
              >
                <Text style={styles.cardTitle}>
                  Higher Education, Elevated.
                </Text>

                <Text style={styles.introText}>
                  TCNJ offers boundless opportunities for students to grow,
                  connect, explore, and succeed. Browse our admission events,
                  see selected programs, and connect to our social accounts
                  below.
                </Text>
              </View> */}
            </View>
            <View style={styles.admissionWrapper}>
              <Text style={[styles.cardTitle, { paddingBottom: 0 }]}>
                Current Admission Events
              </Text>
              <AdmissionEventsCarousel deviceWidth={deviceWidth} />
            </View>
            {/* HIDE UNDERGRAD SELECTED PROGRAMS */}
            {/* <View style={[styles.selectedProgramsWrapper]}>
              <InnerContainer paddingBottom={15}>
                <Text style={styles.cardTitle}>Selected Programs</Text>
                <Text
                  style={[
                    styles.introText,
                    {
                      paddingHorizontal: deviceWidth < 400 ? 25 : 0,
             
                      textAlign: "center",
                      marginBottom: 30,
                    },
                  ]}
                >
                  TCNJ has a wide range of high quality, innovative programs for
                  students of all majors and disciplines.
                </Text>
              </InnerContainer>

              {renderPrograms}
              <ButtonLink
                url="https://undergraduate-astro-site-t6y1l.kinsta.page/"
                linkText="View all Programs"
                marginRightAndBottom
              />
     
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
export default Discover;

const styles = StyleSheet.create({
  admissionWrapper: {
    paddingVertical: 60,
    backgroundColor: Colors.tcnjyellow,
    minHeight: 200,
  },
  horizontalRule: {
    borderBottomColor: "#BCBCBC", // Change color as needed
    borderBottomWidth: 1, // Change thickness as needed
    marginTop: 10, // Adjust spacing as needed
    marginRight: 5, // Adjust spacing as needed
    width: "100%",
    ...Platform.select({
      android: {
        // marginRight: 25, // Adjust spacing as needed
        // elevation: 3,
      },
    }),
  },
  cardContentWrapper: {
    flex: 1,
    alignItems: "center", // Align content vertically
    flexDirection: "row",
    // padding: 15,
    // paddingBottom: 10,
    // margin: 15,
    // height: 128,
  },
  programImage: {
    borderRadius: 10,
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  titleAndOptions: {
    // width: 245,
    flex: 1,
    width: "100%",
    textAlign: "left",
    paddingLeft: 15,
    paddingBottom: 0, // Reduce bottom padding
    marginBottom: 0, // Reduce margin bottom
  },
  optionsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 0,
    columnGap: 10,
    paddingTop: 10,
    paddingHorizontal: 0, // Reduce horizontal padding
    paddingBottom: 0, // Reduce bottom padding
    marginBottom: 0, // Reduce margin bottom
  },
  programTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Domine_500Medium",
    // textTransform: "uppercase",
    // letterSpacing: -0.5,
    // alignContent: "center",
    textAlign: "left",
    paddingBottom: 0,
    paddingTop: 5,
  },
  programCard: {
    backgroundColor: "white",
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: 15,
    // width: "100%",
    width: dynamicWidth,
    maxWidth: 600,
    marginHorizontal: deviceWidth > 650 ? "auto" : 15,
    // alignItems: "center", // Align content vertically
    flex: 1,
  },

  iconText: {
    fontSize: 12,
    lineHeight: 25,
    fontFamily: "OpenSans_400Regular",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 0,
    rowGap: 0,
  },
  svgContainer: {
    marginRight: 5, // Add margin to the right of SVG
  },
  container: { flex: 1, backgroundColor: Colors.tcnjyellow },
  heroImage: { width, height: IMG_HEIGHT },
  title: {
    position: "absolute",
    // top: IMG_HEIGHT / 2 - 55,
    top: IMG_HEIGHT / 2 - 30,
    // top: "50%",
    left: 0,
    right: 0,
    // transform: [{ translateY: -25 }], // Adjust the value as needed
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 50,
    lineHeight: 60,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    elevation: 1,
    fontFamily: "AlfaSlabOne_400Regular",
  },
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
    paddingBottom: 15,
  },
  blueButton: {
    backgroundColor: Colors.tcnjblue,
    color: "white",
    padding: 10,
    textAlign: "center",
    borderRadius: 0,
    marginVertical: 20,
    fontFamily: "OpenSans_600SemiBold",
    textTransform: "uppercase",
    paddingVertical: 30,
    marginTop: 30,
    fontSize: 16,
    lineHeight: 30,
  },
  blueBorderButton: {
    borderColor: Colors.tcnjblue,
    borderWidth: 2,
    color: Colors.tcnjblue,
    padding: 10,
    textAlign: "center",
    fontFamily: "OpenSans_600SemiBold",
    textTransform: "uppercase",
    paddingVertical: 30,
    marginTop: 30,
  },
  yellowBg: { backgroundColor: Colors.tcnjyellow, shadowOpacity: 0 },
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
    // paddingHorizontal: 45,
    paddingHorizontal: deviceWidth < 400 ? 25 : 45,

    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  selectedProgramsWrapper: {
    backgroundColor: Colors.lightgrey,
    // paddingVertical: 60,
    paddingHorizontal: 0,
    width: "100%",
  },
});
