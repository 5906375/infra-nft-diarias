// src/pages/CadastroCompleto.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutPadraoNovo from "@/components/LayoutPadraoNovo";
import { motion } from "framer-motion";
import EtapaProprietario from "@/components/EtapasCadastro/EtapaProprietario";
import EtapaPropriedade from "@/components/EtapasCadastro/EtapaPropriedade";
import EtapaRegras from "@/components/EtapasCadastro/EtapaRegras";
import { useCadastroContext } from "@/context/CadastroContext";

export default function CadastroCompleto() {
  const navigate = useNavigate();
  const {
    etapa,
    setEtapa,
    formData,
    handleChange,
    setField, // agora usado corretamente
  } = useCadastroContext();

  const [mostrarTutorIA, setMostrarTutorIA] = useState(false);

  const iniciarTutorIA = async () => {
    const res = await fetch("http://localhost:5000/tutor/perfil-id");
    const data = await res.json();
    const fala = new SpeechSynthesisUtterance(data.texto);
    speechSynthesis.speak(fala);
  };

  const handleSubmitEtapa1 = async () => {
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "string" || value instanceof File) {
          form.append(key, value);
        }
      });

      const res = await fetch("http://localhost:4000/api/perfis", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      const id = data.idPerfil || data._id || "";
      setField("idPerfil", id);
      setMostrarTutorIA(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar dados do proprietário.");
    }
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "string" || value instanceof File) {
          form.append(key, value);
        }
      });

      const res = await fetch("http://localhost:4000/api/cadastro-completo", {
        method: "POST",
        body: form,
      });

      const responseData = await res.json();
      const id = responseData._id || responseData.idPerfil || "";
      setField("idPerfil", id);
      navigate("/criar-nft", { state: { idPerfil: id } });
    } catch (err) {
      console.error("Erro ao enviar cadastro:", err);
      alert("Erro ao salvar os dados do proprietário.");
    }
  };

  const renderEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <EtapaProprietario
            formData={formData}
            handleChange={handleChange}
            setField={setField} // ✅ Adicione essa prop se usada no componente
          />
        );
      case 2:
        return (
          <EtapaPropriedade
            formData={formData}
            handleChange={handleChange}
            setEtapaAtual={setEtapa}
          />
        );
      case 3:
        return (
          <EtapaRegras
            formData={formData}
            handleChange={handleChange}
            setEtapaAtual={setEtapa}
          />
        );
      default:
        return null;
    }
  };

  return (
    <LayoutPadraoNovo>
      <motion.div
        className="min-h-screen bg-white p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${etapa >= step
                  ? "bg-purple-600 text-white"
                  : "border-gray-300 text-gray-400"
                }`}
            >
              {step}
            </div>
          ))}
        </div>

        {renderEtapa()}

        <div className="flex justify-between mt-6">
          {etapa > 1 && (
            <button
              onClick={() => setEtapa(etapa - 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Voltar
            </button>
          )}
          {etapa < 3 && (
            <button
              onClick={() =>
                etapa === 1 ? handleSubmitEtapa1() : setEtapa(etapa + 1)
              }
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              Próximo
            </button>
          )}
          {etapa === 3 && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Confirmar e Salvar
            </button>
          )}
        </div>

        {mostrarTutorIA && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-lg">
              <h2 className="text-xl font-bold text-purple-700 mb-2">
                Perfil Criado com Sucesso!
              </h2>
              <p className="mb-2">Seu identificador universal:</p>
              <code className="text-sm bg-gray-100 px-4 py-1 rounded text-blue-700">
                {formData.idPerfil}
              </code>
              <p className="mt-4 text-gray-800">
                Deseja continuar com a ajuda do <strong>Tutor IA</strong>?
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    iniciarTutorIA();
                    setMostrarTutorIA(false);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Sim, quero ajuda
                </button>
                <button
                  onClick={() => {
                    setMostrarTutorIA(false);
                    navigate("/criar-nft", { state: { idPerfil: formData.idPerfil } });
                  }}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Não, seguir sozinho
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </LayoutPadraoNovo>
  );
}
