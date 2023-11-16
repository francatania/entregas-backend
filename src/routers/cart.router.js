import { Router } from 'express';
import cartModel from '../models/cart.model.js';

const router = Router();

router.post('/cart', async (req, res)=>{
    try {
        await cartModel.create({});
        res.status(201).json({message:"carrito creado"})
    } catch (error) {
        res.status(404).json({message:`hubo un error, ${error.message}`, error: error.message})

    }
     
})


router.get('/cart/:cid', async (req, res)=>{
    const id = req.params.cid;
    try {
        const cart = await cartModel.findById(id).populate('products.product');
        res.status(200).json({products: cart.products});  
    } catch (error) {
        res.status(400).json({message:"Hubo un error al tratar de leer el carrito", error: error.message})
    }

})

router.put('/cart/:cid', async (req, res)=>{
    const cid = req.params.cid;
    console.log(cid)
    const {body} = req;
    const pid = body.product;
    try {   
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        const index = cart.products.findIndex(p => p.product == pid);
        if(index === -1){
            cart.products.push(body);
            cart.save();
            res.status(200).json({message:"Carrito actualizado", cart})
        }else{
            cart.products[index].quantity += 1;
            cart.save();
            res.status(200).json({message:"Carrito actualizado", cart})
        }

    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.put('/cart/:cid/products/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const {body} = req;
    const cantidad = body.cantidad;
    try {   
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const index = cart.products.findIndex(p => p.product == pid);
        if(index === -1){
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        cart.products[index].quantity += cantidad;
        cart.save();
        res.status(200).json({message:"Carrito actualizado", cart})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.delete('/cart/:cid/products/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const index = cart.products.findIndex(p => p.product == pid);
        if(index === -1){
            return res.status(404).json({ message: "Producto no encontrado" });
        }else{
            cart.products.splice(index,1);
            cart.save();
            return res.status(200).json({message: `producto con id ${pid} eliminado`})
        }

    } catch (error) {
        
    }
})

router.delete('/cart/:cid', async (req, res)=>{
    const cid = req.params.cid;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        cart.products.splice(0, cart.products.length);
        cart.save();
        return res.status(200).json({message: "Productos eliminados"});
    } catch (error) {
        return res.status(404).json({ message: "Hubo un error", error: error.message });
    }
})

export default router;