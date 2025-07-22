import { useLocation, Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ConfirmacaoNFT() {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const { tokenURI, txHash } = location.state || {};
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timeout);
    }, []);

    if (!tokenURI || !txHash) {
        return (
            <div className="p-6 text-center text-gray-600">
                Dados do NFT não encontrados.
            </div>
        );
    }

    const copiar = (texto: string, label: string) => {
        navigator.clipboard.writeText(texto);
        toast.success(`Copiado: ${label}`);
    };

    return (
        <motion.div
            className="max-w-lg mx-auto p-6 text-center relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {width && height && showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={300}
                    recycle={false}
                />
            )}

            <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4">
                🎉 NFT Criada com Sucesso!
            </h2>

            <img
                src={tokenURI}
                alt="NFT"
                className="rounded shadow mb-4 max-h-64 mx-auto"
            />

            <div className="mb-2 text-sm">
                <p className="font-semibold">TokenURI (IPFS):</p>
                <a
                    href={tokenURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-words"
                >
                    {tokenURI}
                </a>
                <button
                    onClick={() => copiar(tokenURI, "TokenURI")}
                    className="text-xs text-gray-500 hover:text-purple-600 mt-1"
                >
                    📋 Copiar TokenURI
                </button>
            </div>

            <div className="mt-4 text-sm">
                <p className="font-semibold">Transação na Blockchain:</p>
                <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline break-words"
                >
                    {txHash}
                </a>
                <button
                    onClick={() => copiar(txHash, "TX Hash")}
                    className="text-xs text-gray-500 hover:text-purple-600 mt-1"
                >
                    📋 Copiar Hash
                </button>
            </div>

            <div className="mt-6 flex flex-col gap-2 items-center">
                <button
                    onClick={() => navigate("/criar-nft")}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition w-full sm:w-auto"
                >
                    Criar outro NFT
                </button>
                <Link to="/" className="text-purple-600 underline text-sm">
                    Voltar para início
                </Link>
            </div>
        </motion.div>
    );
}
