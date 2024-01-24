import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
  },
  topPanel: {
    marginLeft: 15,
    marginRight: 15,
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
  newInput: {
    margin: 3,
    padding: 5,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    backgroundColor: "white",
    textDecorationStyle: "solid",
    fontSize: 16,
  },
  title: {
    margin: 3,
    marginTop: 20,
    fontSize: 20,
  },
});

export default styles;
