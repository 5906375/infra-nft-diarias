"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPagamentos = exports.registrarPagamento = void 0;
const pagamento_model_1 = __importDefault(require("../models/pagamento.model"));
/**
 * POST /api/pagamento
 * Registra um novo pagamento no banco de dados.
 */
const registrarPagamento = async (req, res) => {
    try {
        const { propriedadeId, dataEntrada, dataSaida, metodoPagamento, valor, walletPagador, } = req.body;
        if (!propriedadeId || !dataEntrada || !dataSaida || !metodoPagamento || !valor) {
            return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
        }
        const novoPagamento = new pagamento_model_1.default({
            propriedadeId,
            dataEntrada: new Date(dataEntrada),
            dataSaida: new Date(dataSaida),
            metodoPagamento,
            valor,
            status: 'confirmado',
            idPagamento: `pg_${Date.now()}`,
            walletPagador,
        });
        await novoPagamento.save();
        return res.status(201).json({
            msg: '✅ Pagamento registrado com sucesso!',
            pagamento: novoPagamento,
        });
    }
    catch (error) {
        console.error('Erro ao registrar pagamento:', error);
        return res.status(500).json({ erro: 'Erro interno ao registrar o pagamento.' });
    }
};
exports.registrarPagamento = registrarPagamento;
/**
 * GET /api/pagamento
 * Lista todos os pagamentos cadastrados.
 */
const listarPagamentos = async (_req, res) => {
    try {
        const pagamentos = await pagamento_model_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json(pagamentos);
    }
    catch (error) {
        console.error('Erro ao listar pagamentos:', error);
        return res.status(500).json({ erro: 'Erro ao buscar os pagamentos.' });
    }
};
exports.listarPagamentos = listarPagamentos;
