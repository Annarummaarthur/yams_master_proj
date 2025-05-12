// app/components/board/timers/opponent-timer.component.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SocketContext } from '../../../contexts/socket.context';

const OpponentTimer = () => {
    const socket = useContext(SocketContext);
    const [opponentTimer, setOpponentTimer] = useState(0);

    useEffect(() => {
        socket.on("game.timer", (data) => {
            setOpponentTimer(data['opponentTimer']);
        });
    }, []);

    return (
        <View style={styles.opponentTimerContainer}>
            <Text style={styles.timerText}>⏱️ Timer: {opponentTimer}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    opponentTimerContainer: {
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

export default OpponentTimer;
