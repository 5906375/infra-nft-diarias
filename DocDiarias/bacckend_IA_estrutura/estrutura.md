backend_ia/
├── main.py                         # App FastAPI
├── routers/
│   ├── voz.py                      # Rotas de leitura e comando por voz
│   ├── contrato.py                 # Upload e análise de contratos
│   └── guia.py                     # Assistente inteligente
├── services/
│   ├── voz_service.py              # Funções para TTS e STT
│   ├── analise_contrato.py         # Funções para analisar PDFs/DOCX/SOL
│   └── guia_ia.py                  # Motor de conversa guiada com IA
├── utils/
│   ├── pdf_parser.py               # Leitura de PDF
│   └── gpt4_analyzer.py            # Comunicação com OpenAI
├── static/
│   └── audios/                     # Áudios gerados para TTS
└── uploads/
    └── contratos/                 # Contratos enviados
