import log from "@czarsimon/remotelogger";
import { TextsState } from "../../state/texts";
import { TextGetter } from "../../types";

export function translatedText(texts: TextsState): TextGetter {
    return function (key: string): (string | undefined) {
        if (!texts.loaded) {
            return undefined;
        }

        const text = texts.data[key];
        if (!text) {
            log.error(`Could not find text key: ${key}`);
        }

        return text;
    };
};
