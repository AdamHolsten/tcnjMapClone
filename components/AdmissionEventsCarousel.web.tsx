import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css/core";
// import "@/styles/splide-core.min.css";
// import "react-splide/css";
import "@/styles/splide.scss";
import Colors from "@/constants/colors";
import { useQuery } from "@tanstack/react-query";
import { getAdmissionEvents } from "@/api/mapapi";
import moment from "moment";

const AdmissionEventsCarousel = () => {
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
  return (
    <View style={styles.carouselContainer}>
      <Splide
        options={{
          //   rewind: true,
          gap: "1rem",
          arrows: true,
          pagination: false,
          perPage: 3,
          focus: "center",
          breakpoints: {
            600: {
              padding: "20%",
              //   width: "80%",
              perPage: 1,
              arrows: false,

              //   width: "100%",
            },
            800: {
              perPage: 3,
            },
          },
        }}
        aria-label="My Favorite Images"
      >
        {data &&
          data.map((item: any, index: number) => (
            <SplideSlide key={index}>
              <div className="slide-container-admissions">
                <a href={item.visitAppSettings.eventLink}>
                  <img
                    src={`https://tcnj.edu/custom/map-app/images/events/${item.visitAppSettings.imageNumber}.jpg`}
                    alt="Image 1"
                    width={"100%"}
                  />
                </a>

                <p> {item.visitAppSettings.eventDate}</p>
                <p>{item.title}</p>
                <a
                  className="button-link"
                  href={item.visitAppSettings.eventLink}
                >
                  Learn More
                </a>
                {/* <Text style={styles.blueButton}>Learn More</Text> */}
              </div>
            </SplideSlide>
          ))}
        {/* <SplideSlide>
          <img src="image1.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="image2.jpg" alt="Image 2" />
        </SplideSlide> */}
      </Splide>
    </View>
  );
};

export default AdmissionEventsCarousel;
const styles = StyleSheet.create({
  carouselContainer: {
    maxWidth: 600,
    width: "100%",
    marginHorizontal: "auto",
    marginTop: 30,
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
});
