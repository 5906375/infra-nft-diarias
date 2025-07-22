import { Request, Response } from 'express';
import Proprietario from '../models/Proprietario.js';

export async function criarProprietario(req: Request, res: Response) {
  try {
    const novo = new Proprietario(req.body);
    const perfilSalvo = await novo.save();

    // ✅ Retorna o ID do MongoDB (idPerfil)
    res.status(201).json({
      message: 'Proprietário cadastrado com sucesso!',
      idPerfil: perfilSalvo._id  // importante para o frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar' });
  }
}
