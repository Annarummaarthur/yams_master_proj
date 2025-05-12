// app/components/board/grid/grid.component.js

import React, { useEffect, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";

const Grid = () => {

    const socket = useContext(SocketContext);

    const [displayGrid, setDisplayGrid] = useState(true);
    const [canSelectCells, setCanSelectCells] = useState([]);
    const [grid, setGrid] = useState([]);

    const handleSelectCell = (cellId, rowIndex, cellIndex) => {
        if (canSelectCells) {
            socket.emit("game.grid.selected", { cellId, rowIndex, cellIndex });
        }
    };

    useEffect(() => {
        socket.on("game.grid.view-state", (data) => {
            setDisplayGrid(data['displayGrid']);
            setCanSelectCells(data['canSelectCells'])
            setGrid(data['grid']);
        });
    }, []);

    return (
        <View style={styles.gridContainer}>
            {displayGrid &&
                grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => (
                            <TouchableOpacity
                                key={cell.id}
                                style={[
                                    styles.cell,
                                    cell.owner === "player:1" && styles.playerOwnedCell,
                                    cell.owner === "player:2" && styles.opponentOwnedCell,
                                    (cell.canBeChecked && !(cell.owner === "player:1") && !(cell.owner === "player:2")) && styles.canBeCheckedCell,
                                    rowIndex !== 0 && styles.topBorder,
                                    cellIndex !== 0 && styles.leftBorder,
                                ]}
                                onPress={() => handleSelectCell(cell.id, rowIndex, cellIndex)}
                                disabled={!cell.canBeChecked}
                            >
                                <Text style={styles.cellText}>{cell.viewContent}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 20,
    },
    cell: {
        flexDirection: "row",
        flex: 2,
        width: "30%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#4e8cff",
        borderRadius: 8,
        margin: 4,
        backgroundColor: "#333",
        transitionDuration: "200ms",
    },
    row: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    cellText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
        fontFamily: "monospace",
    },
    playerOwnedCell: {
        backgroundColor: "lightgreen",
        opacity: 0.9,
        shadowColor: "green",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    opponentOwnedCell: {
        backgroundColor: "lightcoral",
        opacity: 0.9,
        shadowColor: "red",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    canBeCheckedCell: {
        backgroundColor: "#4e8cff",
        shadowColor: "blue",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    topBorder: {
        borderTopWidth: 2,
        borderColor: "#4e8cff",
    },
    leftBorder: {
        borderLeftWidth: 2,
        borderColor: "#4e8cff",
    },
});

export default Grid;
