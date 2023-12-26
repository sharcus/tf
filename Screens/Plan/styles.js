import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: "30%",
  },
  input: {
    width: 200,
    height: 32,
    backgroundColor: "white",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 6,
    fontWeight: "bold",
    paddingStart: 5,
  },
  inputLabel: {
    width: 200,
    textAlign: "right",
    paddingRight: 20,
    marginTop: 5,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    margin: 3,
  },
  inputPanel: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default styles;
