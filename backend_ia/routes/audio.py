# app/routes/audio.py
from fastapi import APIRouter, Query
from app.services.tts import gerar_audio

router = APIRouter()

@router.get("/")
def sintetizar(texto: str = Query(...)):
    path = gerar_audio(texto)
    return {"audio_url": f"/static/audio/{path}"}
