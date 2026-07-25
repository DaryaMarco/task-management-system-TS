export interface IAuthPayload {
    id: string;
    email: string;
}

export interface ILoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}