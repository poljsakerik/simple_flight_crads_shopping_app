import { useState } from "react";
import {
  Heading,
  Box,
  Input,
  Flex,
  Button,
  Text,
  FormControl,
} from "native-base";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { validateCard } from "../src/Validate";
import { emptyUsers } from "../res/usersSlice";

export default function PaymentDetail({ navigation }) {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validCard, setValidCard] = useState(false);
  const [warnMesagge, setWarnMesagge] = useState(null);
  const [showWarnings, setShowWarnings] = useState(false);

  const borderWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderWidth: borderWidth.value,
    };
  });

  function handlePayment() {
    let valid = validateCard(name, surname, cardNumber);
    setShowWarnings(true);
    if (valid.valid) {
      setValidCard(true);
      setWarnMesagge("Rezervacija je uspešna");
      dispatch(emptyUsers());
    } else {
      setValidCard(false);
      setWarnMesagge(valid.message);
    }
  }
  return (
    <Animated.View
      style={[
        animatedStyle,
        { width: "100%", height: "100%" },
        validCard ? { borderColor: "#10b981" } : { borderColor: "#ef4444" },
      ]}
    >
      <Box
        px="10"
        alignContent="center"
        justifyContent={"center"}
        flex="1"
        borderColor={
          validCard
            ? "tertiary.500"
            : warnMesagge === null
            ? "white"
            : "red.500"
        }
      >
        <Heading>Ime:</Heading>
        <FormControl isInvalid={showWarnings && name === ""}>
          <Input
            my="3"
            placeholder="Vnesi ime"
            w="100%"
            regular
            clearButtonMode="always"
            onChangeText={(t) => setName(t)}
          />
          <FormControl.ErrorMessage>Vnesite ime</FormControl.ErrorMessage>
        </FormControl>
        <Heading>Priimek:</Heading>
        <FormControl isInvalid={showWarnings && surname === ""}>
          <Input
            my="3"
            placeholder="Vnesi priimek"
            w="100%"
            onChangeText={(t) => setSurname(t)}
          />
          <FormControl.ErrorMessage>Vnesite priimek</FormControl.ErrorMessage>
        </FormControl>
        <Heading>Številka kartice:</Heading>
        <FormControl isInvalid={showWarnings && cardNumber.length !== 16}>
          <Input
            my="3"
            placeholder="Vnesi številko kartice"
            w="100%"
            onChangeText={(t) => setCardNumber(t)}
          />
          <FormControl.ErrorMessage>
            Nepravilna številka kartice
          </FormControl.ErrorMessage>
        </FormControl>
        {warnMesagge === null || (
          <Text mt={"10%"} color={validCard ? "tertiary.600" : "red.500"}>
            {warnMesagge}
          </Text>
        )}
        <Flex
          flexDir={"row"}
          alignContent="center"
          justifyContent={"space-between"}
          mt={"10%"}
        >
          <Heading alignSelf={"center"} m="0">
            {`Skupaj: ${users.reduce(
              (previousValue, item) => previousValue + item.price,
              0
            )} €`}{" "}
          </Heading>
          <Button
            backgroundColor={"brand.darkYellow"}
            alignSelf="flex-end"
            onPress={() => {
              borderWidth.value = withSequence(withSpring(5), withSpring(0));
              handlePayment();
            }}
          >
            Plačaj
          </Button>
        </Flex>
      </Box>
    </Animated.View>
  );
}
