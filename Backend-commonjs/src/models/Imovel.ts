import { Schema, model, Document } from 'mongoose';

export interface ImovelType extends Document {
    idPerfil: string;
    nomePropriedade: string;
    emailPropriedade: string;
    docCompraVenda: string;
    registroImovel: string;
    finalidade: string[];
    checkin: string[];
    checkout: string[];
    maxHospedes: number;
    minHospedes: number;
    regrasAdicionais: string[];
    outrasRegras: string;
}

const ImovelSchema = new Schema<ImovelType>({
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

export default model<ImovelType>('Imovel', ImovelSchema);
