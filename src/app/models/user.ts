export interface User {
    user_id: number;
    pseudo: string;
    user_name: string;
    firstname: string;
    email: string;
    password?: string;
    password_confirm?: string;
    admin: boolean;
    is_delete: boolean;
}
