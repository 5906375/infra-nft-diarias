// src/pages/Home.tsx
import LayoutPadrao from "@/components/LayoutPadrao";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <LayoutPadrao>
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Imagem animada */}
        <motion.div
          className="rounded-lg overflow-hidden shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/image/experiencia1.png"
            alt="Hospedagem com Web3"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Texto e CTA */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-purple-700 leading-snug">
            🏡 Hospedagem com NFTs? Sim, é possível!
          </h2>

          <p className="text-gray-700 text-sm leading-relaxed">
            O NFTDiárias permite que você cadastre sua propriedade, gere diárias tokenizadas e ofereça
            reservas com pagamento em cripto ou moeda local, tudo com segurança e transparência blockchain.
          </p>

          <ul className="text-sm list-disc list-inside text-gray-600 space-y-1">
            <li>✅ Propriedades registradas e verificadas</li>
            <li>📲 Controle de diárias com smart contracts</li>
            <li>🪙 Pagamento com cripto ou PIX</li>
            <li>🔗 NFT como comprovante legal da reserva</li>
          </ul>

          <Link
            to="/criar-nft"
            className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium py-2 px-5 rounded-lg shadow hover:shadow-md hover:brightness-110 transition"
          >
            🚀 Criar meu primeiro NFT agora
          </Link>
        </motion.div>
      </motion.section>
    </LayoutPadrao>
  );
}
