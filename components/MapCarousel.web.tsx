import React from "react";
import { View, StyleSheet } from "react-native";
import { StopTypes } from "../api/mapapi";
import KeenCarousel from "./KeenCarousel.web";
import useStore from "../store/carouselStore";

interface MapCarouselProps {
  data: StopTypes[];
  jumpStopNumber?: number;
  setJumpStopNumber: (value: number) => void;
}

export const MapCarousel: React.FC<MapCarouselProps> = ({ data }) => {
  const setCarouselHeight = useStore((state) => state.setCarouselHeight);

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setCarouselHeight(height);
  };

  return (
    <View onLayout={handleLayout}>
      <KeenCarousel carouselContent={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    overflow: "visible",
    backgroundColor: "transparent",
    marginBottom: -10,
  },
});
