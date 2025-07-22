"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CadastroCompletoSchema = new mongoose_1.default.Schema({
    // Proprietário
    nome: String,
    assinatura: String,
    wallet: String,
    email: String,
    docIdentidade: String,
    comprovanteEndereco: String,
    // Propriedade
    nomePropriedade: String,
    endereco: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    pais: String,
    cep: String,
    finalidade: String,
    emailPropriedade: String,
    docCompraVenda: String,
    registroImovel: String,
    // Regras
    checkin: String,
    checkout: String,
    maxHospedes: String,
    minHospedes: String,
    outrasRegras: String
}, { timestamps: true });
exports.default = mongoose_1.default.model('CadastroCompleto', CadastroCompletoSchema);
