"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProprietarioSchema = new mongoose_1.Schema({
    nome: String,
    assinatura: String,
    wallet: String,
    endereco: {
        cep: String,
        rua: String,
        numero: String,
        bairro: String,
        cidade: String,
        estado: String,
        pais: String
    },
    email: String,
    docIdentidade: String,
    comprovanteEndereco: String,
    linkExterno: String,
    cadastrarPropriedade: Boolean
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Proprietario', ProprietarioSchema);
