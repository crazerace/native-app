import AsyncStorage from '@react-native-community/async-storage';
import uuid from "uuid/v4";
import httpclient from "@czarsimon/httpclient";
import log from "@czarsimon/remotelogger";
import { DEV_MODE, APP_NAME, APP_VERSION, CLIENT_ID_KEY } from "../constants";
import { createApiUrl } from "../service/api";

interface Client {
    id: string
    sessionId: string
    authToken?: string
    userId?: string
}

function initLogAndHttpclient(client: Client) {
    httpclient.configure({ clientId: client.id });
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
    const clientId = await getOrCreateId(CLIENT_ID_KEY);

    return {
        id: clientId,
        sessionId: uuid()
    }
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