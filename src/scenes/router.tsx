import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import SignInScreen from "./signin";
import MainMenuContainer from "./mainMenu";
import AuthLoaderScreen from "./authLoader";
import SettingsContainer from "./settings";
import GameLobbyContainer from "./gameLobby";

const AppStack = createStackNavigator(
    {
        MainMenu: MainMenuContainer,
        Settings: SettingsContainer,
        GameLobby: GameLobbyContainer,
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