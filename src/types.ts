export type Optional<T> = (T | undefined);
export type TextGetter = (key: string) => Optional<string>;

export interface TextMap {
    [key: string]: string;
};

export interface NewUserRequest {
    username: string
    password: string
    repPassword: string
};