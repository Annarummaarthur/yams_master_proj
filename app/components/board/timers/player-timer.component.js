// app/components/board/timers/player-timer.component.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from '../../../contexts/socket.context';

const PlayerTimer = () => {
    const socket = useContext(SocketContext);
    const [playerTimer, setPlayerTimer] = useState(0);

    useEffect(() => {
        socket.on("game.timer", (data) => {
            setPlayerTimer(data['playerTimer']);
        });
    }, []);

    return (
        <View style={styles.playerTimerContainer}>
            <Text style={styles.timerText}>⏱️ Timer: {playerTimer}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    playerTimerContainer: {
        flexDirection: 'row',
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
    timerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        fontFamily: "monospace",
    },
});

export default PlayerTimer;
