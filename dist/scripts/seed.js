"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/scripts/seed.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Relatorio_model_1 = __importDefault(require("../src/models/Relatorio.model"));
const pagamento_model_1 = __importDefault(require("../src/models/pagamento.model"));
const crypto_1 = require("crypto");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/nftdiarias";
async function seed() {
    await mongoose_1.default.connect(MONGO_URI);
    console.log("🧪 Conectado ao MongoDB para inserir dados de teste...");
    await Relatorio_model_1.default.deleteMany({});
    await pagamento_model_1.default.deleteMany({});
    // Inserir relatórios (check-in fictício)
    await Relatorio_model_1.default.insertMany([
        {
            nomePropriedade: "Casa da Praia",
            nomeProprietario: "João Silva",
            wallet: "0xabc123...",
            checkin: ["2025-07-01", "2025-07-05"],
            checkout: ["2025-07-03", "2025-07-10"],
            maxHospedes: 6,
            minHospedes: 2,
            finalidade: ["Lazer", "Férias"],
            regrasAdicionais: ["Sem animais", "Proibido fumar"],
        },
        {
            nomePropriedade: "Cabana da Montanha",
            nomeProprietario: "Ana Souza",
            wallet: "0xdef456...",
            checkin: ["2025-07-04"],
            checkout: ["2025-07-07"],
            maxHospedes: 4,
            minHospedes: 1,
            finalidade: ["Romântico"],
            regrasAdicionais: [],
        },
    ]);
    // Inserir pagamentos
    await pagamento_model_1.default.insertMany([
        {
            idPagamento: (0, crypto_1.randomUUID)(),
            propriedadeId: "1",
            valor: 1200,
            metodoPagamento: "pix",
            status: "confirmado",
            dataEntrada: "2025-07-01",
            dataSaida: "2025-07-03",
            dataPagamento: "2025-07-01",
            walletPagador: "0x999aaa...",
        },
        {
            idPagamento: (0, crypto_1.randomUUID)(),
            propriedadeId: "2",
            valor: 900,
            metodoPagamento: "cripto",
            status: "confirmado",
            dataEntrada: "2025-07-04",
            dataSaida: "2025-07-07",
            dataPagamento: "2025-07-02",
            walletPagador: "0x888bbb...",
        },
        {
            idPagamento: (0, crypto_1.randomUUID)(),
            propriedadeId: "1",
            valor: 1500,
            metodoPagamento: "pix",
            status: "pendente",
            dataEntrada: "2025-07-05",
            dataSaida: "2025-07-10",
            dataPagamento: "2025-07-05",
            walletPagador: "0xabc123...",
        },
    ]);
    console.log("✅ Dados fictícios inseridos com sucesso!");
    mongoose_1.default.disconnect();
}
seed().catch((err) => {
    console.error("Erro ao executar seed:", err);
    mongoose_1.default.disconnect();
});
