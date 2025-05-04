FROM node:22-alpine

# Create user and group
RUN addgroup portfolio && adduser -S -G portfolio dev

# Set working directory
WORKDIR /portfolio

# Copy only dependency files and install first
COPY package*.json ./

# Install dependencies as root (safe inside container)
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

# Change ownership of app files to portfolio user
RUN chown -R dev:portfolio /portfolio

# Drop privileges
USER dev

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
