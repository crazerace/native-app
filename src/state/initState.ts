import AsyncStorage from '@react-native-community/async-storage';
import uuid from "uuid/v4";
import httpclient from "@czarsimon/httpclient";
import log from "@czarsimon/remotelogger";
import {
    DEV_MODE,
    APP_NAME,
    APP_VERSION,
    CLIENT_ID_KEY,
    AUTH_TOKEN_KEY,
    USER_ID_KEY
} from "../constants";
import { createApiUrl } from "../service/api";

interface Client {
    id: string
    sessionId: string
    authToken?: string
    userId?: string
}

function initLogAndHttpclient(client: Client) {
    httpclient.configure({ clientId: client.id, authToken: client.authToken });
    log.configure({
        url: createApiUrl("/httplogger/v1/logs"),
        app: APP_NAME,
        version: APP_VERSION,
        sessionId: client.sessionId,
        clientId: client.id,
        DEV_MODE
    });
};

async function getClientInfo(): Promise<Client> {
    const [clientId, authToken, userId] = await Promise.all([
        getOrCreateId(CLIENT_ID_KEY),
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(USER_ID_KEY)
    ]);

    const client = {
        id: clientId,
        sessionId: uuid()
    };

    return (authToken && userId) ?
        { ...client, authToken, userId } :
        client;
};

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