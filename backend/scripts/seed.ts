// backend/scripts/seed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Relatorio from "../src/models/Relatorio.model";
import Pagamento from "../src/models/pagamento.model";
import { randomUUID } from "crypto";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/nftdiarias";

async function seed() {
    await mongoose.connect(MONGO_URI);

    console.log("🧪 Conectado ao MongoDB para inserir dados de teste...");

    await Relatorio.deleteMany({});
    await Pagamento.deleteMany({});

    // Inserir relatórios (check-in fictício)
    await Relatorio.insertMany([
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
    await Pagamento.insertMany([
        {
            idPagamento: randomUUID(),
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
            idPagamento: randomUUID(), 
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
            idPagamento: randomUUID(), 
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

    mongoose.disconnect();
}

seed().catch((err) => {
    console.error("Erro ao executar seed:", err);
    mongoose.disconnect();
});
