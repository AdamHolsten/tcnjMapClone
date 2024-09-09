import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAdmissionHeadshots } from "@/api/mapapi";
import Animated, { FadeIn, FadeInLeft, FadeOut } from "react-native-reanimated";

const AdmissionHeadshotGallery = () => {
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["admissionHeadshots"],
    queryFn: getAdmissionHeadshots,
  });

  const [visibleRows, setVisibleRows] = useState<number>(0);

  useEffect(() => {
    if (isSuccess && data) {
      const filteredData = data.filter(
        (item) =>
          !item.staffProfile.headshot.mediaItemUrl
            .toLowerCase()
            .includes("roscoe")
      );
      const chunkedData = chunkArray(filteredData, 3);

      // Function to render rows sequentially with a delay
      const renderRowsWithDelay = async () => {
        for (let i = 0; i < chunkedData.length; i++) {
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 2250)); // Delay between each row (1000ms = 1 second)
            setVisibleRows(i + 1); // Update visible rows count
          } else {
            setVisibleRows(1); // Update visible rows count
          }
        }
      };

      // Call the function to render rows
      setTimeout(() => {
        renderRowsWithDelay();
      }, 350);
    }
  }, [isSuccess, data]); // Depend on isSuccess and data to run useEffect appropriately

  if (isLoading) {
    return <View style={styles.container} />;
  }

  if (isError) {
    return <Text>Error loading data.</Text>;
  }

  const modifyUrl = (url: string) => {
    let dotIndex = url.lastIndexOf(".");
    let modifiedUrl =
      url.substring(0, dotIndex) + "-150x150" + url.substring(dotIndex);
    return modifiedUrl;
  };

  const chunkArray = (array: any[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Ensure chunkedData exists before rendering
  if (!isSuccess || !data) {
    return <Text>No data available.</Text>;
  }

  let filteredData = data.filter(
    (item) =>
      !item.staffProfile.headshot.mediaItemUrl.toLowerCase().includes("roscoe")
  );
  filteredData = data.filter(
    (item) =>
      !item.staffProfile.headshot.mediaItemUrl.toLowerCase().includes("roscoe")
  );

  filteredData.sort((a, b) => {
    const lastNameA = a.staffProfile.lastName.toUpperCase(); // ignore upper and lowercase
    const lastNameB = b.staffProfile.lastName.toUpperCase(); // ignore upper and lowercase

    if (lastNameA < lastNameB) {
      return -1;
    }
    if (lastNameA > lastNameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  const chunkedData = chunkArray(filteredData, 3);

  return (
    <View style={styles.container}>
      <View style={styles.galleryContainer}>
        {chunkedData.slice(0, visibleRows).map((chunk, chunkIndex) => (
          <Animated.View
            key={`headshot-row-${chunkIndex}`}
            style={styles.chunkContainer}
          >
            {chunk.map(
              (
                item: {
                  staffProfile: { headshot: { mediaItemUrl: string } };
                },
                itemIndex: number
              ) => {
                let originalUrl = item.staffProfile.headshot.mediaItemUrl;
                let modifiedUrl = modifyUrl(originalUrl);

                return (
                  <Animated.Image
                    key={`${chunkIndex}-${itemIndex}`}
                    style={styles.eventImage}
                    source={{ uri: modifiedUrl }}
                    entering={FadeIn.duration(500).delay((itemIndex % 3) * 400)}
                    exiting={FadeOut.duration(300)}
                  />
                );
              }
            )}
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

export default AdmissionHeadshotGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: 74,
  },
  eventImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    margin: 5,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "relative",
  },
  chunkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
  },
});
