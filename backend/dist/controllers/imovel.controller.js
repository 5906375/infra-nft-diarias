import ImovelModel from "../models/imovel.model.js";
// GET /api/imoveis/:idPerfil
export const listarImoveisPorPerfil = async (req, res) => {
    try {
        const { idPerfil } = req.params;
        if (!idPerfil) {
            return res.status(400).json({ message: "ID do perfil é obrigatório" });
        }
        const imoveis = await ImovelModel.find({ idPerfil });
        if (imoveis.length === 0) {
            return res.status(404).json({ message: "Nenhum imóvel encontrado para este perfil" });
        }
        return res.status(200).json(imoveis);
    }
    catch (err) {
        console.error("Erro ao buscar imóveis:", err);
        return res.status(500).json({ message: "Erro interno ao buscar imóveis" });
    }
};
