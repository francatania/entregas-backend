import CartDao from "../dao/cart.dao.js";

export default class CartController{
    static createCart(){
        return CartDao.create({});
    }

    static getCart(id){
        return CartDao.getById(id);
    }

    static async putCartById(cid, pid, body){
        try {   
            const cart = await CartDao.getById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado.')
            }
            const index = cart.products.findIndex(item => item.product._id.toString() === pid);
            if(index === -1){
                cart.products.push(body);
                return await CartDao.putCartById(cart);
            }else{
                cart.products[index].quantity += 1;
                return await CartDao.putCartById(cart);
            }
    
        } catch (error) {
            throw new Error(error.message);            
        }
    }

    static async putProductById(cid, pid, cantidad){
        try {   
            const cart = await CartDao.getById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado.')
            }
            const index = cart.products.findIndex(item => item.product._id.toString() === pid);
            if(index === -1){
                throw new Error('Producto no encontrado.')            
            }
            cart.products[index].quantity += cantidad;
            return await CartDao.putProductById(cart);
        } catch (error) {
            throw new Error(error.message);        
        }
    }

    static async deleteProduct(cid, pid){
        try {
            const cart = await CartDao.getById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado.')
            }
    
            const index = cart.products.findIndex(item => item.product._id.toString() === pid);
            if(index === -1){
                throw new Error('Producto no encontrado.')
            }else{
                cart.products.splice(index,1);
                return await CartDao.deleteProduct(cart);
            }
    
        } catch (error) {
            throw new Error(error.message);     
        }
    }

    static async deleteProducts(cid){
        try {
            const cart = await CartDao.getById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado')    
            }
            cart.products.splice(0, cart.products.length);
            return CartDao.deleteProducts(cart);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}