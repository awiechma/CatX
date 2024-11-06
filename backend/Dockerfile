FROM node:18-alpine

# Set working directory to /app
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source code
COPY . .

# Expose port
EXPOSE 3000

CMD ["npm", "start"]