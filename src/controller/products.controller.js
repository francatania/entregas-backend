import ProductsDao from "../dao/products.dao.js";

export default class ProductsController{
    static async createProduct(data){
        const product = await ProductsDao.create(data);
        console.log('Producto creado');
        return product;
    }
        
    static async createProducts(data){
        const products = await ProductsDao.createMany(data);
        console.log('Productos creados');
        return products;
    }

    static async getProducts(filters, options){
        return await ProductsDao.get(filters, options);
    }

    static async getProductById(id){
        const product = await ProductsDao.getById(id);
        if(!product){
            throw new Error(`Producto no encontrado ${id}`);
        }
        return product;
    }

    static async deleteProducts(){
        console.log('eliminando...');
        return await ProductsDao.deleteAll();

    }

    static async deleteProductById(id){
        const product = await ProductsController.getProductById(id);
        if(!product){
            throw new Error(`Producto no encontrado ${id}`);
        }
        return await ProductsDao.deleteById(id);
    }
}