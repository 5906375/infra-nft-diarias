import { Schema, model, Document } from 'mongoose';

export interface PerfilType extends Document {
    nome: string;
    tipoPessoa: string;
    wallet: string;
    email: string;
    docIdentidade: string;
    comprovanteEndereco: string;
    endereco: {
        cep: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        pais: string;
    };
    linkExterno: string;
    cadastrarPropriedade: boolean;
}

const PerfilSchema = new Schema<PerfilType>({
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

export default model<PerfilType>('Perfil', PerfilSchema);
