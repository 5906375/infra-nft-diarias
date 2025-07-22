import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import api from '../frontend/src/utils/api';


export default function Pagamento() {
    const [imovel, setImovel] = useState<any>(null);
    const [dias, setDias] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Simulação: carregar o imóvel a ser pago (você pode passar via props ou rota)
        const carregarImovel = async () => {
            try {
                const res = await api.get('/imoveis');
                if (res.data.length > 0) {
                    setImovel(res.data[0]);
                }
            } catch {
                toast.error('Erro ao carregar imóvel');
            }
        };
        carregarImovel();
    }, []);

    useEffect(() => {
        if (imovel) {
            setTotal(dias * imovel.valorDiaria);
        }
    }, [dias, imovel]);

    const handlePagamento = () => {
        toast.success(`Pagamento simulado de R$ ${total.toFixed(2)}!`);
    };

    return (
        <motion.div
            className="max-w-xl mx-auto p-4 bg-white shadow rounded-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-xl font-bold text-center mb-4">Pagamento de Diária</h2>

            {imovel ? (
                <div className="space-y-4">
                    <p><strong>Imóvel:</strong> {imovel.nome}</p>
                    <p><strong>Valor por diária:</strong> R$ {imovel.valorDiaria}</p>

                    <label className="block text-sm font-medium">Número de dias:</label>
                    <input
                        type="number"
                        value={dias}
                        min={1}
                        onChange={(e) => setDias(Number(e.target.value))}
                        className="w-full border p-2 rounded"
                    />

                    <div className="text-lg font-semibold text-blue-600">
                        Total: R$ {total.toFixed(2)}
                    </div>

                    <button
                        onClick={handlePagamento}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                        Confirmar Pagamento
                    </button>
                </div>
            ) : (
                <p>Carregando informações do imóvel...</p>
            )}
        </motion.div>
    );
}
