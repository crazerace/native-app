import { TextProps } from "@src/types";
import { AppState } from ".";
import { translatedText } from "../service/texts";
import { useSelector } from "react-redux";

export function useTexts(): TextProps {
    return useSelector(textSelector);
}

function textSelector(state: AppState): TextProps {
    return {
        texts: translatedText(state.texts)
    }
}