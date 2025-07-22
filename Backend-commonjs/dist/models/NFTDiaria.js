"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NFTDiariaSchema = new mongoose_1.default.Schema({
    propriedadeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Imovel', required: true },
    inicio: { type: Date, required: true },
    fim: { type: Date, required: true },
    descricao: String,
    finalidade: String,
    hospedes: Number,
    link: String,
    exclusivo: String
}, { timestamps: true });
const NFTDiaria = mongoose_1.default.model('NFTDiaria', NFTDiariaSchema);
exports.default = NFTDiaria;
