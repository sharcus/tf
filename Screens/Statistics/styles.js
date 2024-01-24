import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    margin: 10,
  },
  checkboxParent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headerPanel: {
    display: "flex",
    flexDirection: "row",
  },
  buttonPanel: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    paddingBottom: 26,
  },

  button: {
    width: "48%",
  },

  dateLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    flex: 5,
  },
  dateButton: {
    width: 30,
  },
});

export default styles;
