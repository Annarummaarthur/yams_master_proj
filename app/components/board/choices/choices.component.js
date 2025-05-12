// app/components/board/choices/choices.component.js

import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";

const Choices = () => {

    const socket = useContext(SocketContext);

    const [displayChoices, setDisplayChoices] = useState(false);
    const [canMakeChoice, setCanMakeChoice] = useState(false);
    const [idSelectedChoice, setIdSelectedChoice] = useState(null);
    const [availableChoices, setAvailableChoices] = useState([]);

    useEffect(() => {
        socket.on("game.choices.view-state", (data) => {
            console.log("Réception des choix :", data);
            setDisplayChoices(data['displayChoices']);
            setCanMakeChoice(data['canMakeChoice']);
            setIdSelectedChoice(data['idSelectedChoice']);
            setAvailableChoices(data['availableChoices']);
        });
    }, []);

    const handleSelectChoice = (choiceId) => {
        if (canMakeChoice) {
            setIdSelectedChoice(choiceId);
            socket.emit("game.choices.selected", { choiceId });
        }
    };

    return (
        <View style={styles.choicesContainer}>
            {displayChoices &&
                availableChoices.map((choice) => (
                    <TouchableOpacity
                        key={choice.id}
                        style={[
                            styles.choiceButton,
                            idSelectedChoice === choice.id && styles.selectedChoice,
                            !canMakeChoice && styles.disabledChoice
                        ]}
                        onPress={() => handleSelectChoice(choice.id)}
                        disabled={!canMakeChoice}
                    >
                        <Text style={styles.choiceText}>{choice.value}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    choicesContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 22,
        backgroundColor: "#1f1f1f",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#4e8cff33",
        marginVertical: 10,
    },
    choiceButton: {
        backgroundColor: "#444",
        borderRadius: 12,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        height: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        transitionDuration: "200ms",
    },
    selectedChoice: {
        backgroundColor: "#4e8cff",
        transform: [{ scale: 1.05 }],
        shadowColor: "#4e8cff",
        shadowOpacity: 0.9,
    },
    choiceText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    disabledChoice: {
        opacity: 0.5,
    },
});

export default Choices;
