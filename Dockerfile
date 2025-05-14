




# FROM node:22

# WORKDIR /app

# RUN apt-get update && apt-get install -y \
#     python3 \
#     make \
#     g++ \
#     && rm -rf /var/lib/apt/lists/*

# # Copy only package.json and lock file to leverage caching
# COPY package*.json ./

# # Do a clean install and rebuild bcrypt from source for Linux
# RUN npm install && npm rebuild bcrypt --build-from-source

# # Now copy the full source code
# COPY . .

# EXPOSE 3000

# CMD ["node", "server.js"]
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
