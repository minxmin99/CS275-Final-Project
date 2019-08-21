export interface AuthResponse {
    user: {
        id: number,
        name: string,
        email: string,
        access_token: string,
        express_in: number
    }
}
