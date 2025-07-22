import { Schema, model, Document } from 'mongoose';


export interface IImovel extends Document {
  nome: string;
  endereco: string;
  imagem?: string;
  quartos?: number;
  banheiros?: number;
  suites?: number;
}

const ImovelSchema: Schema = new Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  imagem: { type: String },
  quartos: { type: Number },
  banheiros: { type: Number },
  suites: { type: Number },
}, { timestamps: true });

export default model<IImovel>('Imovel', ImovelSchema);

