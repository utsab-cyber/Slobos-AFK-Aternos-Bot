FROM node:18-slim

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy app source
COPY . .

ENV NODE_ENV=production
EXPOSE 59819

CMD ["npm", "start"]
