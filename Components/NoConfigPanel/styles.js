import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
  },
  topPanel: {
    flex: 9,
  },
  bottomPanel: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    width: "30%",
  },
  periodLabel: {
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

export default styles;
