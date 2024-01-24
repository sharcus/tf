import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerPanel: {
    height: "10%",
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    minHeight: 56,
  },
  itemsPanel: {
    height: "70%",
  },
  bottomPanel: {
    height: "20%",
    backgroundColor: "white",
  },
  button: {
    width: "30%",
  },
  buttonContainer: {
    alignItems: "flex-end",
    marginRight: 5,
  },
  activitiesPanel: {
    paddingTop: 20,
  },
  input: {
    width: "15%",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: "white",
    padding: 5,
    paddingLeft: 10,
  },
  activityRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 5,
    flexDirection: "row",
    borderTopColor: "grey",
    borderTopWidth: 3,
  },
  rowText: {
    fontSize: 18,
    fontWeight: "normal",
    width: "65%",
    padding: 10,
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
    width: "65%",
    padding: 10,
  },
  smallText: {
    width: "15%",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
  },
});

export default styles;
