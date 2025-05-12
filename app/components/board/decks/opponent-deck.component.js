// app/components/board/decks/opponent-deck.component.js

import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";

const OpponentDeck = () => {
  const socket = useContext(SocketContext);
  const [displayOpponentDeck, setDisplayOpponentDeck] = useState(false);
  const [opponentDices, setOpponentDices] = useState(
    Array(5).fill({ value: "", locked: false })
  );

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayOpponentDeck(data["displayOpponentDeck"]);
      if (data["displayOpponentDeck"]) {
        setOpponentDices(data["dices"]);
      }
    });
  }, []);

  return (
    <View style={styles.deckOpponentContainer}>
      {displayOpponentDeck && (
        <View style={styles.diceContainer}>
          {opponentDices.map((diceData, index) => (
            <Dice
              key={index}
              locked={diceData.locked}
              value={diceData.value}
              opponent={true}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckOpponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  diceContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginBottom: 3,
  },
});

export default OpponentDeck;
