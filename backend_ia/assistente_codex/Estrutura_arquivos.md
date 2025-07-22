📦 Estrutura dos arquivos a criar
Caminho	Função
frontend/src/pages/AnalisadorContratos.tsx	Tela de upload e análise
backend_ia/routes/analisar.py	Rota FastAPI para processar arquivo
backend_ia/services/parser.py	Leitura de .pdf, .docx, .sol
backend_ia/services/gpt_analisador.py	Integração GPT-4o com prompt jurídico
