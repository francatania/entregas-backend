import { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsModel from '../models/products.model.js';
import mongoose from 'mongoose';


const __fileName = fileURLToPath(import.meta.url);
const __dirName= dirname(__fileName);


const router = Router();


router.get('/products', async (req, res)=>{
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


        const products = await productsModel.paginate(filters, options);

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
        await productsModel.insertMany(data);
        res.status(201).json({message: 'Productos cargados.', products: data})
    } catch (error) {
        res.status(404).json({message:`hubo un error al cargar los products, ${error.message}`, error: error.message})

    }
})


router.delete('/products', async (req, res)=>{
    try {
        await productsModel.deleteMany();
        res.status(200).json({message: 'Documentos eliminados'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

export default router;