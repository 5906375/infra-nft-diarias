import { useState } from "react";
import FormProprietario from "./components/FormProprietario";
import FormPropriedade from "./components/FormPropriedade";
import FormRegras from "./components/FormRegras";

const etapas = [
  { label: "Cadastro Proprietário", id: "proprietario" },
  { label: "Cadastro Propriedade", id: "propriedade" },
  { label: "Regras do Imóvel", id: "regras" }
];

export default function Painel() {
  const [active, setActive] = useState("proprietario");

  const proximaEtapa = () => {
    const index = etapas.findIndex((e) => e.id === active);
    if (index < etapas.length - 1) {
      setActive(etapas[index + 1].id);
    }
  };

  const etapaAnterior = () => {
    const index = etapas.findIndex((e) => e.id === active);
    if (index > 0) {
      setActive(etapas[index - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">NFTDiárias</h1>

      {/* Mapa de progresso */}
      <div className="flex justify-center gap-4 mb-8">
        {etapas.map((etapa) => (
          <div
            key={etapa.id}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              active === etapa.id ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
            }`}
          >
            {etapa.label}
          </div>
        ))}
      </div>

      <main className="max-w-5xl mx-auto space-y-6">
        {active === "proprietario" && (
          <div className="bg-white rounded-xl shadow p-6">
            <FormProprietario />
            <div className="mt-6 text-right">
              <button
                onClick={proximaEtapa}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {active === "propriedade" && (
          <div className="bg-white rounded-xl shadow p-6">
            <FormPropriedade />
            <div className="mt-6 flex justify-between">
              <button
                onClick={etapaAnterior}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Voltar
              </button>
              <button
                onClick={proximaEtapa}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {active === "regras" && (
          <div className="bg-white rounded-xl shadow p-6">
            <FormRegras />
            <div className="mt-6">
              <button
                onClick={etapaAnterior}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
