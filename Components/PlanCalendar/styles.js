import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  calenderPanel: {
    flex: 1,
  },
  headerCell: {
    backgroundColor: "#cccccc",
    flex: 1,
    height: 50,
    paddingTop: 20,
    paddingLeft: 20,
  },
  headerLabel: {
    fontWeight: "bold",
  },
  contentCell: {
    backgroundColor: "white",
    flex: 1,
    height: 50,
    paddingTop: 20,
    paddingLeft: 20,
    margin: 1,
  },
  chosenContentCell: {
    backgroundColor: "dodgerblue",
    flex: 1,
    height: 50,
    paddingTop: 20,
    paddingLeft: 20,
    borderRadius: 3,
    margin: 1,
  },
  contentLabel: {
    fontWeight: "normal",
  },
  headerRow: {
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  contentRow: {
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});

export default styles;
