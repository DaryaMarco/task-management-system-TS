export interface IAuthPayload {
    id: string;
    role: "admin" | "user";
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export interface IRefreshResponse {
    accessToken: string;
}