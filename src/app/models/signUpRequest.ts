export interface SignUpRequest {
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    name: string | null;
}