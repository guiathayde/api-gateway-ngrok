# Usar uma imagem base do Node.js
FROM node:20

# Definir o diretório de trabalho no container
WORKDIR /

# Copiar os arquivos do package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .

# Gerar a build do projeto
RUN npx tsc

EXPOSE 443

# Comando para iniciar a aplicação
CMD ["sh", "-c", "node dist/index.js"]
