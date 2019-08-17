import AsyncStorage from '@react-native-community/async-storage';
import httpclient from '@czarsimon/httpclient';
import log from '@czarsimon/remotelogger';
import { NewUserRequest, Credentials, RenewRequest, Optional, Thunk, Dispatch, LoginRequest, NavigationCallback } from "@src/types";
import { USER_ID_KEY, RENEW_TOKEN_KEY } from "../../constants";
import { createApiUrl } from "../../service/api";
import { addCredentials, removeCredentials } from "./actions";

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
        log.debug(`Creating new user: ${credentials.username}`);

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
        log.debug(`Logged in user: ${credentials.username}`);

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
        log.debug(`Renewed credentials for user: ${renewRequest.userId}`);

        httpclient.configure({ authToken: body.token });
        await storeCredentials(body);
        dispatch(addCredentials(body));
        callback(true);
    };
};

export const logOut = (callback: () => void): Thunk<void> => {
    return async (dispatch: Dispatch): Promise<void> => {
        const userId = await clearCredentials();
        dispatch(removeCredentials());
        log.debug(`Logged out user: ${userId}`);
        callback();
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

async function clearCredentials(): Promise<string | null> {
    const userId = await AsyncStorage.getItem(USER_ID_KEY);
    AsyncStorage.removeItem(USER_ID_KEY);
    AsyncStorage.removeItem(RENEW_TOKEN_KEY);

    return userId;
};