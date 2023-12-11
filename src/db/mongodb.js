import mongoose from 'mongoose';

export const init = async ()=>{
    try {

        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('database has been connectedsta 🙌');
    } catch (error) {
        console.error('Error', error.message);
    }
};
