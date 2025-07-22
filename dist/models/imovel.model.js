"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImovelSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    imagem: { type: String },
    quartos: { type: Number },
    banheiros: { type: Number },
    suites: { type: Number },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Imovel', ImovelSchema);
