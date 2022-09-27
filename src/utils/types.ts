import { UserEntity } from "../typeorm";

export type AuthenticatedRequest = typeof Request & {
    user: UserEntity
}

export type UserCredentials = {
    email: string;
    password: string;
}
