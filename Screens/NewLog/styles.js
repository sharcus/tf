import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: "48%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginLeft: 20,
  },
  rowBordered: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    margin: 10,
  },
  dateLabel: {
    fontSize: 26,
    margin: 5,
    paddingBottom: 20,
  },
  dropDown: {
    height: 50,
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "yellow",
  },
  fullLineControl: {
    width: "95%",
    height: 40,
    marginRight: 10,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 6,
    textAlignVertical: "center",
    paddingLeft: 5,
    marginBottom: 20,
    backgroundColor: "white",
  },
  descriptionControl: {
    height: 120,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    width: "95%",
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginRight: 15,
  },
  button: {
    marginTop: 20,
    width: "30%",
  },
});

export default styles;
