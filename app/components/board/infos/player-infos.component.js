import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlayerInfos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>Pseudo: PlayerOne</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: "#4e8cff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 2,
  },
});

export default PlayerInfos;
