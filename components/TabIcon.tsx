import { View, Text } from "react-native";
import React from "react";
import { SvgUri } from "react-native-svg";

export const TabIcon = ({
  width,
  height,
  fill,
  uri,
}: {
  width: number;
  height: number;
  fill: string;
  uri: string;
}) => {
  return (
    <View>
      <SvgUri
        width={width}
        height={height}
        fill={fill}
        // color={color}
        // stroke={color}
        uri={uri}
      />
    </View>
  );
};

// export default TabIcon
