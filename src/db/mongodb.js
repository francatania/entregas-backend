import mongoose from 'mongoose';

export const URI = '' //agregar la URI


export const init = async ()=>{
    try {

        await mongoose.connect(URI);
        console.log('database has been connectedsta 🙌');
    } catch (error) {
        console.error('Error', error.message);
    }
};
