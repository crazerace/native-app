import AsyncStorage from '@react-native-community/async-storage';
import httpclient from '@czarsimon/httpclient';
import log from '@czarsimon/remotelogger';
import { NewUserRequest, Credentials, RenewRequest, Optional, Thunk, Dispatch, LoginRequest, NavigationCallback } from "@src/types";
import { USER_ID_KEY, RENEW_TOKEN_KEY } from "../../constants";
import { createApiUrl } from "../../service/api";
import { addCredentials } from "./actions";

export const signUp = (credentials: NewUserRequest, callback: NavigationCallback): Thunk<void> => {
    return async (dispatch: Dispatch): Promise<void> => {
        const { body, error, status } = await httpclient.post<Credentials>({
            url: createApiUrl("/userservice/v1/users"),
            useAuth: false,
            body: credentials
        });

        if (!body) {
            handleSignupError(credentials.username, error, status);
            callback(false);
            return;
        }
        log.info(`Creating new user: ${credentials.username}`);

        httpclient.configure({ authToken: body.token });
        await storeCredentials(body);
        dispatch(addCredentials(body));
        callback(true);
    };
};

export const login = (credentials: LoginRequest, callback: NavigationCallback): Thunk<void> => {
    return async (dispatch: Dispatch): Promise<void> => {
        const { body, error, status } = await httpclient.post<Credentials>({
            url: createApiUrl("/userservice/v1/login"),
            useAuth: false,
            body: credentials
        });

        if (!body) {
            handleLoginError(credentials.username, error, status);
            callback(false);
            return;
        }
        log.info(`Logged in user: ${credentials.username}`);

        httpclient.configure({ authToken: body.token });
        await storeCredentials(body);
        dispatch(addCredentials(body));
        callback(true);
    };
};

export const renewToken = (renewRequest: RenewRequest, callback: NavigationCallback): Thunk<void> => {
    return async (dispatch: Dispatch): Promise<void> => {
        const { body, error, status } = await httpclient.post<Credentials>({
            url: createApiUrl("/userservice/v1/renew"),
            useAuth: false,
            body: renewRequest
        });

        if (!body) {
            handleRenewError(renewRequest.userId, error, status);
            callback(false);
            return;
        }
        log.info(`Renewed credentials for user: ${renewRequest.userId}`);

        httpclient.configure({ authToken: body.token });
        await storeCredentials(body);
        dispatch(addCredentials(body));
        callback(true);
    };
};

function handleSignupError(username: string, error: Optional<any>, status: number) {
    if (!error) {
        log.debug(`Failed to create user: ${username}. Status: ${status}. Error=undefined`);
        return;
    }

    const { message, requestId } = error;
    log.error(`Failed to create user: ${username}. Error(message=${message}, requestId=${requestId}): Status: ${status}`);
};

function handleLoginError(username: string, error: Optional<any>, status: number) {
    if (!error) {
        log.debug(`Failed to login user: ${username}. Status: ${status}. Error=undefined`);
        return;
    }

    const { message, requestId } = error;
    log.error(`Failed to login user: ${username}. Error(message=${message}, requestId=${requestId}): Status: ${status}`);
};

function handleRenewError(userId: string, error: Optional<any>, status: number) {
    if (!error) {
        log.debug(`Failed to login user: ${userId}. Status: ${status}. Error=undefined`);
        return;
    }

    const { message, requestId } = error;
    log.error(`Failed to login user: ${userId}. Error(message=${message}, requestId=${requestId}): Status: ${status}`);
};


async function storeCredentials(credentials: Credentials): Promise<any> {
    const { userId, renewToken } = credentials;
    return Promise.all([
        AsyncStorage.setItem(USER_ID_KEY, userId),
        AsyncStorage.setItem(RENEW_TOKEN_KEY, renewToken),
    ]);
};