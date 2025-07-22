import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LayoutPadrao({ children }: { children: ReactNode }) {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col min-h-screen overflow-hidden">
            {/* Plano de fundo animado */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-br from-purple-100 via-white to-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img
                    src="/assets/bg-clube-metaverso.png"
                    alt="Fundo Metaverso"
                    className="w-full h-full object-cover opacity-30"
                />
            </motion.div>

            {/* Partículas leves (circulares) */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute top-10 left-20 w-16 h-16 bg-purple-300 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full blur-2xl animate-ping" />
                <div className="absolute top-1/2 left-1/3 w-10 h-10 bg-pink-200 rounded-full blur-xl animate-bounce" />
            </motion.div>

            {/* Conteúdo */}
            <div className="relative z-10 grid grid-cols-1 xl:grid-cols-4 gap-6 p-6 flex-1">
                <aside className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md space-y-2">
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Menu</h2>
                    <nav className="flex flex-col gap-2 text-sm text-purple-700">
                        <Link to="/">🏠 Página Inicial</Link>
                        <Link to="/cadastro">👤 Cadastro de Perfil</Link>
                        <Link to="/emitir-nft">🧱 Emitir NFT Diárias</Link>
                        <Link to="/pagamento">💳 Pagamento</Link>
                        <Link to="/relatorios">📊 Relatórios</Link>
                        <Link to="/como-funciona">📘 Como Funciona</Link>
                        <Link to="/consultar-nfts">📜 Consultar NFTs</Link>
                    </nav>
                </aside>

                <main className="xl:col-span-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-purple-700 mb-2">Bem-vindo ao NFTDiárias 👋</h1>
                        <p className="text-gray-600 text-sm">Escolha uma opção no menu para começar.</p>
                    </div>
                    {children}
                </main>
            </div>

            <footer className="relative z-10 bg-white/80 backdrop-blur-md text-center text-xs text-gray-600 py-6 border-t border-purple-200 space-y-4">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-purple-600 hover:underline text-sm"
                    >
                        ⬅ Voltar
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <Link to="/" className="hover:underline">🏠 Página Inicial</Link>
                    <Link to="/cadastro" className="hover:underline">👤 Cadastro de Perfil</Link>
                    <Link to="/emitir-nft" className="hover:underline">🧱 Emitir NFT Diárias</Link>
                    <Link to="/pagamento" className="hover:underline">💳 Pagamento</Link>
                    <Link to="/relatorios" className="hover:underline">📊 Relatórios</Link>
                    <Link to="/como-funciona" className="hover:underline">📘 Como Funciona</Link>
                    <Link to="/consultar-nfts" className="hover:underline">📜 Consultar NFTs</Link>
                </div>

                <div className="mt-4 space-y-2">
                    <p>Selecione sua localização:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <select className="border px-2 py-1 rounded">
                            <option>Brasil</option>
                            <option>Portugal</option>
                            <option>Estados Unidos</option>
                        </select>
                        <select className="border px-2 py-1 rounded">
                            <option>Santa Catarina</option>
                            <option>São Paulo</option>
                            <option>Rio de Janeiro</option>
                        </select>
                        <select className="border px-2 py-1 rounded">
                            <option>Balneário Camboriú</option>
                            <option>Florianópolis</option>
                            <option>Joinville</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <p>© 2025 NFTDiárias. Todos os direitos reservados.</p>
                    <p>
                        <Link to="/termos" className="underline mr-2">Termos de Uso</Link>
                        <Link to="/privacidade" className="underline mr-2">Política de Privacidade</Link>
                        <span className="ml-2">admin@carlos-alberto-merlo.com</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}
