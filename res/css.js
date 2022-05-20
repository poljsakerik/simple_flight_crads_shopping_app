import { StyleSheet } from "react-native";
import colors from "./colors";

const palette = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "10%",
  },
  outterView: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  containerRow: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  passengerTile: {
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: "5%",
    marginVertical: "2%",
    elevation: 4,
    borderColor: colors.lightPurple,
    backgroundColor: "white",
  },
  flatList: {
    paddingHorizontal: "10%",
    backgroundColor: "gray",
  },
  textRegular: {
    fontSize: 20,
    color: "black",
  },
  textLarger: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
});

export default palette;
