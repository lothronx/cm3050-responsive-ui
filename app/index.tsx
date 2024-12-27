import { Text, View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useState } from "react";

export default function Index() {
  // The noughts and crosses board text
  const noughtsAndCrosses = [
    ["O", "O", "X"],
    ["X", "O", "O"],
    ["X", "X", "O"],
  ];

  // The border width
  const borderWidth = 4;

  // The dynamic text size based on the cell width. The larger the cell, the larger the text.
  const [fontSize, setFontSize] = useState(0);
  const onCellLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setFontSize(width * 0.65); // The font size is 65% of the cell width
  };

  return (
    <View style={styles.container}>
      {/* The board is a 3x3 grid of cells. */}
      <View style={styles.board}>
        {noughtsAndCrosses.map((row, i) => (
          <View
            key={i}
            style={[
              styles.row,
              /* Draw inner horizontal borders only. Do not draw outer horizontal borders. */
              { borderBottomWidth: i < noughtsAndCrosses.length - 1 ? borderWidth : 0 },
            ]}>
            {row.map((cell, j) => (
              <View
                key={j}
                onLayout={onCellLayout}
                /* Draw inner vertical borders only. Do not draw outer vertical borders. */
                style={[styles.cell, { borderRightWidth: j < row.length - 1 ? borderWidth : 0 }]}>
                {/* Dynamically set the font size based on the cell width. */}
                <Text style={[styles.cellText, { fontSize: fontSize }]}>{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  board: {
    width: "100%",
    aspectRatio: 1, // The board is a square
    padding: "10%",
    flexDirection: "column",
  },
  row: {
    flex: 1, // Each row is of equal height
    flexDirection: "row",
  },
  cell: {
    flex: 1, // Each cell is of equal width
    // Center the text
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 68, // The fallback font size is 68
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
