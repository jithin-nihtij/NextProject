# 1. Use the official Node.js image as a base image
FROM node:18-alpine

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy the package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# 4. Install dependencies
RUN yarn install --frozen-lockfile

# 5. Copy the rest of the app's source code to the container
COPY . .

# 6. Build the Next.js app
RUN yarn build

# 7. Expose the port that Next.js runs on
EXPOSE 3000

# 8. Specify the command to start the app
CMD ["yarn", "dev"]
