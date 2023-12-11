import AuthDao from "../dao/auth.dao.js";
import {verifyPassword, tokenGenerator } from '../utils.js';

export default class AuthController{
    static async register(data){
        const {
            first_name,
            last_name,
            password,
            email,  
        } = data;

        if(
            !first_name ||
            !last_name ||
            !password ||
            !email 
            ){
            throw new Error('Todos los campos son obligatorios')
        }

        let user =  await AuthDao.find(email);
        if(user){
            throw new Error('El usuario ya existe.')
        }
      
        return await AuthDao.create(data);
    }

    static async login(data){
        const {email, password} = data;
        if(!email || !password){
            throw new Error('Correo o contraseña invalidos.');
        }
        const user = await AuthDao.find(email);
        if(!user){
            throw new Error('Correo o contraseña invalidos.');}

        const isValidPass = verifyPassword(password, user);

        if(!isValidPass){
            throw new Error('Correo o contraseña invalidos.');}
        return tokenGenerator(user);
    }
}