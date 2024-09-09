import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React from "react";
import moment from "moment";
import Colors from "@/constants/colors";

import { useQuery } from "@tanstack/react-query";
import { getAdmissionEvents } from "@/api/mapapi";
import { Link, router } from "expo-router";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import Animated, { FadeIn } from "react-native-reanimated";
import { useKeenSlider } from "keen-slider/react";
const AdmissionEventsCarousel = ({ deviceWidth }: { deviceWidth: number }) => {
  const { data, isError, isSuccess, isPending } = useQuery({
    queryKey: ["visitAppEvents"],
    queryFn: getAdmissionEvents,
  });
  //   console.log(data);

  // Sort the events by eventDate
  const sortedEvents = data
    ? data.sort((a, b) => {
        const dateA = moment(a.visitAppSettings.eventDate, "MM/DD/YYYY");
        const dateB = moment(b.visitAppSettings.eventDate, "MM/DD/YYYY");
        return dateA.valueOf() - dateB.valueOf();
      })
    : [];

  const today = moment().endOf("day");
  //   console.log(today);
  const filteredEvents = sortedEvents.filter((event) => {
    const eventDate = moment(
      event.visitAppSettings.eventDate,
      "MM/DD/YYYY"
    ).startOf("day");
    // console.log(eventDate);
    return eventDate.isAfter(today) || eventDate.isSame(today, "day");
  });
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      breakpoints: {
        "(min-width: 1301px) ": {
          slides: {
            perView: 3,
            spacing: 15,
            // origin: "center",
          },
        },
        "(min-width: 1001px)  and (max-width:1300px)": {
          slides: {
            perView: 3,
            spacing: 15,
            origin: "auto",
          },
        },
        "(min-width: 701px) and (max-width:1000px)": {
          slides: {
            perView: 2,
            spacing: 15,
            origin: "auto",
          },
        },
        "(max-width: 700px)": {
          slides: {
            perView: 2.5,
            spacing: 15,
            origin: "auto",
          },
        },
        "(max-width: 500px)": {
          slides: {
            perView: 1.75,
            spacing: 15,
            origin: "auto",
          },
        },
      },
      initial: 0,
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 15,
      },
      slideChanged() {
        // console.log("slide changed");
      },
    },
    [
      // add plugins here
    ]
  );
  // const renderEvents = filteredEvents.map((event: any, index) => {
  //   // console.log(event);
  //   const title = event.title;
  //   const date = event.visitAppSettings.eventDate;
  //   // console.log(date);
  //   // Parse the date string using Moment.js
  //   const eventDate = moment(date, "MM/DD/YYYY").format("MM/DD/YYYY");
  //   // console.log(eventDate);
  //   const link = event.visitAppSettings.eventLink;
  //   return (
  //     <Link href={link} key={index}>
  //       <View style={styles.whiteCard}>
  //         <Link href={`https://undergraduate-astro-site-t6y1l.kinsta.page/`}>
  //           <Image width={128} height={128} />
  //         </Link>
  //         <Text>{title}</Text>
  //         <Text>{eventDate}</Text>
  //         <Text>Learn More</Text>
  //         <Link
  //           href={`https://undergraduate-astro-site-t6y1l.kinsta.page/`}
  //         ></Link>
  //       </View>
  //     </Link>
  //   );
  // });

  //   return <View>{renderEvents}</View>;
  return (
    <View style={styles.contentContainer}>
      {data && (
        <FlashList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredEvents}
          estimatedItemSize={4}
          contentContainerStyle={{
            paddingHorizontal: deviceWidth < 800 ? 7.5 : 0,
          }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                router.push(`${item.visitAppSettings.eventLink}`);
              }}
              style={{ height: 400 }}
            >
              <Animated.View
                style={[styles.whiteCard]}
                entering={FadeIn.duration(400).delay((index % 3) * 400)}
              >
                <Image
                  style={styles.eventImage}
                  source={{
                    uri: `https://tcnj.edu/custom/map-app/images/events/${item.visitAppSettings.imageNumber}.jpg`,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: 15,
                      width: 180,
                    }}
                  >
                    <Text style={styles.eventText}>
                      {item.visitAppSettings.eventDate}
                    </Text>
                    <Text style={styles.eventText}>{item.title}</Text>
                  </View>
                  <Text style={styles.blueButton}>Learn More</Text>
                </View>
              </Animated.View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

export default AdmissionEventsCarousel;
const styles = StyleSheet.create({
  eventText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Domine_500Medium",
    // textTransform: "uppercase",
    // letterSpacing: -0.5,
    // alignContent: "center",
    textAlign: "center",
    // maxWidth: "100%",
    width: "100%",
  },
  blueButton: {
    backgroundColor: Colors.tcnjblue,
    color: "white",
    textAlign: "center",
    fontFamily: "OpenSans_600SemiBold",
    textTransform: "uppercase",
    paddingVertical: 20,
    fontSize: 15,
    lineHeight: 15,
  },
  eventImage: { width: 180, height: 180, borderRadius: 10 },
  contentContainer: {
    flex: 1,
    // maxWidth: 600,
    marginHorizontal: "auto",
  },
  whiteCard: {
    flex: 1,

    height: 400,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    textShadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
    marginHorizontal: 7.5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    textAlign: "center",
    marginBottom: 5,
    minWidth: 180,
    marginTop: 15,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
});
