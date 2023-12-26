import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  headerLabel: {
    fontSize: 22,
    color: "dodgerblue",
    marginLeft: 20,
    marginBottom: 10,
  },
  activityTable: {
    margin: 10,
    borderColor: "#eeeeff",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 5,
    height: "63%",
  },
  activityLine: {
    display: "flex",
    flexDirection: "row",
  },
  activityLabel: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "normal",
    width: "50%",
  },
  activityText: {
    fontSize: 18,
    fontWeight: "bold",
    width: "30%",
  },
});

export default styles;
