// app/components/board/decks/player-deck.component.js

import React, { useState, useContext, useEffect } from "react";
import { View, Pressable , Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";

const PlayerDeck = () => {

  const socket = useContext(SocketContext);
  const [displayPlayerDeck, setDisplayPlayerDeck] = useState(false);
  const [dices, setDices] = useState(Array(5).fill(false));
  const [displayRollButton, setDisplayRollButton] = useState(false);
  const [rollsCounter, setRollsCounter] = useState(0);
  const [rollsMaximum, setRollsMaximum] = useState(3);

  useEffect(() => {

    socket.on("game.deck.view-state", (data) => {
      setDisplayPlayerDeck(data['displayPlayerDeck']);
      if (data['displayPlayerDeck']) {
        setDisplayRollButton(data['displayRollButton']);
        setRollsCounter(data['rollsCounter']);
        setRollsMaximum(data['rollsMaximum']);
        setDices(data['dices']);
      }
    });
  }, []);

  const toggleDiceLock = (index) => {
    const newDices = [...dices];
    if (newDices[index].value !== '' && displayRollButton) {
      socket.emit("game.dices.lock", newDices[index].id);
    }
  };

  const rollDices = () => {
    if (rollsCounter <= rollsMaximum) {
      socket.emit("game.dices.roll");
    }
  };

  return (
    <View style={styles.deckPlayerContainer}>

      {displayPlayerDeck && (
        <>
          {displayRollButton && (
            <>
              <View style={styles.rollInfoContainer}>
                <Text style={styles.rollInfoText}>
                  Lancer {rollsCounter} / {rollsMaximum}
                </Text>
              </View>
            </>
          )}

          <View style={styles.diceContainer}>
            {dices.map((diceData, index) => (
              <Dice
                key={diceData.id}
                index={index}
                locked={diceData.locked}
                value={diceData.value}
                onPress={toggleDiceLock}
              />
            ))}
          </View>

          {displayRollButton && (
            <>
              <Pressable style={({ hovered, pressed }) => [
                                styles.rollButton,
                                hovered && styles.button_hover,
                                pressed && styles.button_pressed,
                              ]} onPress={rollDices}>
                <Text style={styles.rollButtonText}>Lancer</Text>
              </Pressable>
            </>
          )}
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  deckPlayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black"
  },
  rollInfoContainer: {
    marginBottom: 10,
  },
  rollInfoText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "white"
  },
  diceContainer: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rollButton: {
    backgroundColor: "#4e8cff",
    paddingVertical: 18,
    paddingHorizontal: 170,
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
  rollButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default PlayerDeck;
