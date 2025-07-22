// src/database.ts
import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/nftdiarias';

export const connectDB = async () => {
    let tentativas = 5;
    while (tentativas) {
        try {
            await mongoose.connect(mongoURI);
            console.log('✅ Conectado ao MongoDB');
            break;
        } catch (error) {
            console.error(`❌ Erro na conexão com MongoDB (${tentativas} tentativas restantes).`);
            console.error(error);
            tentativas--;
            await new Promise(res => setTimeout(res, 5000)); // espera 5s
        }
    }

    if (!tentativas) {
        console.error("💥 Falha ao conectar ao MongoDB após múltiplas tentativas.");
        process.exit(1);
    }
};
