"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PerfilSchema = new mongoose_1.Schema({
    nome: String,
    tipoPessoa: String,
    wallet: String,
    endereco: {
        cep: String,
        rua: String,
        numero: String,
        bairro: String,
        cidade: String,
        estado: String,
        pais: String,
    },
    email: String,
    docIdentidade: String,
    comprovanteEndereco: String,
    linkExterno: String,
    cadastrarPropriedade: Boolean
}, { timestamps: true });
PerfilSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        ret.idPerfil = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
exports.default = (0, mongoose_1.model)('Perfil', PerfilSchema);
