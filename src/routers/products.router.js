import { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import passport from 'passport';
import ProductsController from '../controller/products.controller.js';



const __fileName = fileURLToPath(import.meta.url);
const __dirName= dirname(__fileName);


const router = Router();


router.get('/products',passport.authenticate('jwt', {session:false}), async (req, res)=>{
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort;
        const category = req.query.category;
        const status = req.query.status;
        let options = {
            page: page,
            limit: limit,
            sort: sort,
        };

        if(sort === 'desc'){
            options.sort = {price : -1}
        }
        if(sort === 'asc'){
            options.sort = {price : 1}
        }

        let filters = {};

        if(category){
            filters.category = category;
        }
        if(status){
            filters.status = status;
        }


        const products = await ProductsController.getProducts(filters, options);

        const buildResponse = (data) => {
            return {
              status: 'success',
              payload: data.docs.map(student => student.toJSON()),
              totalPages: data.totalPages,
              prevPage: data.prevPage,
              nextPage: data.nextPage,
              page: data.page,
              hasPrevPage: data.hasPrevPage,
              hasNextPage: data.hasNextPage,
              prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}` : '',
              nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}` : '',
            };
          };


        res.status(201).json(buildResponse(products));


    } catch (error) {
        res.status(400).json({message:"Ha ocurrido un error", error: error.message});
    }
})

router.post('/products', async (req, res)=>{

    try {
        const {body} = req;
        const data = body;
        console.log(data)
        await ProductsController.createProducts(data);
        res.status(201).json({message: 'Productos cargados.', products: data})
    } catch (error) {
        res.status(404).json({message:`hubo un error al cargar los products, ${error.message}`, error: error.message})

    }
})

router.post('/product', async (req, res)=>{
    try {
        const {body} = req;
        const data = body;
        await ProductsController.createProduct(data);
        res.status(201).json({message:'Producto creado', product: data});
    } catch (error) {   
        res.status(404).json({message: 'Hubo un error al cargar el producto', error: error.message})
    }
})


router.delete('/products', async (req, res)=>{
    try {
        await ProductsController.deleteProducts();
        res.status(200).json({message: 'Productos eliminados'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

router.delete('/product/:id', async (req, res)=>{
    try {
        const {id} = req.params
        await ProductsController.deleteProductById(id);
        res.status(200).json({message: 'Producto eliminado'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})


export default router;