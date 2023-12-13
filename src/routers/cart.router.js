import { Router } from 'express';
import cartModel from '../models/cart.model.js';
import CartDao from '../dao/cart.dao.js';
import CartController from '../controller/cart.controller.js';

const router = Router();

router.post('/cart', async (req, res)=>{
    try {
        await CartController.createCart();
        res.status(201).json({message:"carrito creado"})
    } catch (error) {
        res.status(404).json({message:`hubo un error, ${error.message}`, error: error.message})
    }
})

router.get('/cart/:cid', async (req, res)=>{
    const id = req.params.cid;
    try {
        const cart = await CartController.getCart(id);
        res.status(200).json({products: cart.products});  
    } catch (error) {
        res.status(400).json({message:"Hubo un error al tratar de leer el carrito", error: error.message})
    }

})

router.put('/cart/:cid', async (req, res)=>{
    const cid = req.params.cid;
    const {body} = req;
    const pid = body.product;
    try {   
        await CartController.putCartById(cid, pid, body);
        console.log('probando')
        res.status(200).json({message:"Carrito actualizado"})
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
        await CartController.putProductById(cid, pid, cantidad);
        res.status(200).json({message:"Carrito actualizado"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.delete('/cart/:cid/products/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        await CartController.deleteProduct(cid, pid);
        res.status(200).json({message: `producto con id ${pid} eliminado`})
    } catch (error) {
        res.status(404).json(error.message);
    }
})

router.delete('/cart/:cid', async (req, res)=>{
    const cid = req.params.cid;

    try {
        await CartController.deleteProducts(cid);
        res.status(200).json({message: "Productos eliminados"});
    } catch (error) {
        res.status(404).json({ message: "Hubo un error", error: error.message });
    }
})

export default router;