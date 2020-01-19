import { Response } from '@czarsimon/httpclient';
import { httpClient } from './httpclient';
import { Error, NewUserRequest, Credentials, RenewRequest, LoginRequest } from "../types";
import { createApiUrl } from "../service/api";

const USERS_URL = createApiUrl("/userservice/v1/users");
const LOGIN_URL = createApiUrl("/userservice/v1/login");
const RENEW_URL = createApiUrl("/userservice/v1/renew");

export const createNewUser = async (credentials: NewUserRequest): Promise<Response<Credentials, Error>> => (
  httpClient.post<Credentials, Error>({ url: USERS_URL, body: credentials })
);

export const loginUser = async (credentials: LoginRequest): Promise<Response<Credentials, Error>> => (
  httpClient.post<Credentials, Error>({ url: LOGIN_URL, body: credentials })
);

export const renewUserToken = async (renewRequest: RenewRequest): Promise<Response<Credentials, Error>> => (
  httpClient.post<Credentials, Error>({ url: RENEW_URL, body: renewRequest })
);
