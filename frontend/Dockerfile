# Etapa: base
FROM node:18

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Variáveis para ambiente de desenvolvimento
ENV HOST=0.0.0.0

# Comando padrão: inicia o Vite em modo dev
CMD ["npm", "run", "dev"]
