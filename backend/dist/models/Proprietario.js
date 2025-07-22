import { Schema, model } from 'mongoose';
const ProprietarioSchema = new Schema({
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
export default model('Proprietario', ProprietarioSchema);
