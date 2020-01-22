import AsyncStorage from '@react-native-community/async-storage';
import log from '@czarsimon/remotelogger';
import { NewUserRequest, Credentials, RenewRequest, Optional, Thunk, Dispatch, LoginRequest, NavigationCallback } from "@src/types";
import { USER_ID_KEY, RENEW_TOKEN_KEY } from "../../constants";
import { addCredentials, removeCredentials } from "./actions";
import { createNewUser, loginUser, renewUserToken } from '../../api';
import { setToken } from '../../api/httpclient';
import { ResponseMetadata } from '@czarsimon/httpclient';

export const signUp = (credentials: NewUserRequest, callback: NavigationCallback): Thunk<void> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const { body, error, metadata } = await createNewUser(credentials);
    if (!body) {
      handleSignupError(credentials.username, error, metadata);
      callback(false);
      return;
    }
    log.debug(`Successfully created new user: ${credentials.username}`);

    setToken(body.token);
    await storeCredentials(body);
    dispatch(addCredentials(body));
    callback(true);
  };
};

export const login = (credentials: LoginRequest, callback: NavigationCallback): Thunk<void> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const { body, error, metadata } = await loginUser(credentials);
    if (!body) {
      handleLoginError(credentials.username, error, metadata);
      callback(false);
      return;
    }
    log.debug(`Logged in user: ${credentials.username}`);

    setToken(body.token);
    await storeCredentials(body);
    dispatch(addCredentials(body));
    callback(true);
  };
};

export const renewToken = (renewRequest: RenewRequest, callback: NavigationCallback): Thunk<void> => {
  return async (dispatch: Dispatch): Promise<void> => {
    const { body, error, metadata } = await renewUserToken(renewRequest);
    if (!body) {
      handleRenewError(renewRequest.userId, error, metadata);
      callback(false);
      return;
    }
    log.debug(`Renewed credentials for user: ${renewRequest.userId}`);

    setToken(body.token);
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

function handleSignupError(username: string, error: Optional<Error>, metadata: ResponseMetadata) {
  logError(`Failed to create user. username=${username}`, error, metadata);
};

function handleLoginError(username: string, error: Optional<Error>, metadata: ResponseMetadata) {
  logError(`Failed to login user. username=${username}`, error, metadata);
};

function handleRenewError(userId: string, error: Optional<Error>, metadata: ResponseMetadata) {
  logError(`Failed to login user. userId=${userId}`, error, metadata);
};

function logError(messge: string, error: Optional<Error>, metadata: ResponseMetadata) {
  const { requestId, status } = metadata;
  const errorDescription = error ? `error=[${error}]` : `error=[undefined]`;
  log.error(`${messge} Error(${errorDescription}, requestId=${requestId}): Status: ${status}`);
}


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
