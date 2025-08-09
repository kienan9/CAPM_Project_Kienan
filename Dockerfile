# Step 1: Build React app
FROM node:16 as builder

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
