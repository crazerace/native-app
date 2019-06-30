import uuid from 'uuid/v4';
import axios, { AxiosError, Method } from 'axios';
import {
    BACKEND_URL,
    TIMEOUT_MS,
    RETRY_DELAY_MS
} from '../../constants';

export {
    createApiUrl,
    makeGetRequest,
    makePostRequest,
    makePutRequest,
    makeDeleteRequest
};

const SERVICE_UNAVAILABLE: number = 503

export interface APIOptions {
    url: string,
    useAuth: boolean,
    method?: Method,
    body?: any,
    headers?: Headers,
    timeout?: number
};

export interface APIResponse<T = any> {
    body?: T,
    error?: APIError,
    status: number
};

export interface APIError {
    errorId?: string,
    status: number,
    message: string,
    path: string,
    requestId: string,
};

function createApiUrl(route: string): string {
    return `${BACKEND_URL}${route}`
};

function makeGetRequest<T>(opts: APIOptions): Promise<APIResponse<T>> {
    return makeRequest<T>({ ...opts, method: "get" });
};

function makePostRequest<T>(opts: APIOptions): Promise<APIResponse<T>> {
    return makeRequest<T>({ ...opts, method: "post" });
};

function makePutRequest<T>(opts: APIOptions): Promise<APIResponse<T>> {
    return makeRequest<T>({ ...opts, method: "put" });
};

function makeDeleteRequest<T>(opts: APIOptions): Promise<APIResponse<T>> {
    return makeRequest<T>({ ...opts, method: "delete" });
};

async function makeRequest<T>(opts: APIOptions): Promise<APIResponse<T>> {
    const { url, useAuth, method = "get", body, headers, timeout = TIMEOUT_MS } = opts;
    const requestHeaders = (headers) ? headers : createHeaders(useAuth);
    try {
        const { data, status } = await axios({
            method,
            url,
            timeout,
            data: body,
            headers: requestHeaders
        });
        return { body: data, error: undefined, status }
    } catch (error) {
        const err = formatAxiosError(error, opts);
        console.log("APIError: ", err);
        return { body: undefined, error: err, status: err.status }
    }
}

function formatAxiosError(error: AxiosError<APIError>, opts: APIOptions): APIError {
    if (error.response) {
        return error.response.data
    }

    return {
        status: SERVICE_UNAVAILABLE,
        message: `No response: method=${opts.method} url=${opts.url} axiosErrorCode=${error.code}`,
        path: opts.url,
        requestId: error.config.headers["X-Request-ID"]
    }
}

interface Headers {
    [name: string]: string
}

function createHeaders(useAuth: boolean = true): Headers {
    const baseHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "sv",
        "X-Request-ID": uuid(),
    };

    return baseHeaders;
};

