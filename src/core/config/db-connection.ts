import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string | '');
    console.log('Conexión exitosa!');
  } catch (error) {
    console.log(error);
    throw new Error('error al iniciar la Bd');
  }
};