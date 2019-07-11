// DTO types.

export interface TextMap {
    [key: string]: string;
};

export interface NewUserRequest {
    username: string
    password: string
    repPassword: string
};

export interface LoginRequest {
    username: string
    password: string
    repPassword: string
};

export interface Credentials {
    userId: string
    token: string
};

export interface User {
    id: string
    username: string
    createdAt: string
}

export interface Error {
    errorId: string
    status: number
    message: string
    path: string
    requestId: string
};


// State types

export interface TextsState {
    loaded: boolean,
    data: TextMap
};

export interface ErrorState {
    error?: Error
};

export interface UserState {
    credentials?: Credentials
    user?: User
};


// Utility types

export type Optional<T> = (T | undefined);
export type TextGetter = (key: string) => Optional<string>;