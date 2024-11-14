# Usa una imagen de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["node", "servidor.js"]
