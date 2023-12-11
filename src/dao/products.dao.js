import productsModel from "../models/products.model.js";

export default class ProductsDao{
    static create(data){
        return productsModel.create(data);
    }

    static createMany(data){
        return productsModel.insertMany(data);
    }

    static get(filters, options){
        return productsModel.paginate(filters, options);
    }

    static getById(id){
        return productsModel.findById({_id:id})
    }

    static deleteAll(){
        return productsModel.deleteMany();
    }

    static deleteById(id){
        return productsModel.deleteOne({_id: id});
    }
}