import React from "react";
import { Button, View, Text, StyleSheet, Platform } from "react-native";
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  scrollTo,
} from "react-native-reanimated";

const ITEM_COUNT: number = 10;
const ITEM_SIZE: number = 100;
const ITEM_MARGIN: number = 10;

export default function BasicCarousel(): JSX.Element {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scroll = useSharedValue<number>(0);

  useDerivedValue(() => {
    scrollTo(
      animatedRef,
      0,
      scroll.value * (ITEM_SIZE + 2 * ITEM_MARGIN),
      true
    );
  });

  const items: number[] = Array.from(Array(ITEM_COUNT).keys());

  return (
    <View style={styles.container}>
      <Incrementor index={1} scroll={scroll} />
      <Incrementor index={4} scroll={scroll} />
      <View style={styles.boxWrapper}>
        <Animated.ScrollView ref={animatedRef}>
          {items.map((_, i) => (
            <View key={i} style={styles.box}>
              <Text style={{ textAlign: "center" }}>{i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
}

interface IncrementorProps {
  index: number;
  scroll: Animated.SharedValue<number>;
}

const Incrementor = ({ index, scroll }: IncrementorProps): JSX.Element => (
  <View style={styles.buttonWrapper}>
    <Button
      onPress={() => {
        if (scroll.value === 0) {
          // If already at the top, directly scroll to index 1
          scroll.value = 1;
        } else if (scroll.value === index) {
          // If already at the target index, scroll to the next index
          scroll.value = index;
        } else {
          // Otherwise, scroll to the specified index
          scroll.value = index;
        }
      }}
      title={`Scroll to ${index}`}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: ITEM_MARGIN,
    borderRadius: 15,
    backgroundColor: "#b58df1",
    alignItems: "center",
    justifyContent: "center",
  },
  boxWrapper: {
    width: "100%",
    height: 250,
    alignItems: "center",
  },
});
