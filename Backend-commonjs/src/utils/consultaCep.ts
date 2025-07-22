import axios from 'axios';

export async function buscarEnderecoPorCEP(cep: string) {
    try {
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
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
    } catch (erro: any) {
        console.error('❌ Erro ao buscar CEP:', erro.message);
        throw new Error('Erro ao buscar endereço pelo CEP');

    }
}

