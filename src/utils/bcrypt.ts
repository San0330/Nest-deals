import * as bcrypt from 'bcrypt'

export function encodePassword(password: string) {
    return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}
