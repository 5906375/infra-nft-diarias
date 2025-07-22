
# Integração do Assistente Codex com Voz no Projeto NFTDiárias

## Objetivo
Implementar um assistente inteligente com entrada por voz e texto no projeto NFTDiárias, utilizando GPT-4o (Codex) para:
- Gerar código automaticamente
- Responder dúvidas sobre o funcionamento do DApp
- Ajudar o usuário a preencher formulários por voz
- Automatizar tarefas no backend e frontend
- Realizar leitura e interpretação de contratos inteligentes (smart contracts), com explicações jurídicas em português, com base na legislação brasileira, incluindo o Código Civil, CDC e legislação aplicável à locação.
- Ler, interpretar e explicar contratos de adesão e contratos tradicionais (Web2) com base no Código Civil, Código de Defesa do Consumidor e jurisprudência brasileira, destacando cláusulas abusivas ou desequilibradas.
---

## Estrutura Existente
O usuário já possui:

- `backend_ia/main.py` → ponto de entrada do FastAPI
- `routes/audio.py` → recebe entrada de voz
- `services/tts.py` → gera áudio a partir do texto
- `static/audio/` → armazena os áudios
- `tutor.ts` → frontend de integração com assistente

---

## Melhorias implementadas (GPT-4o)
Melhorias implementadas (GPT-4o)
1. Nova rota Codex via FastAPI
Arquivo: backend_ia/routes/codex.py

```python from fastapi import APIRouter, Request import openai import os from dotenv import load_dotenv

load_dotenv() router = APIRouter()

openai.apikey = os.getenv("OPENAIAPI_KEY")

@router.post("/codex") async def codex_prompt(req: Request): data = await req.json() prompt = data.get("prompt")

response = openai.ChatCompletion.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.4
)

return {"resposta": response.choices[0].message["content"]}
```

2. Registrar a rota no main.py:
```python from fastapi import FastAPI from routes import codex, audio

app = FastAPI() app.includerouter(codex.router, prefix="/api") app.includerouter(audio.router, prefix="/api") ```

3. Integração no frontend (AssistenteCodex.tsx)
Usa Web Speech API para capturar voz
Envia comando para FastAPI (rota /api/codex)
Mostra resposta do Codex em tela
Futuro: converter resposta para áudio com tts.py
Fluxo Completo
text Usuário fala 🎙️ ↓ audio.py → STT (Speech-to-text) ↓ codex.py → GPT-4o processa o comando ↓ Resposta textual ↓ tts.py → converte resposta para áudio ↓ Frontend reproduz resposta falada

Aplicações práticas no NFTDiárias
Criar contratos NFT por voz
Preencher formulários de imóvel com auxílio do assistente
Explicar funcionamento do sistema e regras de reserva
Gerar relatórios administrativos com comandos naturais
Suporte técnico embutido no painel
Próximos passos
Adicionar botão de ativação de assistente na interface
Permitir conversação com contexto entre páginas
Salvar logs de interação para analytics
### 1. Nova rota Codex via FastAPI
###Arquivo: `backend_ia/routes/codex.py`

###```python
from fastapi import APIRouter, Request
import openai
import os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

openai.api_key = os.getenv("OPENAI_API_KEY")

@router.post("/codex")
async def codex_prompt(req: Request):
    data = await req.json()
    prompt = data.get("prompt")

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4
    )

    return {"resposta": response.choices[0].message["content"]}
```

### 2. Registrar a rota no `main.py`:

```python
from fastapi import FastAPI
from routes import codex, audio

app = FastAPI()
app.include_router(codex.router, prefix="/api")
app.include_router(audio.router, prefix="/api")
```

---

### 3. Integração no frontend (`AssistenteCodex.tsx`)

- Usa Web Speech API para capturar voz
- Envia comando para FastAPI (rota `/api/codex`)
- Mostra resposta do Codex em tela
- Futuro: converter resposta para áudio com `tts.py`

---

## Fluxo Completo

```text
Usuário fala 🎙️
↓
audio.py → STT (Speech-to-text)
↓
codex.py → GPT-4o processa o comando
↓
Resposta textual
↓
tts.py → converte resposta para áudio
↓
Frontend reproduz resposta falada
```

---

## Aplicações práticas no NFTDiárias

- Criar contratos NFT por voz
- Preencher formulários de imóvel com auxílio do assistente
- Explicar funcionamento do sistema e regras de reserva
- Gerar relatórios administrativos com comandos naturais
- Suporte técnico embutido no painel

---

## Próximos passos

- Adicionar botão de ativação de assistente na interface
- Permitir conversação com contexto entre páginas
- Salvar logs de interação para analytics
