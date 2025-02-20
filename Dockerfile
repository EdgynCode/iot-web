# Stage 1: Build the React app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application, including Tailwind configuration
COPY . ./

# RUN npm run build

# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]

# Production Stage
# FROM nginx:stable-alpine AS production

# Copy the build files to Nginx's default public directory
# COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the server
# EXPOSE 80

# Start Nginx
# CMD ["nginx", "-g", "daemon off;"]