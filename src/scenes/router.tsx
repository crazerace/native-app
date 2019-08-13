import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import SignInScreen from "./signin";
import MainMenuScreen from "./mainMenu";

const AppStack = createStackNavigator({ MainMenu: MainMenuScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppNavigator = createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: "Auth"
    }
);

export default createAppContainer(AppNavigator);