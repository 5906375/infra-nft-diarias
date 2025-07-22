import { Schema, model } from 'mongoose';
const ImovelSchema = new Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    imagem: { type: String },
    quartos: { type: Number },
    banheiros: { type: Number },
    suites: { type: Number },
}, { timestamps: true });
export default model('Imovel', ImovelSchema);
