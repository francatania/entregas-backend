import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartProductsSchema = new Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    quantity: {type: Number, default: 1}
}, {_id: false})

const cartSchema = new Schema({
    products:{type: [cartProductsSchema], default: []}
},{timestamps:true})

export default mongoose.model('cart', cartSchema);