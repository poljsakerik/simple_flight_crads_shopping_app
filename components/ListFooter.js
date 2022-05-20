import { View } from "react-native";
import { IconButton, AddIcon, Text } from "native-base";
import { useSelector } from "react-redux";

export default function ListFooter({ navigation }) {
  const users = useSelector((state) => state.users.users);
  return (
    <View style={users.length === 0 ? { marginTop: "50%" } : {}}>
      <IconButton
        icon={<AddIcon />}
        borderRadius={"full"}
        _icon={{
          color: "brand.lightPurple",
          size: "2xl",
        }}
        _pressed={{ bg: "brand.lightPurple:alpha.20" }}
        onPress={() => {
          navigation.navigate("AddPassenger");
        }}
      />
      <Text alignSelf={"center"} color="brand.lightPurple" fontSize={"xs"}>
        Dodaj potnika
      </Text>
    </View>
  );
}
