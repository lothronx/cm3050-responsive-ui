import { Text, View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient colors={["#f6c6d0", "#e4a7b4", "#b6d0e2"]} style={styles.container}>
      <View style={styles.board}>
        {/* The board is a 3x3 grid of cells */}
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
                style={[
                  styles.cell,
                  {
                    /* Draw inner vertical borders only. Do not draw outer vertical borders. */
                    borderRightWidth: j < row.length - 1 ? borderWidth : 0,
                  },
                ]}>
                <Text
                  style={[
                    styles.cellText,
                    {
                      /* The text size is dynamic based on the cell width */
                      fontSize: fontSize,
                      /* X is red, O is blue */
                      color: cell === "X" ? "salmon" : "lightsteelblue",
                    },
                  ]}>
                  {cell}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    width: "90%",
    aspectRatio: 1, // The board is a square
    padding: "5%",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  row: {
    flex: 1, // Each row is of equal height
    flexDirection: "row",
    borderColor: "dimgray",
  },
  cell: {
    flex: 1, // Each cell is of equal width
    // Center the text
    justifyContent: "center",
    alignItems: "center",
    borderColor: "dimgray",
  },
  cellText: {
    fontWeight: "900",
    textAlign: "center",
    textAlignVertical: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
