import { Request } from "express";

export interface UserPayload {
    id: number;
    email: string;
    role: string;
}

export interface UserRequest extends Request {
    user: UserPayload;
}
