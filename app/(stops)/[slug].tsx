import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import {
  useFonts,
  AlfaSlabOne_400Regular,
} from "@expo-google-fonts/alfa-slab-one";
import { Domine_500Medium } from "@expo-google-fonts/domine";
import { OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import Colors from "@/constants/colors";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { IndividualStopTypes, getIndividualStop } from "@/api/mapapi";
// import YoutubePlayer from "react-native-youtube-iframe";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import { NonWebVideo } from "@/components/NonWebVideo";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import SlugHero from "@/components/SlugHero";
import WebCarousel from "@/components/WebCarousel.web";

// const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);
const deviceWidth = Dimensions.get("window").width;
const SlugPage = () => {
  // const [playing, setPlaying] = useState(false);
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Domine_500Medium,
    OpenSans_700Bold,
  });
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();
  const [links, setLinks] = useState<{ [key: string]: string }>({});

  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: ["stop", slug],
    queryFn: () => getIndividualStop(slug!),
  });

  useEffect(() => {
    if (isSuccess && data) {
      navigation.setOptions({
        title: data.title,
      });
    }
  }, [navigation, isSuccess, data]);

  const stripHtmlTags = (html: string) => {
    const strippedText = html.replace(/<[^>]+>/g, "");
    return strippedText;
  };
  const youtubeEmbedString = data?.virtualTourSlide.videoEmbed.slice(-11);

  const flashListItems = useMemo(() => {
    let combinedGallery = [];
    if (!isSuccess || !data) {
      return null;
    } else {
      combinedGallery = [
        ...(data?.virtualTourSlide.imageGallery || []),
        ...(data?.virtualTourSlide.imageGalleryHidden || []),
      ];
    }

    return (
      <View style={styles.photoGallery}>
        <FlashList
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={8}
          data={combinedGallery}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={[styles.galleryItem, index === 0 && { paddingLeft: 20 }]}
            >
              <Image
                source={{ uri: item.galleryImage.mediaItemUrl }}
                style={{ width: 250, height: 250 }}
              />
              {/* <Text>{item.galleryCaption}</Text> */}
            </View>
          )}
        />
      </View>
    );
  }, [isSuccess, data]);

  useMemo(() => {
    let additionalLinksHtml = "";
    if (!isSuccess || !data) {
      return null;
    } else {
      additionalLinksHtml = data?.virtualTourSlide.additionalLinks || "";
      const linkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"([^>]*)>(.*?)<\/a>/gi;

      let match;
      const extractedLinks: { [key: string]: string } = {};

      while ((match = linkRegex.exec(additionalLinksHtml)) !== null) {
        const url = match[1];
        const text = match[3];
        extractedLinks[url] = text;
      }
      setLinks(extractedLinks);
    }
  }, [isSuccess, data]);

  if (isPending) {
    return;
  }
  // console.log(data?.virtualTourSlide.mobileHero.mediaItemUrl);
  // console.log("links", links);
  const deviceWidth = Dimensions.get("window").width;
  const aspectRatio = 16 / 9;

  const videoHeight = (deviceWidth - 20) / aspectRatio;
  const largeHeroImage = data?.virtualTourSlide.backgroundImage.mediaItemUrl;

  return (
    <>
      {/* <View style={styles.backButtonContainer}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Image
            source={require("@/assets/back-arrow.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </Pressable>
      </View> */}
      <Animated.ScrollView
        // contentContainerStyle={{ marginBottom: 0 }} // Add this line
        style={styles.container}
        entering={FadeIn.duration(500)}
        showsVerticalScrollIndicator={false}
      >
        {isSuccess && fontsLoaded && (
          <>
            <SlugHero
              data={data?.virtualTourSlide.mobileHero.mediaItemUrl}
              largeHeroImage={largeHeroImage}
            />

            <SafeAreaView style={{ backgroundColor: "white" }}>
              <View style={styles.card}>
                <Animated.View entering={FadeIn.duration(500).delay(400)}>
                  <Text
                    style={[
                      styles.header,
                      {
                        fontSize: deviceWidth < 400 ? 26 : 30,
                        lineHeight: deviceWidth < 400 ? 36 : 40,
                      },
                      styles.largeScreenContainer,
                    ]}
                  >
                    {data?.title}
                  </Text>
                  {/* <Animated.View entering={FadeIn.duration(600)}> */}
                  <NonWebVideo
                    deviceWidth={deviceWidth}
                    youtubeEmbedString={youtubeEmbedString ?? ""}
                    videoHeight={videoHeight}
                  />
                  {/* </Animated.View> */}
                  {/* {Platform.OS != "web" && (
                  <YoutubePlayer
                    height={245}
                    play={playing}
                    videoId={youtubeEmbedString}
                    onChangeState={(state) => {
                      if (state === "ended") {
                        setPlaying(false);
                      }
                    }}
                  />
                )} */}
                  <Text
                    style={[
                      styles.introText,
                      {
                        fontSize: deviceWidth < 400 ? 18 : 20,
                        lineHeight: deviceWidth < 400 ? 28 : 30,
                      },
                      styles.largeScreenContainer,
                    ]}
                  >
                    {data?.virtualTourSlide.introductoryText &&
                      stripHtmlTags(data.virtualTourSlide.introductoryText)}
                  </Text>
                </Animated.View>
              </View>
              {Platform.OS !== "web" ? (
                <View style={styles.greyCard}>{flashListItems}</View>
              ) : (
                <WebCarousel
                  webData={flashListItems?.props?.children?.props?.data ?? null}
                />

                // <WebCarousel data={combinedGallery} />
              )}
            </SafeAreaView>
            {links &&
            links[Object.keys(links)[0]] !==
              '<span class="visually-hidden">no link</span>' ? (
              <View style={[styles.cardLower, { flex: 0 }]}>
                {Object.entries(links).map(([url, text], index) => {
                  // console.log(text);
                  return text === "Explore the Gitenstein Library" ? (
                    <View key={index} style={styles.learnMoreContainer}>
                      <Text style={styles.learnMoreTitle}>Join the Pride</Text>
                      <Link href={url} style={styles.learnMoreButton}>
                        <Text style={styles.learnMoreButtonText}>
                          Explore the Library
                        </Text>
                      </Link>
                    </View>
                  ) : text === "Learn more about housing" ? (
                    <View key={index} style={styles.learnMoreContainer}>
                      <Text style={styles.learnMoreTitle}>Join the Pride</Text>
                      <Link href={url} style={styles.learnMoreButton}>
                        <Text style={styles.learnMoreButtonText}>
                          Learn about housing
                        </Text>
                      </Link>
                    </View>
                  ) : (
                    <View key={index} style={styles.learnMoreContainer}>
                      <Text style={styles.learnMoreTitle}>Join the Pride</Text>
                      <Link href={url} style={styles.learnMoreButton}>
                        <Text style={styles.learnMoreButtonText}>{text}</Text>
                      </Link>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={[styles.cardLower, { flex: 0 }]}>
                <View style={styles.learnMoreContainer}>
                  {/* <Text style={styles.learnMoreTitle}>Join the Pridea </Text>
                    <Link href={url} style={styles.learnMoreButton}>
                      <Text style={styles.learnMoreButtonText}>{text}</Text>
                    </Link> */}
                </View>
              </View>
            )}
          </>
        )}
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  largeScreenContainer: {
    // paddingHorizontal: deviceWidth < 400 ? 25 : 0,
    maxWidth: 700,
    width: "100%",
    marginHorizontal: deviceWidth > 650 ? "auto" : 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.tcnjyellow,
  },
  // backButtonContainer: {
  //   position: "absolute",
  //   // top: 50,
  //   // left: 13,
  //   elevation: 10,
  //   zIndex: 1000,
  //   // padding: 7,
  //   // borderRadius: 50,
  //   backgroundColor: Colors.tcnjyellow,
  //   flex: 1,
  //   paddingTop: 50,
  //   top: 0,
  //   left: 0,
  //   paddingBottom: 10,
  //   width: "100%",
  // },
  // backButton: {
  //   paddingTop: 5,
  //   paddingLeft: 20,
  //   // paddingBottom: 20,
  //   width: 30,
  //   height: 30,
  // },
  // heroImageContainer: {
  //   flex: 1,
  //   paddingLeft: 20,
  //   paddingTop: 5,
  //   paddingBottom: 20,
  //   alignItems: "flex-start",
  //   justifyContent: "flex-start",
  // },
  // heroImage: {
  //   // width: 684,
  //   width: "100%",
  //   // height: 385,
  //   // height: 355,
  //   // height: 300,
  //   marginHorizontal: "auto",
  //   overflow: "hidden",
  //   resizeMode: "cover",
  //   borderTopLeftRadius: 10,
  //   borderBottomLeftRadius: 10,
  // },
  header: {
    fontFamily: "AlfaSlabOne_400Regular",
    fontSize: 30,
    textAlign: "left",
    lineHeight: 40,
    // paddingTop: 0,
    paddingTop: deviceWidth > 650 ? 30 : 22.5,
    paddingBottom: deviceWidth > 650 ? 30 : 22.5,
    // paddingBottom: 22.5,
    color: Colors.tcnjblue,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 10,
    paddingTop: 0,
    // marginTop: -30,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    elevation: 1,
    flex: 1,
    gap: 4,
    minHeight: "auto",
  },
  cardLower: {
    marginTop: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    elevation: 1,
    flex: 1,
    backgroundColor: Colors.tcnjyellow,
    minHeight: "auto",
  },
  greyCard: {
    backgroundColor: "#ffffff",
    padding: 0,
    paddingTop: 0,
    paddingRight: 0,
    elevation: 1,
    marginTop: -10,
    flex: 1,
    gap: 4,
    minHeight: "auto",
    marginHorizontal: "auto",
  },
  photoGallery: {
    // paddingVertical: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  introText: {
    marginTop: 15,
    fontFamily: "Domine_500Medium",
  },
  galleryItem: { paddingRight: 20 },
  learnMoreContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // height: 300,
    paddingTop: 50,
    paddingBottom: 70,
  },
  learnMoreTitle: {
    fontSize: 40,
    lineHeight: 55,
    fontFamily: "AlfaSlabOne_400Regular",
    color: Colors.tcnjblue,
    textAlign: "center",
  },
  learnMoreButton: {
    padding: 30,
    borderColor: Colors.tcnjblue,
    marginTop: 10,
    paddingHorizontal: 66,
    borderWidth: 1,
    // borderRadius: 10,
    // backgroundColor: "rgba(255,255,255,0.5)",
  },
  learnMoreButtonText: {
    fontSize: 15,
    lineHeight: 25,
    color: Colors.tcnjblue,
    textTransform: "uppercase",
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
  },
});

export default SlugPage;
