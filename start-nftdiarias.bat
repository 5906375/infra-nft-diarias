echo 🚀 Iniciando build e execução de todos os serviços...
start "" cmd /k "docker compose up --build"

timeout /t 8 /nobreak > nul

echo 🌐 Abrindo interfaces no navegador...

start "" http://localhost:5173         :: Frontend (Vite)
start "" http://localhost:4000         :: Backend principal (Express)
start "" http://localhost:5000/docs    :: Backend IA (FastAPI Swagger)
start "" http://localhost:5001/webui   :: IPFS Web UI

echo ✅ Tudo iniciado. Boa codificação!
