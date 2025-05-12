// app/screens/home.screen.js

import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState } from "react";

export default function HomeScreen({ navigation }) {
  const title = "Yam Master";
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title_intro}>🎲 Bienvenue dans</Text>
      <View style={styles.title_container}>
        {title.split("").map((char, index) => (
          <Text
            key={index}
            style={[
              styles.title_letter,
              hoveredIndex === index && styles.title_letter_hover,
            ]}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {char}
          </Text>
        ))}
      </View>

      <Pressable
        style={({ hovered, pressed }) => [
          styles.button_home,
          hovered && styles.button_hover,
          pressed && styles.button_pressed,
        ]}
        onPress={() => navigation.navigate("OnlineGameScreen")}
      >
        <Text style={styles.button_text}>🎮 Jouer en ligne</Text>
      </Pressable>

      <Pressable
        style={({ hovered, pressed }) => [
          styles.button_home,
          hovered && styles.button_hover,
          pressed && styles.button_pressed,
        ]}
        onPress={() => navigation.navigate("VsBotGameScreen")}
      >
        <Text style={styles.button_text}>🤖 Jouer contre le bot</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
  },
  title_intro: {
    fontSize: 28,
    color: "#ffffffcc",
    marginBottom: 12,
    fontFamily: "monospace",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 3,
  },
  title_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 40,
    marginTop: 20,
    animation: "fadeIn 1s ease-in-out",
  },
  title_letter: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#4e8cff",
    fontFamily: "monospace",
    marginHorizontal: 3,
    transitionDuration: "200ms",
    cursor: "default",
  },
  title_letter_hover: {
    color: "#ffffff",
    textShadowColor: "#4e8cff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    transform: [{ scale: 1.2 }],
  },
  button_home: {
    backgroundColor: "#4e8cff",
    paddingVertical: 20,
    paddingHorizontal: 36,
    marginVertical: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ffffff33",
    shadowColor: "#4e8cff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
    transitionDuration: "200ms",
  },
  button_hover: {
    backgroundColor: "#6ea5ff",
    shadowColor: "#ffffff",
    shadowOpacity: 1,
    shadowRadius: 20,
    transform: [{ scale: 1.05 }],
  },
  button_pressed: {
    backgroundColor: "#3a6fd1",
    transform: [{ scale: 0.95 }],
  },
  button_text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    fontFamily: "monospace",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});
