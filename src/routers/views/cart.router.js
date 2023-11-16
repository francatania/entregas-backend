import { Router } from 'express';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { error } from 'console';
import cartModel from '../../models/cart.model.js';


const router = Router();

router.get('/cart/:cid', async (req, res)=>{
    const id = req.params.cid;
    try {
        const cart = await cartModel.findById(id).populate('products.product');
        const productsCart = cart.products;
        console.log(productsCart);
        res.render('cart', {productsCart}); 
    } catch (error) {
        res.status(400).json({message:"Hubo un error al tratar de leer el carrito", error: error.message})
    }

})


export default router;