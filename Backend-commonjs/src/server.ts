import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './database';

import cadastroCompletoRoutes from './routes/cadastroCompleto.routes';
import indexRoutes from './routes/index';
import perfilRoutes from './routes/perfil.routes';
import imoveisRoutes from './routes/imoveis.routes';
import nftRoutes from './routes/nft.routes';
import nftEmitirRoutes from "./routes/nftEmitir.routes";
import relatorioRoutes from './routes/relatorio.routes';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rotas com prefixos claros
app.use('/api/cadastro-completo', cadastroCompletoRoutes);
app.use('/api/perfis', perfilRoutes);
app.use('/api/imoveis', imoveisRoutes);
app.use('/api/nfts', nftRoutes);
app.use('/api/nfts/emitir', nftEmitirRoutes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api', indexRoutes); // rota genérica deve vir por último

// Rota base
app.get('/', (_, res) => {
    res.send('Servidor backend NFTDiárias rodando com sucesso!');
});

// Conexão e inicialização
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
});
