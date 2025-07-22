// src/controllers/relatorio.controller.ts
import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LineChart, Line,
    BarChart, Bar,
    AreaChart, Area,
    CartesianGrid, XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer,
} from "recharts";

/* ---------- Tipagens simples ---------- */
type RelatorioImovel = {
    nomePropriedade: string;
    nome: string;
    checkin: string[];
    checkout: string[];
    maxHospedes: number;
    minHospedes: number;
    finalidade: string[];
};

type Pagamento = {
    propriedadeId: string;
    valor: number;
    metodoPagamento: string;
    status: string;
    dataEntrada: string;
    dataSaida: string;
    walletPagador?: string;
};

type ReservasDia = { _id: string; total: number };
type ReservasMes = { _id: { ano: number; mes: number }; total: number };
type ReceitaImovel = { imovelId: string; nome: string; receitaTotal: number };
type ReceitaDia = { data: { ano: number; mes: number; dia: number }; receitaLiquida: number };

export default function Relatorio() {
    const navigate = useNavigate();

    /* ---------- Estados principais ---------- */
    const [relatorios, setRelatorios] = useState<RelatorioImovel[]>([]);
    const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
    const [reservasDia, setReservasDia] = useState<ReservasDia[]>([]);
    const [reservasMes, setReservasMes] = useState<ReservasMes[]>([]);
    const [receitaImovel, setReceitaImovel] = useState<ReceitaImovel[]>([]);
    const [receitaDia, setReceitaDia] = useState<ReceitaDia[]>([]);

    /* ---------- Fetch inicial ---------- */
    useEffect(() => {
        // Tabelas originais
        fetch("http://localhost:4000/api/relatorios")
            .then(r => r.json()).then(setRelatorios).catch(console.error);

        fetch("http://localhost:4000/api/pagamento")
            .then(r => r.json()).then(setPagamentos).catch(console.error);

        // Endpoints agregados para gráficos
        fetch("http://localhost:4000/api/relatorios/reservas-por-dia")
            .then(r => r.json()).then(setReservasDia).catch(console.error);

        fetch("http://localhost:4000/api/relatorios/reservas-por-mes")
            .then((res) => res.ok ? res.json() : [])
            .then(setReservasMes)
            .catch((err) => {
                console.error("Erro ao buscar reservas por mês:", err);
                setReservasMes([]);
            });
          

        fetch("http://localhost:4000/api/relatorios/receita-por-imovel")
            .then(r => r.json()).then(setReceitaImovel).catch(console.error);

        fetch("http://localhost:4000/api/relatorios/receita-por-dia")
            .then(r => r.json()).then(setReceitaDia).catch(console.error);
    }, []);

    /* ---------- Helpers ---------- */
    const labelMes = (d: ReservasMes["_id"]) =>
        `${String(d.mes).padStart(2, "0")}/${d.ano}`;

    const labelData = (d: ReceitaDia["data"]) =>
        `${String(d.dia).padStart(2, "0")}/${String(d.mes).padStart(2, "0")}/${d.ano}`;

    /* ---------- JSX ---------- */
    return (
        <motion.div
            className="min-h-screen p-4 bg-white text-gray-800"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
        <div className="p-6 space-y-12">
            {/* Navegação */}
            <button onClick={() => navigate("/")} className="text-purple-600 underline mb-4">
                ← Voltar ao menu
            </button>
        
            {/* === Tabela Relatórios de Imóveis === */}
            <section>
                <h1 className="text-2xl font-bold mb-4 text-purple-700">Relatórios de Imóveis</h1>
                <table className="w-full text-sm border border-gray-300 mb-10">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Propriedade</th>
                            <th className="p-2 border">Proprietário</th>
                            <th className="p-2 border">Check-in</th>
                            <th className="p-2 border">Check-out</th>
                            <th className="p-2 border">Hóspedes</th>
                            <th className="p-2 border">Finalidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relatorios.map((r, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="p-2 border">{r.nomePropriedade}</td>
                                <td className="p-2 border">{r.nome}</td>
                                <td className="p-2 border">{r.checkin?.join(", ")}</td>
                                <td className="p-2 border">{r.checkout?.join(", ")}</td>
                                <td className="p-2 border">{r.minHospedes}‒{r.maxHospedes}</td>
                                <td className="p-2 border">{r.finalidade?.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* === Tabela Pagamentos === */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Pagamentos Registrados</h2>
                <table className="w-full text-sm border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">Propriedade ID</th>
                            <th className="p-2 border">Valor (R$)</th>
                            <th className="p-2 border">Método</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Entrada</th>
                            <th className="p-2 border">Saída</th>
                            <th className="p-2 border">Carteira</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagamentos.map((p, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="p-2 border">{p.propriedadeId}</td>
                                <td className="p-2 border">{p.valor.toLocaleString("pt-BR")}</td>
                                <td className="p-2 border">{p.metodoPagamento}</td>
                                <td className="p-2 border">{p.status}</td>
                                <td className="p-2 border">{new Date(p.dataEntrada).toLocaleDateString()}</td>
                                <td className="p-2 border">{new Date(p.dataSaida).toLocaleDateString()}</td>
                                <td className="p-2 border">{p.walletPagador || "–"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* === Gráficos === */}
            <section className="space-y-16">
                {/* Reservas por Dia */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Reservas por Dia</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={reservasDia}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" name="Reservas" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Reservas por Mês */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Reservas por Mês</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={reservasMes.map(r => ({ mes: labelMes(r._id), total: r.total }))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" name="Reservas" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Receita por Imóvel */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Receita por Imóvel (R$)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={receitaImovel}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nome" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="receitaTotal" name="Receita" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Receita Líquida por Dia */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Receita Líquida por Dia (R$)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={receitaDia.map(r => ({ data: labelData(r.data), receita: r.receitaLiquida }))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="receita" name="Receita" fillOpacity={0.3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
        </motion.div>
    );
}
