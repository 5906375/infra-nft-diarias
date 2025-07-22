"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarEnderecoPorCEP = buscarEnderecoPorCEP;
const axios_1 = __importDefault(require("axios"));
async function buscarEnderecoPorCEP(cep) {
    try {
        const resposta = await axios_1.default.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (resposta.data.erro) {
            throw new Error('CEP inválido');
        }
        return {
            rua: resposta.data.logradouro || '',
            bairro: resposta.data.bairro || '',
            cidade: resposta.data.localidade || '',
            estado: resposta.data.uf || '',
            pais: 'Brasil',
        };
    }
    catch (erro) {
        console.error('❌ Erro ao buscar CEP:', erro.message);
        throw new Error('Erro ao buscar endereço pelo CEP');
    }
}
