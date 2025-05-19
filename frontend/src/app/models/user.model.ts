export interface User {
    _id: string;
    username: string;
    email: string;
    full_name?: string;
}

export interface Token {
    access_token: string;
    token_type: string;
}