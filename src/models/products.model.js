import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    name: {type: String, required: true},
    model: {type: String, required: true},
    memory: {type: Number, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    status: {type: Boolean, required: true},
    category: {type:String, required: true}
})


productSchema.plugin(mongoosePaginate);

export default mongoose.model('products', productSchema);