import cartModel from "../models/cart.model.js";

export default class CartDao{
    static create(){
        return cartModel.create({});
    };

    static getById(id){
        return cartModel.findById(id).populate('products.product');
    };

    static putCartById(cart){
        return cart.save();
    }

    static putProductById(cart){
        return cart.save();
    };

    static deleteProducts(cart){
        return cart.save();
    }
    
    static deleteProduct(cart){
        return cart.save();
    }
}