// MapCarousel.js

import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { StopTypes } from "@/api/mapapi";
import { CarouselItem } from "./CarouselItem";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

interface MapCarouselProps {
  data: StopTypes[];
  jumpStopNumber?: number; // Make jumpStopNumber optional
  setJumpStopNumber: (value: number) => void;
  // OnScrollEventHandler: (
  //   event: NativeSyntheticEvent<NativeScrollEvent>
  // ) => void;
}

export const MapCarousel: React.FC<MapCarouselProps> = ({
  data,
  jumpStopNumber,
  setJumpStopNumber,
}) => {
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlashList<StopTypes>>(null);
  const ITEM_WIDTH = 315;
  const ITEM_HEIGHT = 235;
  // const ITEM_HEIGHT = 195;
  // const IMAGE_HEIGHT = 125;
  const IMAGE_HEIGHT = 150;
  const MARGIN_HORIZONTAL = 5;
  const ITEM_FULL_WIDTH = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
  const SPACER = (width - ITEM_FULL_WIDTH) / 2;
  useEffect(() => {
    // Scroll to the specified index when jumpStopNumber changes
    if (jumpStopNumber !== undefined && jumpStopNumber !== null) {
      scrollToIndex(jumpStopNumber);
      // console.log("jumpStopNumber", jumpStopNumber);
    }
  }, [jumpStopNumber]);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    // Log event when the carousel scrolls
    // console.log("Carousel scrolled:", event.nativeEvent.contentOffset.x);
    const index = Math.round(
      event.nativeEvent.contentOffset.x / ITEM_FULL_WIDTH
    );
    setJumpStopNumber(index);
    // console.log(index);
    // scrollToIndex();
  };

  const scrollToIndex = (index: number) => {
    const offsetX = index * ITEM_FULL_WIDTH;
    flatListRef.current?.scrollToOffset({ animated: true, offset: offsetX });
  };
  // console.log(data);
  return (
    <Animated.View
      style={[{ flex: 1 }, styles.flatListContainer]}
      entering={FadeIn.duration(400).delay(600)}
    >
      <FlashList
        ref={flatListRef}
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={{ width: SPACER }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ width: SPACER }}
        data={data}
        keyExtractor={(item) => item.virtualTourSlide.stopNumber.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        decelerationRate={0.0}
        snapToInterval={ITEM_FULL_WIDTH}
        snapToAlignment="start"
        disableIntervalMomentum={true}
        estimatedItemSize={16}
        // onScroll={handleScroll} // Add onScroll event handler
        // onScrollAnimationEnd={() => {
        //   console.log("scroll animation end");
        // }}
        // onMoveShouldSetResponderCapture={(event) => {
        //   console.log(event.nativeEvent);
        //   // return true;
        // }}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item, index }) => (
          <CarouselItem
            item={item}
            index={index}
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            imageHeight={IMAGE_HEIGHT}
            horizontalMargin={MARGIN_HORIZONTAL}
            stopNumber={item.virtualTourSlide.stopNumber}
            // style={{ padding: 10, backgroundColor: "red" }}
          />
          // Try Wrapping CarouselItem with Link
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    // position: "absolute",
    // bottom: 50,
    overflow: "visible",
    backgroundColor: "transparent",
    marginBottom: -10,
    // height: 500,
  },
});
// https://www.youtube.com/watch?v=5OkYf2yyrXs
