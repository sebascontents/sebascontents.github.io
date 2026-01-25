# Usamos una imagen ligera de Node 22
FROM node:22-slim

# Creamos la carpeta de la app
WORKDIR /app

# Copiamos solo el package.json para instalar librerías
COPY package.json ./

# Instalamos las librerías (sin necesidad de lockfile)
RUN npm install

# Copiamos el resto de los archivos (index.js, etc.)
COPY . .

# Exponemos el puerto que usa tu servidor (generalmente 8080 o el que definas)
EXPOSE 8080

# Comando para arrancar la app
CMD ["node", "index.js"]
