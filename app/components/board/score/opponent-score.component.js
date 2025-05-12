// app/components/board/timers/opponent-timer.component.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from '../../../contexts/socket.context';

const OpponentScore = () => {
    const socket = useContext(SocketContext);
    const [opponentScore, setOpponentScore] = useState(0);

    useEffect(() => {
        socket.on("game.score.view-state", (data) => {
            console.log("opponent : " + data['playerScore'] + "player :" + data['playerScore']);
            setOpponentScore(data['opponentScore']);
        });
    }, []);

    return (
        <View style={styles.opponentScoreContainer}>
          <Text style={styles.opponentScoreText}>Score: {opponentScore}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    opponentScoreContainer: {
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
    opponentScoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default OpponentScore;
