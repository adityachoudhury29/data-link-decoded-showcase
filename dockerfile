FROM node:23-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code files
COPY . .

# Build the app
RUN npm run build

# Expose port (use the port your app listens on)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
