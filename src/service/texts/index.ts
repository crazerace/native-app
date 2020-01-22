import log from "@czarsimon/remotelogger";
import { TextsState, TextGetter, TextMap, Optional } from "../../types";
import { TEXT_GROUP } from "../../constants";
import { createApiUrl } from "../api";
import { httpClient } from "../../api/httpclient";

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

export async function fetchTexts(): Promise<Optional<TextMap>> {
  try {
    const url = createApiUrl(`/textservice/v1/texts/group/${TEXT_GROUP}`);
    const { body, error } = await httpClient.get<TextMap>({ url });
    if (body) {
      log.debug("Translated texts loaded");
      return body;
    } else {
      log.error(`failed to fetch traslated text error=[${error}]`);
    }
  } catch (error) {
    log.error(`failed to fetch traslated text error=[${error}]`);
  }
}
