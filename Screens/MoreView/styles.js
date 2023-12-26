import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainPanel: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  compositeRow: {
    display: "flex",
    flexDirection: "column",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 6,
    height: 60,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "white",
  },
  borderlesRow: {
    display: "flex",
    flexDirection: "row",
    height: 40,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    backgroundColor: "dodgerblue",
  },
  dateCell: {
    width: "25%",
    padding: 5,
  },
  typeCell: {
    width: "30%",
    padding: 5,
  },
  durationCell: {
    width: "25%",
    padding: 5,
  },
  buttonCell: {
    width: "10%",
  },
  descriptionCell: {
    marginRight: 20,
    fontSize: 8,
  },
  headerTableText: {
    fontWeight: "bold",
    backgroundColor: "dodgerblue",
    color: "white",
  },
  cellText: {
    fontWeight: "normal",
  },
  descriptionText: {
    fontSize: 10,
    marginLeft: 30,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  headerLabel: {
    fontSize: 22,
    color: "dodgerblue",
    marginLeft: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "dodgerblue",
  },
});

export default styles;
