import CadastroCompleto from "../models/CadastroCompleto.model.js";
export const criarCadastroCompleto = async (req, res) => {
    try {
        const { nome, assinatura, wallet, cep, endereco, numero, bairro, cidade, estado, pais, email, ddi, telefone, tipoPessoa, tipoDocumento, linkExterno, nomePropriedade, idPerfil, finalidade, emailPropriedade, docCompraVenda, registroImovel, checkin, checkout, maxHospedes, minHospedes, regrasAdicionais, outrasRegras } = req.body;
        const documentos = [];
        if (req.files && "documentos[0][arquivo]" in req.files) {
            documentos.push({
                tipo: tipoDocumento,
                arquivo: req.files["documentos[0][arquivo]"][0].path,
            });
        }
        const comprovanteEndereco = req.files?.comprovanteEndereco?.[0]?.path;
        const novoCadastro = new CadastroCompleto({
            nome,
            assinatura,
            wallet,
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            estado,
            pais,
            email,
            ddi,
            telefone,
            tipoPessoa,
            documentos,
            comprovanteEndereco,
            linkExterno,
            nomePropriedade,
            idPerfil,
            finalidade,
            emailPropriedade,
            docCompraVenda,
            registroImovel,
            checkin,
            checkout,
            maxHospedes,
            minHospedes,
            regrasAdicionais,
            outrasRegras,
        });
        await novoCadastro.save();
        res.status(201).json(novoCadastro);
    }
    catch (error) {
        console.error("Erro ao salvar cadastro:", error);
        res.status(500).json({ erro: "Erro ao salvar cadastro" });
    }
};
