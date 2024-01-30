# Use a Node.js base image with TypeScript support
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml files
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Build TypeScript files
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3010

# Command to run the app
CMD ["node", "dist/index.js"]