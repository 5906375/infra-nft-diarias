import mongoose from 'mongoose';
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado ao MongoDB');
    }
    catch (err) {
        console.error('Erro ao conectar no MongoDB:', err);
    }
}
