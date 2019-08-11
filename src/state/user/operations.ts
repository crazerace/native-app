import AsyncStorage from '@react-native-community/async-storage';
import httpclient from '@czarsimon/httpclient';
import log from '@czarsimon/remotelogger';
import { NewUserRequest, Credentials, Optional, Thunk, Dispatch } from "@src/types";
import { AUTH_TOKEN_KEY, USER_ID_KEY } from "../../constants";
import { createApiUrl } from "../../service/api";
import { addCredentials } from "./actions";

export const signUp = (user: NewUserRequest): Thunk<void> => {
    return async (dispatch: Dispatch): Promise<void> => {
        const { body: credentials, error, status } = await httpclient.post<Credentials>({
            url: createApiUrl("/userservice/v1/users"),
            useAuth: false,
            body: user
        });

        if (!credentials) {
            handleSignupError(user.username, error, status);
            return;
        } else {
            log.info(`Creating new user: ${user.username}`);
        }

        httpclient.configure({ authToken: credentials.token });
        await storeCredentials(credentials);
        dispatch(addCredentials(credentials));
    }
}

function handleSignupError(username: string, error: Optional<any>, status: number) {
    if (!error) {
        log.debug(`Failed to create user: ${username}. Status: ${status}. Error=undefined`);
        return;
    }

    const { message, requestId } = error;
    log.error(`Failed to create user: ${username}. Error(message=${message}, requestId=${requestId}): Status: ${status}`);
}

async function storeCredentials(credentials: Credentials): Promise<any> {
    const { token, userId } = credentials;
    return Promise.all([
        AsyncStorage.setItem(AUTH_TOKEN_KEY, token),
        AsyncStorage.setItem(USER_ID_KEY, userId)
    ]);
}