import { User } from "./user";

export interface Opinion {
    opinion_id: number
    opinion: string
    note: number,
    user_id: number,
    parking_id: number,
    user: User
}