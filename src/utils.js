import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const verifyPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const JWT_SECRET = 'aaEEww2200992k';

export const tokenGenerator = (user)=>{
    const {
        _id: id,
        first_name,
        last_name,
        dni,
        email,
        role,
    } = user;

    const payload = {        
        _id: id,
        first_name,
        last_name,
        dni,
        email,
        role,
    }

    return JWT.sign(payload, JWT_SECRET, {expiresIn: '1m'})
}