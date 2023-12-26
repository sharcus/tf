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
    width: "100%",
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
    width: "87%",
  },
  dateButton: {
    width: "5%",
  },
});

export default styles;
