import PassengerTile from "./../components/PassengerTile";
import css from "./../res/css";
import { useSelector, useDispatch } from "react-redux";
import ListFooter from "../components/ListFooter";
import { Box, FlatList, Flex, Button, Heading } from "native-base";

export default function HomeScreen({ navigation }) {
  const users = useSelector((state) => state.users.users);

  return (
    <Box backgroundColor={"white"} h="100%">
      <FlatList
        _contentContainerStyle={{ px: "10%" }}
        data={users}
        renderItem={({ item }) => {
          return <PassengerTile passanger={item} />;
        }}
        keyExtractor={(item) => item.key}
        ListFooterComponent={<ListFooter navigation={navigation} />}
      ></FlatList>
      <Flex
        flexDirection={"row"}
        justifyContent="space-between"
        alignContent="center"
        p={10}
        mb={2}
      >
        <Flex flexDirection={"row"} alignContent={"center"}>
          <Heading>Cena: </Heading>
          <Heading>
            {users.reduce(
              (previousValue, item) => previousValue + item.price,
              0
            )}{" "}
            €
          </Heading>
        </Flex>
        <Button
          backgroundColor={"brand.darkYellow"}
          alignSelf="flex-end"
          onPress={() => {
            if (
              users.reduce(
                (previousValue, item) => previousValue + item.price,
                0
              ) !== 0
            ) {
              navigation.navigate("PaymentDetail");
            }
          }}
        >
          Plačaj
        </Button>
      </Flex>
    </Box>
  );
}
