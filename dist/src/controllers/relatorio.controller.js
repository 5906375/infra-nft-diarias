"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceitaPorDia = exports.getReceitaPorImovel = exports.getReservasPorMes = exports.getReservasPorDia = void 0;
// src/controllers/relatorio.controller.ts
const Relatorio_model_1 = __importDefault(require("../models/Relatorio.model")); // novo nome claro
const pagamento_model_1 = __importDefault(require("../models/pagamento.model"));
// 📆 Reservas por dia
const getReservasPorDia = async (req, res) => {
    try {
        const resultados = await Relatorio_model_1.default.aggregate([
            {
                $group: {
                    _id: "$checkin", // agrupa pela data de check-in
                    total: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        res.json(resultados);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao agrupar reservas por dia" });
    }
};
exports.getReservasPorDia = getReservasPorDia;
// 📅 Reservas por mês
const getReservasPorMes = async (req, res) => {
    try {
        const resultados = await Relatorio.aggregate([
            { $unwind: "$checkin" }, // Necessário se checkin for array
            {
                $group: {
                    _id: {
                        ano: { $year: { $toDate: "$checkin" } },
                        mes: { $month: { $toDate: "$checkin" } },
                    },
                    total: { $sum: 1 },
                },
            },
            { $sort: { "_id.ano": 1, "_id.mes": 1 } },
        ]);
        res.json(resultados);
    }
    catch (err) {
        console.error("Erro ao agrupar reservas por mês:", err);
        res.status(500).json({ error: "Erro ao agrupar reservas por mês" });
    }
};
exports.getReservasPorMes = getReservasPorMes;
// 💰 Receita por imóvel
const getReceitaPorImovel = async (req, res) => {
    try {
        const resultados = await pagamento_model_1.default.aggregate([
            {
                $group: {
                    _id: "$imovelId",
                    receitaTotal: { $sum: "$valor" },
                },
            },
            {
                $lookup: {
                    from: "imovels",
                    localField: "_id",
                    foreignField: "_id",
                    as: "imovel",
                },
            },
            {
                $unwind: "$imovel",
            },
            {
                $project: {
                    _id: 0,
                    imovelId: "$_id",
                    nome: "$imovel.nome",
                    receitaTotal: 1,
                },
            },
        ]);
        res.json(resultados);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao calcular receita por imóvel" });
    }
};
exports.getReceitaPorImovel = getReceitaPorImovel;
// 📈 Receita por dia (descontando 10% de custo fixo)
const getReceitaPorDia = async (req, res) => {
    try {
        const resultados = await pagamento_model_1.default.aggregate([
            {
                $group: {
                    _id: {
                        dia: { $dayOfMonth: { $toDate: "$dataPagamento" } },
                        mes: { $month: { $toDate: "$dataPagamento" } },
                        ano: { $year: { $toDate: "$dataPagamento" } },
                    },
                    receitaBruta: { $sum: "$valor" },
                },
            },
            {
                $project: {
                    data: "$_id",
                    receitaBruta: 1,
                    receitaLiquida: { $multiply: ["$receitaBruta", 0.9] }, // desconta 10%
                    _id: 0,
                },
            },
            {
                $sort: { "data.ano": 1, "data.mes": 1, "data.dia": 1 },
            },
        ]);
        res.json(resultados);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao calcular receita por dia" });
    }
};
exports.getReceitaPorDia = getReceitaPorDia;
