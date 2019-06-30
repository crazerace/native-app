import { Thunk } from '../../state';
import * as actions from "./actions";
import * as types from "./types";
import { makeGetRequest, createApiUrl } from "../../service/api";
import { TEXT_GROUP } from '../../constants';

export {
    fetchTexts
};

const fetchTexts = (): Thunk => async dispatch => {
    try {
        const url = createApiUrl(`/textservice/v1/texts/group/${TEXT_GROUP}`);
        const { body, error } = await makeGetRequest<types.TextMap>({ url, useAuth: false });
        if (body) {
            dispatch(actions.add(body));
        } else {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}



