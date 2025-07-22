import mongoose from 'mongoose';

const CadastroCompletoSchema = new mongoose.Schema({
  // Proprietário
  nome: { type: String, required: true },
  telefone: { type: String, required: true },

  tipoPessoa: {
    type: String,
    enum: ["Física", "Jurídica"],
    required: true,
  },

  documentos: [
    {
      tipo: {
        type: String,
        enum: ["CNH", "RG/CPF", "CNPJ"],
        required: true,
      },
      arquivo: { type: String, required: true }, // URL/IPFS/local
      detectadoPorIA: { type: String, default: null }, // opcional, para uso futuro
    },
  ],

  comprovanteEndereco: { type: String, required: true },

  // Propriedade
  nomePropriedade: String,
  endereco: String,
  numero: String,
  bairro: String,
  cidade: String,
  estado: String,
  pais: String,
  cep: String,
  finalidade: String,
  emailPropriedade: String,
  docCompraVenda: String,
  registroImovel: String,

  // Regras
  checkin: String,
  checkout: String,
  maxHospedes: String,
  minHospedes: String,
  outrasRegras: String
}, { timestamps: true });

export default mongoose.model('CadastroCompleto', CadastroCompletoSchema);
