import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddPassenger from "./screens/AddPassenger";
import PaymentDetail from "./screens/PaymentDetail";
import colors from "./res/colors";
import store from "./res/store";
import { Provider } from "react-redux";

export default function App() {
  const newColorTheme = {
    brand: colors,
  };
  const Stack = createNativeStackNavigator();
  const theme = extendTheme({
    colors: newColorTheme,
    components: {
      Radio: { defaultProps: { colorScheme: "purple" } },
      Input: { defaultProps: { _focus: { borderColor: colors.lightPurple } } },
      Checkbox: { defaultProps: { colorScheme: "purple" } },
      Button: { defaultProps: { borderRadius: "xl" } },
    },
  });

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: "Pregledna plošča",
                headerStyle: {
                  backgroundColor: colors.purple,
                },
                headerTitleStyle: {
                  color: "white",
                },
              }}
            />
            <Stack.Screen
              name="AddPassenger"
              component={AddPassenger}
              options={{
                title: "Dodaj potnika",
                headerStyle: {
                  backgroundColor: colors.purple,
                },
                headerTitleStyle: {
                  color: "white",
                },
              }}
            />
            <Stack.Screen
              name="PaymentDetail"
              component={PaymentDetail}
              options={{
                title: "Plačilo",
                headerStyle: {
                  backgroundColor: colors.purple,
                },
                headerTitleStyle: {
                  color: "white",
                },
              }}
            />
          </Stack.Navigator>
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
