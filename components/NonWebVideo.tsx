import React, { useState, useEffect, useMemo } from "react";

import { View, Text, Dimensions, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export const NonWebVideo = ({
  youtubeEmbedString,
  videoHeight,
  deviceWidth,
}: {
  youtubeEmbedString: string;
  videoHeight: number;
  deviceWidth: number;
}) => {
  const [playing, setPlaying] = useState(false);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        largeScreenContainer: {
          // paddingHorizontal: deviceWidth < 400 ? 25 : 0,
          maxWidth: 700,
          width: "100%",
          marginHorizontal: deviceWidth > 650 ? "auto" : 0,
        },
      }),
    [deviceWidth]
  );
  return (
    <View style={styles.largeScreenContainer}>
      <YoutubePlayer
        // height={245}
        height={deviceWidth > 650 ? 400 : videoHeight}
        play={playing}
        videoId={youtubeEmbedString}
        onChangeState={(state) => {
          if (state === "ended") {
            setPlaying(false);
          }
        }}
      />
    </View>
  );
};
