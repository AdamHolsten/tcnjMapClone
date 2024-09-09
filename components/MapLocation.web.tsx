"use strict";

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

export default function MapLocation() {
  const [position, setPosition] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);

  const watchPosition = () => {
    try {
      const watchID = navigator.geolocation.watchPosition(
        (position) => {
          console.log("watchPosition", JSON.stringify(position));
          setPosition(JSON.stringify(position));
        },
        (error) => Alert.alert("WatchPosition Error", JSON.stringify(error)),
        {
          timeout: 10000, // 10 seconds
          maximumAge: 1000, // 1 second
          enableHighAccuracy: true, // Use GPS for higher accuracy
          //   distanceFilter: 10, // Update every 10 meters
        }
      );
      setSubscriptionId(watchID);
    } catch (error) {
      Alert.alert("WatchPosition Error", JSON.stringify(error));
    }
  };

  const clearWatch = () => {
    if (subscriptionId !== null) {
      navigator.geolocation.clearWatch(subscriptionId);
      setSubscriptionId(null);
      setPosition(null);
    }
  };

  useEffect(() => {
    return () => {
      clearWatch();
    };
  }, []);

  const renderPosition = () => {
    if (!position) return "unknown";

    try {
      const parsedPosition = JSON.parse(position);
      return (
        <>
          <br />
          <Text>Latitude: {parsedPosition.coords.latitude}</Text>
          <Text>Longitude: {parsedPosition.coords.longitude}</Text>
        </>
      );
    } catch (error) {
      console.error("Error parsing position:", error);
      return "unknown";
    }
  };

  return (
    <View>
      <Text style={styles.title}>Last position: {renderPosition()}</Text>
      {subscriptionId !== null ? (
        <Button title="Clear Watch" onPress={clearWatch} />
      ) : (
        <Button title="Watch Position" onPress={watchPosition} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "500",
  },
});
