import { Box, Text, Heading, Flex, CloseIcon, IconButton } from "native-base";
import { useDispatch } from "react-redux";
import { deleteUser } from "./../res/usersSlice";

export default function PassengerTile({ passanger }) {
  const dispatch = useDispatch();
  return (
    <Box
      p="5%"
      borderWidth={3}
      borderColor={"brand.lightPurple"}
      borderRadius="xl"
      mt={5}
      backgroundColor="white"
    >
      <Flex
        flexDirection={"row"}
        justifyContent="space-between"
        alignContent={"center"}
      >
        <Heading
          fontSize={"2xl"}
        >{`${passanger.name} ${passanger.surname}`}</Heading>
        <IconButton
          p={0}
          icon={<CloseIcon />}
          borderRadius={"full"}
          _icon={{
            color: "red.500",
            size: "xl",
          }}
          _pressed={{ bg: "red.500:alpha.20" }}
          onPress={() => {
            dispatch(deleteUser(passanger.key));
          }}
        />
      </Flex>
      <Text>{`Destinacija: ${passanger.destination}`}</Text>
      <Text>{`Odhod: ${passanger.leaveDate}, ${passanger.leaveFlightClass} razred`}</Text>
      {passanger.returnDate !== null && (
        <Text>{`Vrnitev: ${passanger.returnDate}, ${passanger.returnFlightClass} razred`}</Text>
      )}
      <Heading fontSize={"xl"}>{`${passanger.price} €`}</Heading>
    </Box>
  );
}
