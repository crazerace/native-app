import { TextProps, TextGetter, GameState, Optional, Game, Credentials, UserState } from "@src/types";
import { AppState } from ".";
import { translatedText } from "../service/texts";
import { useSelector } from "react-redux";

export function useTexts(): TextGetter {
  return useSelector(textSelector).texts;
}

function textSelector(state: AppState): TextProps {
  return {
    texts: translatedText(state.texts)
  }
}

export function useActiveGame(): Optional<Game> {
  const { loaded, game } = useSelector(gameSelector);
  return (loaded) ?
    game :
    undefined;
}

function gameSelector(state: AppState): GameState {
  return state.game
}

export function useCredentials(): Optional<Credentials> {
    return useSelector(userSelector).credentials;
}

function userSelector(state: AppState): UserState {
    return state.user;
} 