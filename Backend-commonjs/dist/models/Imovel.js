"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImovelSchema = new mongoose_1.Schema({
    idPerfil: { type: String, required: true },
    nomePropriedade: String,
    emailPropriedade: String,
    docCompraVenda: String,
    registroImovel: String,
    finalidade: [String],
    checkin: [String],
    checkout: [String],
    maxHospedes: Number,
    minHospedes: Number,
    regrasAdicionais: [String],
    outrasRegras: String,
}, { timestamps: true });
ImovelSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
exports.default = (0, mongoose_1.model)('Imovel', ImovelSchema);
