// Integração do recibo visual com FormCriarNFT mantendo funcionalidades originais + QR Code para verificação

import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import api from '../utils/api';
import { toast } from 'sonner';
import LayoutPadrao from "@/components/LayoutPadrao";
import QRCode from "react-qr-code";

interface Imovel {
    _id: string;
    nome: string;
    imagem?: string;
}

interface LocationState {
    idPerfil: string;
}

export default function FormCriarNFT() {
    const [propriedades, setPropriedades] = useState<Imovel[]>([]);
    const [form, setForm] = useState({
        propriedadeId: '',
        inicio: '',
        fim: '',
        descricao: '',
        finalidade: '',
        hospedes: '',
        link: '',
        exclusivo: ''
    });

    const location = useLocation() as { state: LocationState };
    const idPerfil = location.state?.idPerfil || '';

    useEffect(() => {
        const carregarPropriedades = async () => {
            try {
                const res = await api.get(`/imoveis/perfil/${idPerfil}`);
                setPropriedades(res.data);
                console.log("✅ Propriedades carregadas:", res.data);
            } catch (err) {
                console.error("Erro ao buscar propriedades:", err);
                toast.error("Erro ao carregar propriedades");
            }
        };

        if (idPerfil) carregarPropriedades();
    }, [idPerfil]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.propriedadeId) {
            toast.error("Selecione uma propriedade antes de criar o NFT");
            return;
        }

        try {
            console.log("Form enviado:", {
                ...form,
                hospedes: Number(form.hospedes),
                idPerfil,
            });

            await api.post('/nfts', {
                ...form,
                hospedes: Number(form.hospedes),
                idPerfil,
            });

            toast.success("NFT criada com sucesso!");
        } catch (err) {
            console.error("Erro ao criar NFT:", err);
            toast.error("Erro ao criar NFT");
        }
    };

    const propriedadeSelecionada = propriedades.find(p => p._id === form.propriedadeId);
    const qrLink = `https://blockexplorer.exemplo.com/nft/${form.propriedadeId}`;

    return (
        <LayoutPadrao>
            <motion.div
                className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-xl font-bold text-center mb-6">Criar NFT de Diária</h2>

                <div className="space-y-4">
                    {/* ... campos originais ... */}

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Criar NFT
                    </button>
                </div>

                {form.propriedadeId && (
                    <div className="mt-10 border rounded-lg shadow p-4 bg-purple-50">
                        <h3 className="text-lg font-semibold mb-4 text-center">📄 Recibo NFT Gerado</h3>
                        <img src={propriedadeSelecionada?.imagem || '/placeholder.jpg'} alt="Imagem do imóvel" className="rounded-lg w-full h-48 object-cover mb-4" />

                        <div className="text-center space-y-1">
                            <p className="text-sm text-gray-600">NFT <strong>#000000001</strong> — ID Propriedade: <strong>{form.propriedadeId}</strong></p>
                            <div className="flex justify-center gap-2 items-center">
                                <img src="/logo.png" alt="logo" className="w-6 h-6" />
                                <h4 className="font-bold text-purple-800">NFTDiárias</h4>
                            </div>
                            <p className="text-xs text-purple-700">Conheça o melhor em hospedagens</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center text-xs mt-4">
                            <div><span className="block">🔁</span>Transfira</div>
                            <div><span className="block">✏️</span>Renomeie-o</div>
                            <div><span className="block">🎁</span>Presenteie-o</div>
                        </div>

                        <div className="text-center mt-4 text-sm text-gray-800">
                            <p>📅 <strong>Validade:</strong> Uso único no período reservado</p>
                            <p className="mt-2">Entrada: <strong>{form.inicio}</strong> — Saída: <strong>{form.fim}</strong></p>
                        </div>

                        <div className="mt-4 flex flex-col items-center">
                            <p className="text-xs text-gray-600 mb-1">🔗 Verifique na blockchain</p>
                            <QRCode value={qrLink} size={96} />
                            <a href={qrLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs mt-2 underline">Abrir verificação</a>
                        </div>
                    </div>
                )}
            </motion.div>
        </LayoutPadrao>
    );
}
