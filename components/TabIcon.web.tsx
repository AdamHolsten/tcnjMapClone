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
  const SvgIcon = ({
    uri,
    width,
    height,
    fill,
  }: {
    uri: string;
    width: number;
    height: number;
    fill: string;
  }) => <img src={uri} alt="icon" style={{ width, height, fill }} />;
  return (
    <View>
      <SvgIcon
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
