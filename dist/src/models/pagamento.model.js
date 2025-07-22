"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pagamentoSchema = new mongoose_1.Schema({
    propriedadeId: { type: String, required: true },
    dataEntrada: { type: Date, required: true },
    dataSaida: { type: Date, required: true },
    dataPagamento: { type: Date, required: true }, // novo campo
    metodoPagamento: { type: String, enum: ["pix", "cripto"], required: true },
    valor: { type: Number, required: true },
    status: { type: String, enum: ["pendente", "confirmado"], default: "pendente" },
    idPagamento: { type: String, required: true },
    walletPagador: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Pagamento", pagamentoSchema);
