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
    display: "flex",
    flexDirection: "row",
  },
  buttonPanel: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    paddingBottom: 26,
    justifyContent: "flex-end",
    marginRight: 15,
  },

  button: {
    width: "30%",
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
