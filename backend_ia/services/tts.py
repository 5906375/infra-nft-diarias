# app/services/tts.py
from gtts import gTTS
from uuid import uuid4

def gerar_audio(texto: str) -> str:
    nome_arquivo = f"{uuid4().hex}.mp3"
    caminho = f"static/audio/{nome_arquivo}"
    tts = gTTS(texto, lang="pt-br")
    tts.save(caminho)
    return nome_arquivo
