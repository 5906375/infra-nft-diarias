import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home"; 
import CadastroCompleto from "./pages/CadastroCompleto";
import Pagamento from "./pages/Pagamento";
import FormCriarNFT from "./pages/FormCriarNFT";
import ComoFunciona from "./pages/ComoFunciona";
import ConfirmacaoNFT from "./pages/ConfirmacaoNFT";
import Relatorio from "./pages/Relatorio";
import ConectarCarteira from "./components/ConectarCarteira";
import ConsultarNFTs from "./pages/ConsultarNFTs";

import { Toaster } from "sonner";
import TesteAudioIA from '@/pages/TesteAudioIA';

// Wrapper interno para aplicar transições com AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} /> 
        <Route path="/cadastro" element={<CadastroCompleto />} /> 
        <Route path="/pagamento/:id" element={<Pagamento />} />
        <Route path="/criar-nft" element={<FormCriarNFT />} />
        <Route path="/emitir-nft" element={<FormCriarNFT />} />
        <Route path="/confirmacao" element={<ConfirmacaoNFT />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/consultar-nfts" element={<ConsultarNFTs />} />
        <Route path="/teste-audio" element={<TesteAudioIA />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Barra superior com botão de conectar */}
      <div className="bg-gray-100 p-3 shadow flex justify-end">
        <ConectarCarteira />
      </div>

      {/* Rotas com transição */}
      <AnimatedRoutes />

      <Toaster richColors />
    </div>
  );
}
