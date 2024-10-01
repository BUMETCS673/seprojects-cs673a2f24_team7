# Step 1: Use an official minimal image like Alpine
FROM node:22-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Install pnpm globally
RUN npm install -g pnpm

# Step 4: Copy package.json, pnpm-lock.yaml and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Step 5: Copy the rest of the application source code
COPY . .

# Step 6: Build the Vite project for production
RUN pnpm build

# Step 7: Expose the port used by Vite preview server
EXPOSE 8081

# Step 8: Run Vite's built-in preview server within a detached session
CMD ["pnpm", "preview", "--host"]

