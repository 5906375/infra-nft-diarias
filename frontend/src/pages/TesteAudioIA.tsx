import React, { useState } from 'react';
import axios from 'axios';

export default function TesteAudioIA() {
    const [texto, setTexto] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const gerarAudio = async () => {
        if (!texto) return;

        try {
            const res = await axios.get('http://127.0.0.1:5000/ia/falar', {
                params: { texto },
            });

            const url = `http://127.0.0.1:5000${res.data.audio_url}`;
            setAudioUrl(url);
        } catch (err) {
            console.error('Erro ao gerar áudio:', err);
            alert('Erro ao gerar áudio');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto space-y-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">🔊 Testar Áudio via IA</h2>

            <input
                type="text"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite um texto para ouvir"
                className="w-full p-2 border rounded"
            />

            <button
                onClick={gerarAudio}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Gerar Áudio
            </button>

            {audioUrl && (
                <audio controls src={audioUrl} className="w-full mt-4">
                    Seu navegador não suporta áudio.
                </audio>
            )}
        </div>
    );
}
