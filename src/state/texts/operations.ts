import { Dispatch } from 'redux';
import httpclient from "@czarsimon/httpclient";
import log from "@czarsimon/remotelogger";
import { Thunk } from '../../state';
import * as actions from "./actions";
import * as types from "./types";
import { createApiUrl } from "../../service/api";
import { TEXT_GROUP } from '../../constants';

export {
    fetchTexts, addTexts
};

const addTexts = actions.add;

async function fetchTexts(): Promise<(types.TextMap | undefined)> {
    try {
        const url = createApiUrl(`/textservice/v1/texts/group/${TEXT_GROUP}`);
        const { body, error } = await httpclient.get<types.TextMap>({ url, useAuth: false });
        if (body) {
            log.info("Translated texts loaded");
            return body;
        } else {
            const errorMessage = (error) ? error.message : "No body returned for translated texts";
            log.error(errorMessage);
        }
    } catch (error) {
        log.error(error.message);
    }
}

