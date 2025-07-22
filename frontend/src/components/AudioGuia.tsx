import { useState } from "react";

export default function AudioGuia() {
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/ia/falar?texto=Bem-vindo ao NFTDiárias. Esta é a tela inicial do seu cadastro.");
      const data = await res.json();
      const audio = new Audio(`http://localhost:8000${data.audio_url}`);
      audio.play();
    } catch (error) {
      alert("Erro ao reproduzir áudio");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePlay}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Carregando..." : "Tocar guia por áudio"}
      </button>
    </div>
  );
}
