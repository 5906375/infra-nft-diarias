import mongoose from 'mongoose';

const NFTDiariaSchema = new mongoose.Schema({
    propriedadeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Imovel', required: true },
    inicio: { type: Date, required: true },
    fim: { type: Date, required: true },
    descricao: String,
    finalidade: String,
    hospedes: Number,
    link: String,
    exclusivo: String
}, { timestamps: true });

const NFTDiaria = mongoose.model('NFTDiaria', NFTDiariaSchema);
export default NFTDiaria;
