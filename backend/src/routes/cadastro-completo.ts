import { Router, Request, Response } from 'express';
import multer from 'multer';
import CadastroCompleto from '../models/CadastroCompleto.model.js';

const router = Router();

// Configuração do armazenamento dos arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// POST /api/cadastro-completo
router.post(
  '/',
  upload.fields([
    { name: 'documentos', maxCount: 5 },
    { name: 'comprovanteEndereco', maxCount: 1 }
  ]),
  async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      // Reconstrói os documentos com base nos arquivos enviados
      const documentos: { tipo: string; arquivo: string }[] = [];

      if (files && files['documentos']) {
        files['documentos'].forEach((file, index) => {
          const tipo = body[`documentos[${index}][tipo]`] || 'Desconhecido';
          documentos.push({ tipo, arquivo: file.filename });
        });
      }

      const cadastroData = {
        ...body,
        documentos,
        comprovanteEndereco: files?.comprovanteEndereco?.[0]?.filename || '',
      };

      const novoCadastro = new CadastroCompleto(cadastroData);
      await novoCadastro.save();

      res.status(201).json({
        message: 'Cadastro salvo com sucesso!',
        _id: novoCadastro._id,  // <- retorna o _id criado no Mongo
        idPerfil: novoCadastro._id, // opcional para compatibilidade
      });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao salvar o cadastro.' });
    }
  }
);

export default router;
