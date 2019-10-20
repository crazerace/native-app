import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import SignIn from "./signin";
import MainMenuContainer from "./mainMenu";
import AuthLoader from "./authLoader/";
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
  SignIn
});

const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AuthLoader,
  },
  {
    initialRouteName: "AuthLoader"
  }
);

export default createAppContainer(AppNavigator);
