import Proprietario from '../models/Proprietario.js';
export async function criarProprietario(req, res) {
    try {
        const novo = new Proprietario(req.body);
        await novo.save();
        res.status(201).json({ message: 'Proprietário cadastrado com sucesso!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao salvar' });
    }
}
