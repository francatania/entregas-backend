import userModel from "../models/user.model.js";
import { createHash } from '../utils.js';

export default class AuthDao{
    static  create(data){
        const {
            first_name,
            last_name,
            password,
            email, 
        } = data

        return  userModel.create({
            first_name,
            last_name,
            password: createHash(password),
            email, 
        });
    }

    static async find(data){
        const email = data;
        return await userModel.findOne({email});
    }
}