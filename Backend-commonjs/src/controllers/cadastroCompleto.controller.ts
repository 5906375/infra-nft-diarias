import { Request, Response } from 'express';
import PerfilModel from '../models/Perfil';
import ImovelModel from '../models/Imovel';

export async function salvarCadastroCompleto(req: Request, res: Response) {
    try {
        const {
            nome,
            email,
            telefone,
            tipoPessoa,
            endereco,
            cadastrarPropriedade,
            nomePropriedade,
            finalidade,
            emailPropriedade,
            docCompraVenda
        } = req.body;

        // 1. Criar o perfil
        const perfil = await PerfilModel.create({
            nome,
            email,
            telefone,
            tipoPessoa,
            endereco
        });

        // 2. Se solicitado, criar imóvel vinculado
        let imovel = null;

        const cadastrar = cadastrarPropriedade === true || cadastrarPropriedade === 'true';
        if (cadastrar) {
            imovel = await ImovelModel.create({
                idPerfil: perfil._id,
                nome: nomePropriedade,
                finalidade,
                emailPropriedade,
                docCompraVenda
            });
        }

        // 3. Resposta
        res.status(201).json({
            message: 'Cadastro salvo com sucesso!',
            idPerfil: perfil._id,
            idPropriedade: imovel ? imovel._id : null
        });

    } catch (err) {
        console.error('❌ Erro ao salvar cadastro completo:', err);
        res.status(500).json({ error: 'Erro ao salvar cadastro completo' });
    }
}
