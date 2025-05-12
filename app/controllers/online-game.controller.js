import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SocketContext } from '../contexts/socket.context';
import Board from "../components/board/board.component";
import EndGameModal from "../components/board/EndGameModal"; // adapte le chemin si besoin

export default function OnlineGameController({ navigation }) {
    const socket = useContext(SocketContext);

    const [inQueue, setInQueue] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [myPlayerId, setMyPlayerId] = useState(null);
    const [idOpponent, setIdOpponent] = useState(null);
    const [finalScore, setFinalScore] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        console.log('[emit][queue.join]:', socket.id);
        socket.emit("queue.join");
        setInQueue(false);
        setInGame(false);

        socket.on('queue.added', (data) => {
            console.log('[listen][queue.added]:', data);
            setInQueue(data['inQueue']);
            setInGame(data['inGame']);
        });

        socket.on('game.start', (data) => {
            console.log('[listen][game.start]:', data);
            setInQueue(data['inQueue']);
            setInGame(data['inGame']);
            setIdOpponent(data['idOpponent']);
            setMyPlayerId(data['playerId']); // 'player:1' ou 'player:2'
        });

        socket.on('game.over', ({ message, finalScore }) => {
            console.log('[listen][game.over]:', finalScore);
            setFinalScore(finalScore);
            setIsGameOver(true);
        });

        socket.on('queue.left', (data) => {
            console.log('[listen][queue.left]:', data);
            setInQueue(data['inQueue']);
            setInGame(data['inGame']);
            navigation.navigate('HomeScreen');
        });
    }, []);

    const handleReplay = () => {
        setIsGameOver(false);
        socket.emit('game.replay');
    };

    const handleQuit = () => {
        setIsGameOver(false);
        socket.emit('queue.leave');
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            {!inQueue && !inGame && (
                <Text style={styles.status_message}>En attente des données du serveur...</Text>
            )}

            {inQueue && (
                <>
                    <Text style={styles.status_message}>En attente d'un autre joueur...</Text>
                    <Pressable
                        style={({ hovered, pressed }) => [
                            styles.button_home,
                            hovered && styles.button_hover,
                            pressed && styles.button_pressed,
                        ]}
                        onPress={() => socket.emit('queue.leave')}
                    >
                        <Text style={styles.button_text}>❌ Quitter la file d'attente</Text>
                    </Pressable>
                </>
            )}

            {inGame && (
                <>
                    <Board />
                    <EndGameModal
                        visible={isGameOver}
                        finalScore={finalScore}
                        myPlayerId={myPlayerId}
                        idOpponent={idOpponent}
                        onReplay={handleReplay}
                        onQuit={handleQuit}
                    />
                </>
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
        width: '100%',
        height: '100%',
        padding: 20,
        position: "relative",
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#4e8cff",
        fontFamily: "monospace",
        marginBottom: 20,
        textShadowColor: "#ffffff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        textAlign: "center",
    },
    status_message: {
        fontSize: 20,
        color: "#ffffffcc",
        fontFamily: "monospace",
        textAlign: "center",
        marginBottom: 20,
    },
    button_home: {
        backgroundColor: "#4e8cff",
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginVertical: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ffffff33",
        shadowColor: "#4e8cff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 8,
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
});
