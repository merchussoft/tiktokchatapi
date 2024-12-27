# Usa una imagen base de Node.js
FROM node:20-alpine

# Configura el directorio de trabajo
WORKDIR /app

# Instalar Yarn globalmente
RUN yarn --version

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN yarn install

# Copia el resto del código fuente
COPY . .

# Expone el puerto que la aplicación usa
EXPOSE 3000
EXPOSE 3041

# Comando para iniciar la aplicación
CMD ["yarn", "start"]