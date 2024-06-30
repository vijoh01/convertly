# Använd en passande Node.js-basbild
FROM node:18

# Ange arbetskatalogen inuti containern
WORKDIR /app

# Kopiera package.json och package-lock.json till containern
COPY package.json package-lock.json ./

# Installera projektets beroenden, inklusive tailwindcss
RUN npm install --production

# Kopiera hela projektet till containern
COPY . .

# Installera tailwindcss som en devDependency om det inte redan är installerat
RUN npm install -D tailwindcss

# Bygg Next.js-applikationen
RUN npm run build

# Exponera porten som din app körs på (Next.js standard är 3000)
EXPOSE 3000

# Kommando för att köra din Next.js-applikation
CMD ["npm", "run", "dev"]
