// app/screens/online-game.screen.js

import React, { useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { SocketContext } from '../contexts/socket.context';
import OnlineGameController from "../controllers/online-game.controller";

export default function OnlineGameScreen({ navigation }) {
    const socket = useContext(SocketContext);

    return (
        <View style={styles.container}>
            
            {!socket && (
                <>
                    <Text style={styles.status_message}>No connection with server...</Text>
                    <Text style={styles.status_footnote}>Restart the app and wait for the server to be back again.</Text>
                </>
            )}

            {socket && (
                <OnlineGameController navigation={navigation} />
            )}
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
    status_message: {
        fontSize: 24,
        color: "#ffffffcc",
        fontFamily: "monospace",
        textAlign: "center",
        marginBottom: 12,
    },
    status_footnote: {
        fontSize: 16,
        color: "#ffffff99",
        fontFamily: "monospace",
        textAlign: "center",
    },
    button_home: {
        backgroundColor: "#4e8cff",
        paddingVertical: 18,
        paddingHorizontal: 32,
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
