import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import proprietarioRoutes from './routes/proprietarios.routes.js';
import pagamentoRoutes from './routes/pagamento.js';
import imovelRoutes from './routes/imoveis.routes.js';
import cadastroCompletoRoutes from './routes/cadastro-completo.js';
import relatorioRoutes from './routes/relatorio.routes.js';
import nftRoutes from './routes/nft.js';





dotenv.config();
console.log("✅ CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS); // 👈 Aqui validamos

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/proprietarios', proprietarioRoutes);
app.use('/api/pagamento', pagamentoRoutes);
app.use('/api/imoveis', imovelRoutes);
app.use('/api/cadastro-completo', cadastroCompletoRoutes);
app.use("/api/relatorios", relatorioRoutes);
app.use("/api/nft", nftRoutes);
app.use('/api/cadastro-completo', cadastroCompletoRoutes);

app.listen(4000, () => console.log('🚀 Backend rodando em http://localhost:4000'));
