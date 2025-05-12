// app/components/board/board.component.js

import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import OpponentTimer from "./timers/opponent-timer.component";
import PlayerTimer from "./timers/player-timer.component";
import OpponentDeck from "./decks/opponent-deck.component";
import PlayerDeck from "./decks/player-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";
import OpponentInfos from "./infos/opponent-infos.component";
import PlayerInfos from "./infos/player-infos.component";
import OpponentScore from "./score/opponent-score.component";
import PlayerScore from "./score/player-score.component";



const Board = ({ gameViewState}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { height: '5%', justifyContent: 'space-between', paddingHorizontal: 12 }]}>
        <OpponentInfos />
        <View style={styles.opponentTimerScoreContainer}>
          <OpponentTimer />
          <OpponentScore />
        </View>
      </View>
      <View style={[styles.row, { height: '10%' }]}>
        <OpponentDeck />x
      </View>
      <View style={[styles.row, { height: '40%' }]}>
        <Grid />
        <Choices />
      </View>
      <View style={[styles.row, { height: '25%' }]}>
        <PlayerDeck />
      </View>
      <View style={[styles.row, { height: '5%', justifyContent: 'space-between', paddingHorizontal: 12 }]}>
        <PlayerInfos />
        <View style={styles.playerTimerScoreContainer}>
          <PlayerTimer />
          <PlayerScore />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  opponentTimerScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginLeft: "10px",
  },
  playerTimerScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: "10px",
    gap: 10,
  }

});


export default Board;
