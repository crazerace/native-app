import AsyncStorage from '@react-native-community/async-storage';
import uuid from "uuid/v4";

import log, { ConsoleHandler, HttploggerHandler, level } from "@czarsimon/remotelogger";
import {
  DEV_MODE,
  APP_NAME,
  APP_VERSION,
  CLIENT_ID_KEY,
  USER_ID_KEY,
  RENEW_TOKEN_KEY
} from "../constants";
import { createApiUrl } from "../service/api";
import { Client } from '../types';
import { initHttpclient } from '@src/api/httpclient';

function initLogAndHttpclient(client: Client) {
  const consoleLevel = DEV_MODE ? level.DEBUG : level.ERROR;
  const httpLevel = DEV_MODE ? level.DEBUG : level.INFO;
  const handlers = {
    console: new ConsoleHandler(consoleLevel),
    httplogger: new HttploggerHandler(httpLevel, {
      url: createApiUrl("/httplogger/v1/logs"),
      app: APP_NAME,
      version: APP_VERSION,
      sessionId: client.sessionId,
      clientId: client.id,
    }),
  };

  initHttpclient(client, handlers);
  log.configure(handlers);
};

async function getClientInfo(): Promise<Client> {
  const clientId = await getOrCreateId(CLIENT_ID_KEY);
  // await logout();
  return {
    id: clientId,
    sessionId: uuid()
  };
};

async function logout() {
  console.log("before AsyncStorage.multiRemove");
  await AsyncStorage.multiRemove([USER_ID_KEY, RENEW_TOKEN_KEY]);
  console.log("after AsyncStorage.multiRemove");
}

async function getOrCreateId(key: string): Promise<string> {
  const newId = uuid();
  try {
    const id = await AsyncStorage.getItem(key);
    if (id) {
      return id;
    }

    await AsyncStorage.setItem(key, newId);
    return newId;
  } catch (error) {
    console.log(error);
    return newId;
  }
}

export {
  getClientInfo,
  initLogAndHttpclient
};
