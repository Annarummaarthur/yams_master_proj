// app/components/board/timers/player-timer.component.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from '../../../contexts/socket.context';

const PlayerScore = () => {
    const socket = useContext(SocketContext);
    const [playerScore, setPlayerScore] = useState(0);

    useEffect(() => {
        socket.on("game.score.view-state", (data) => {
            console.log("player :" + data['playerScore'] + "opponent : " + data['playerScore']);
            setPlayerScore(data['playerScore']);
        });
    }, []);

    return (
        <View style={styles.playerScoreContainer}>
          <Text style={styles.playerScoreText}>Score : {playerScore}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    playerScoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default PlayerScore;
