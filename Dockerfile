# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN chmod -R 777 /app/node_modules

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]
