import bcrypt from 'bcrypt';

export async function hashPass(password) {
    return await bcrypt.hash(password, 10);
}

export async function verifyPass(pass, hash) {
    return await bcrypt.compare(pass, hash);
}
