export const ADD_CREDENTIANLS: string = "crazerace/user/ADD_CREDENTIANLS";

export interface Credentials {
    userId: string
    token: string
};

export interface User {
    id: string
    username: string
    createdAt: string
}