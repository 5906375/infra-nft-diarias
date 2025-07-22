from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes import audio, tutor

app = FastAPI(title="Assistente IA - NFTDiarias")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(audio.router, prefix="/audio", tags=["TTS"])
app.include_router(tutor.router, prefix="/tutor", tags=["Explicações"])

@app.get("/")
def health():
    return {"message": "Backend IA ativo"}
