"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./database");
const cadastroCompleto_routes_1 = __importDefault(require("./routes/cadastroCompleto.routes"));
const index_1 = __importDefault(require("./routes/index"));
const perfil_routes_1 = __importDefault(require("./routes/perfil.routes"));
const imoveis_routes_1 = __importDefault(require("./routes/imoveis.routes"));
const nft_routes_1 = __importDefault(require("./routes/nft.routes"));
const relatorio_routes_1 = __importDefault(require("./routes/relatorio.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middlewares e rotas
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/api', cadastroCompleto_routes_1.default);
app.use('/api', index_1.default);
app.use('/api/perfis', perfil_routes_1.default);
app.use('/api/imoveis', imoveis_routes_1.default);
app.use('/api', nft_routes_1.default);
app.use('/api', relatorio_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
// Rota base de teste
app.get('/', (_, res) => {
    res.send('Servidor backend NFTDiárias rodando com sucesso!');
});
// Conecta ao banco e só então sobe o servidor
(0, database_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
});
