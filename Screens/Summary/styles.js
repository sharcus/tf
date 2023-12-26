import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  mainContent: {
    flex: 9,
    width: "100%",
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
    marginTop: 5,
  },
  dateButton: {
    width: "5%",
  },
});

export default styles;
