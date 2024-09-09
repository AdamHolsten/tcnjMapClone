import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export const NonWebVideo = ({
  youtubeEmbedString,
  videoHeight,
  deviceWidth,
}: {
  youtubeEmbedString: string;
  videoHeight: number;
  deviceWidth: number;
}) => {
  const isFocused = useIsFocused();

  // Create styles dynamically based on props
  const styles = useMemo(
    () =>
      StyleSheet.create({
        largeScreenContainer: {
          paddingHorizontal: 0,
          maxWidth: 700,
          width: "100%",
          marginHorizontal: deviceWidth > 650 ? "auto" : 0,
        },
      }),
    [deviceWidth]
  );

  const videoSrc = isFocused
    ? `https://www.youtube.com/embed/${youtubeEmbedString}`
    : null;

  return (
    <View style={styles.largeScreenContainer}>
      {videoSrc && (
        <iframe
          style={{ maxHeight: 400 }}
          width="100%"
          height={videoHeight}
          src={videoSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </View>
  );
};
