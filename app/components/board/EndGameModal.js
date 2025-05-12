import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

const EndGameModal = ({ visible, finalScore, myPlayerId, idOpponent, onReplay, onQuit }) => {
    if (!finalScore) return null;

    const { winner, loser, player1, player2 } = finalScore;

    const isDraw = winner === 'draw';
    const isWinner = winner === myPlayerId;
    const isLoser = !isDraw && !isWinner;

    const getTitle = () => {
        if (isDraw) return 'Match nul 🤝';
        if (isWinner) return 'Victoire 🏆';
        return 'Défaite 😓';
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{getTitle()}</Text>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>winner : {winner}</Text>
                        <Text style={styles.scoreText}>joueur : {myPlayerId}</Text>
                        <Text style={styles.scoreText}>🟦 Joueur 1 : {player1}</Text>
                        <Text style={styles.scoreText}>🟥 Joueur 2 : {player2}</Text>
                    </View>

                    {!isDraw && (
                        <Text style={styles.resultText}>
                            {winner === 'player:1' ? '🟦' : '🟥'} {winner} a gagné !
                        </Text>
                    )}

                    <View style={styles.buttonGroup}>
                        <Pressable onPress={onReplay} style={styles.buttonReplay}>
                            <Text style={styles.buttonText}>🔄 Rejouer</Text>
                        </Pressable>
                        <Pressable onPress={onQuit} style={styles.buttonQuit}>
                            <Text style={styles.buttonText}>🚪 Quitter</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1e1e2e',
        padding: 24,
        borderRadius: 20,
        width: '85%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    scoreContainer: {
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 20,
        color: '#ffffffcc',
        marginBottom: 5,
    },
    resultText: {
        fontSize: 18,
        color: '#cccccc',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    buttonReplay: {
        backgroundColor: '#4caf50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonQuit: {
        backgroundColor: '#f44336',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default EndGameModal;
