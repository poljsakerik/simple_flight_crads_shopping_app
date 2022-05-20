import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  Select,
  CheckIcon,
  Checkbox,
  Radio,
  ScrollView,
  Button,
  Divider,
  Text,
  FormControl,
  Column,
} from "native-base";
import DatePicker from "../components/DatePicker";
import { addUser } from "./../res/usersSlice";
import { useDispatch } from "react-redux";
import validate from "../src/Validate";
import handleUser from "../src/UserHandler";
import { calculatePrice } from "../src/UserHandler";
import { valiDate } from "../src/Validate";

export default function AddPassenger({ navigation }) {
  const [destination, setDestination] = useState(null);
  const [twoWayFlight, setTwoWayFlight] = useState(false);
  const [leaveFlightClass, setLeaveFlightClass] = useState(null);
  const [returnFlightClass, setReturnFlightClass] = useState(null);
  const [leaveDay, setleaveDay] = useState(null);
  const [leaveMonth, setLeaveMonth] = useState(null);
  const [leaveYear, setLeaveYear] = useState(null);
  const [returnDay, setReturnDay] = useState(null);
  const [returnMonth, setReturnMonth] = useState(null);
  const [returnYear, setReturnYear] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState(0);
  const [warnMsg, setWarnMsg] = useState(null);
  const [showWarnings, setShowWarnings] = useState(false);
  const [validLeaveDate, setValidLeaveDate] = useState(false);
  const [validReturnDate, setValidReturnDate] = useState(false);

  const dispatch = useDispatch();

  function onAddUser() {
    setShowWarnings(true);
    let isItValid = validate(
      destination,
      twoWayFlight,
      leaveFlightClass,
      returnFlightClass,
      leaveDay,
      leaveMonth,
      leaveYear,
      returnDay,
      returnMonth,
      returnYear,
      name,
      surname,
      age
    );
    if (isItValid.valid) {
      dispatch(
        addUser(
          handleUser(
            destination,
            name,
            surname,
            price,
            leaveDay,
            leaveMonth,
            leaveYear,
            leaveFlightClass,
            returnDay,
            returnMonth,
            returnYear,
            returnFlightClass
          )
        )
      );
      navigation.navigate("HomeScreen");
    } else {
      setWarnMsg(isItValid.message);
    }
  }

  useEffect(() => {
    setPrice(
      calculatePrice(
        age,
        destination,
        leaveFlightClass,
        returnFlightClass,
        twoWayFlight
      )
    );
  }, [destination, age, leaveFlightClass, returnFlightClass, twoWayFlight]);

  useEffect(() => {
    setValidLeaveDate(valiDate(leaveDay, leaveMonth, leaveYear).valid);
  }, [leaveDay, leaveMonth, leaveYear]);

  useEffect(() => {
    setValidReturnDate(valiDate(returnDay, returnMonth, returnYear).valid);
  }, [returnDay, returnMonth, returnYear]);

  return (
    <ScrollView w={"100%"} h={"100%"} bgColor={"white"} p={"5"}>
      <Column space={4}>
        <Heading>Destinacija:</Heading>
        <FormControl isInvalid={showWarnings && destination === null}>
          <Select
            selectedValue={destination}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Izberi destinacijo"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => setDestination(itemValue)}
          >
            <Select.Item label="Pariz, 40 €" value="PA" />
            <Select.Item label="Dunaj, 30 €" value="DU" />
            <Select.Item label="Rim 40, €" value="RM" />
            <Select.Item label="Madrid, 60 €" value="MR" />
            <Select.Item label="Helsinki, 70 €" value="HL" />
            <Select.Item label="Los Angeles, 230 €" value="LA" />
            <Select.Item label="Washington, 150 €" value="WA" />
            <Select.Item label="Seattle, 260 €" value="ST" />
            <Select.Item label="Rio de Janeiro, 180 €" value="RJ" />
            <Select.Item label="Lima, 200 €" value="LI" />
          </Select>
          <FormControl.ErrorMessage>
            Izberi destinacijo
          </FormControl.ErrorMessage>
        </FormControl>

        <Checkbox
          value={twoWayFlight}
          onChange={(v) => {
            setTwoWayFlight(v);
          }}
        >
          Vrnitev
        </Checkbox>

        <Heading>Razred leta (odhod):</Heading>
        <FormControl isInvalid={showWarnings && leaveFlightClass === null}>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="Pick your favorite number"
            onChange={(v) => {
              setLeaveFlightClass(v);
            }}
          >
            <Radio my="2" value="1">
              Prvi
            </Radio>
            <Radio my="2" value="2">
              Poslovni
            </Radio>
            <Radio my="2" value="3">
              Ekonomski
            </Radio>
          </Radio.Group>
          <FormControl.ErrorMessage>Izberi razred</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={showWarnings && !validLeaveDate}>
          <DatePicker
            title={"Datum odhoda:"}
            setDay={setleaveDay}
            setMonth={setLeaveMonth}
            setYear={setLeaveYear}
          />
          <FormControl.ErrorMessage>Nepravilen datum</FormControl.ErrorMessage>
        </FormControl>

        {twoWayFlight && (
          <Column space={4}>
            <Heading>Razred leta (vrnitev):</Heading>
            <FormControl isInvalid={showWarnings && returnFlightClass === null}>
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="Pick your favorite number"
                onChange={(v) => {
                  setReturnFlightClass(v);
                }}
              >
                <Radio my="2" value="1">
                  Prvi
                </Radio>
                <Radio my="2" value="2">
                  Poslovni
                </Radio>
                <Radio my="2" value="3">
                  Ekonomski
                </Radio>
              </Radio.Group>
              <FormControl.ErrorMessage>Izberi razred</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={showWarnings && !validReturnDate}>
              <DatePicker
                title={"Datum vrnitve:"}
                setDay={setReturnDay}
                setMonth={setReturnMonth}
                setYear={setReturnYear}
              />
              <FormControl.ErrorMessage>
                Nepravilen datum
              </FormControl.ErrorMessage>
            </FormControl>
          </Column>
        )}

        <Heading>Ime:</Heading>
        <FormControl isInvalid={showWarnings && name === ""}>
          <Input
            placeholder="Vnesi ime"
            w="100%"
            regular
            clearButtonMode="always"
            onChangeText={(t) => setName(t)}
            _focus={{ borderColor: "brand.lightPurple" }}
          />
          <FormControl.ErrorMessage>Nepravilno ime</FormControl.ErrorMessage>
        </FormControl>
        <Heading>Priimek:</Heading>
        <FormControl isInvalid={showWarnings && surname === ""}>
          <Input
            placeholder="Vnesi priimek"
            w="100%"
            onChangeText={(t) => setSurname(t)}
          />
          <FormControl.ErrorMessage>
            Nepravilen priimek
          </FormControl.ErrorMessage>
        </FormControl>
        <Heading>Starost:</Heading>
        <FormControl isInvalid={showWarnings && age === ""}>
          <Input
            placeholder="Vnesi starost"
            w="100%"
            onChangeText={(t) => setAge(t)}
          />
          <FormControl.ErrorMessage>
            Nepravilna starost
          </FormControl.ErrorMessage>
        </FormControl>
        <Divider />
        {warnMsg === null || (
          <Text color={"brand.lightRed"} my={3}>
            {warnMsg}
          </Text>
        )}
        <Flex
          flexDirection={"row"}
          justifyContent="space-between"
          alignContent="center"
          pb={20}
        >
          <Flex flexDirection={"row"} alignContent={"center"}>
            <Heading>Cena: </Heading>
            <Heading>{price} €</Heading>
          </Flex>
          <Button
            backgroundColor={"brand.darkYellow"}
            alignSelf="flex-end"
            onPress={() => onAddUser()}
          >
            Dodaj
          </Button>
        </Flex>
      </Column>
    </ScrollView>
  );
}
