import { TextProps, TextGetter } from "@src/types";
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