export interface CreatedUser {
    pseudo: string;
    user_name: string;
    firstname: string;
    email: string;
    password?: string;
    password_confirm?: string;
    admin: boolean;
}
