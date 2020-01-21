import { HttpClient, Fetch } from "@czarsimon/httpclient";
import { Handlers } from "@czarsimon/remotelogger";
import { Client } from '../types';

export let httpClient = new HttpClient({});

export function initHttpclient(client: Client, handlers: Handlers) {
  httpClient = new HttpClient({
    logHandlers: handlers,
    baseHeaders: {
      "X-Client-ID": client.id,
      "X-Session-ID": client.sessionId,
      "Accept-Language": "sv",
    },
    transport: new Fetch(),
  });
}

export function setToken(token: string) {
  setHeader('Authorization', `Bearer ${token}`);
}

export function setHeader(name: string, value: string) {
  const headers = httpClient.getHeaders();
  httpClient.setHeaders({
    ...headers,
    [name]: value,
  })
}
