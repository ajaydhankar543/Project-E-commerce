FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite usually runs on 5173
EXPOSE 5173

# Start Vite with the --host flag so it's accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]