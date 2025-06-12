FROM node:18

WORKDIR /app

# Copy only dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Expose the desired port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
