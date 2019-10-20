import httpclient from '@czarsimon/httpclient';
import { Response } from '@czarsimon/httpclient/lib/types';
import { NewUserRequest, Credentials, RenewRequest, LoginRequest } from "../types";
import { createApiUrl } from "../service/api";

const USERS_URL = createApiUrl("/userservice/v1/users");
const LOGIN_URL = createApiUrl("/userservice/v1/login");
const RENEW_URL = createApiUrl("/userservice/v1/renew");

export const createNewUser = async (credentials: NewUserRequest): Promise<Response<Credentials>> => (
  httpclient.post<Credentials>({ url: USERS_URL, useAuth: false, body: credentials })
);

export const loginUser = async (credentials: LoginRequest): Promise<Response<Credentials>> => (
  httpclient.post<Credentials>({ url: LOGIN_URL, useAuth: false, body: credentials })
);

export const renewUserToken = async (renewRequest: RenewRequest): Promise<Response<Credentials>> => (
  httpclient.post<Credentials>({ url: RENEW_URL, useAuth: false, body: renewRequest })
);
