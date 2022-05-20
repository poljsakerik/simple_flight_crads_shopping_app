import { Heading, Flex, Input, Box } from "native-base";
import css from "../res/css";

export default function DatePicker({ title, setDay, setMonth, setYear }) {
  return (
    <Box padding={0}>
      <Heading mb={4}>{title}</Heading>
      <Flex flexDirection={"row"} flexWrap="nowrap">
        <Input
          placeholder="Vnesi dan"
          w="24%"
          regular
          clearButtonMode="always"
          onChangeText={(e) => setDay(e)}
        />
        <Input
          placeholder="Vnesi mesec"
          w="24%"
          regular
          clearButtonMode="always"
          ml="2"
          onChangeText={(e) => setMonth(e)}
        />
        <Input
          placeholder="Vnesi leto"
          w="47%"
          ml="2"
          clearButtonMode="always"
          onChangeText={(e) => setYear(e)}
        />
      </Flex>
    </Box>
  );
}
