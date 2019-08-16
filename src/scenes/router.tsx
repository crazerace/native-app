import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import SignInScreen from "./signin";
import MainMenuScreen from "./mainMenu";
import AuthLoaderScreen from "./authLoader";
import SettingsContainer from "./settings";

const AppStack = createStackNavigator(
    {
        MainMenu: MainMenuScreen,
        Settings: SettingsContainer
    },
    {
        initialRouteName: "MainMenu"
    }
);

const AuthStack = createStackNavigator({
    SignIn: SignInScreen
});

const AppNavigator = createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
        AuthLoader: AuthLoaderScreen
    },
    {
        initialRouteName: "AuthLoader"
    }
);

export default createAppContainer(AppNavigator);