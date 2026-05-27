# Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Runtime avec Nginx léger
FROM nginx:alpine
COPY --from=builder /app/dist/front/browser /usr/share/nginx/html
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
# 2. On utilise un script d'entrée (entrypoint) pour remplacer la variable
# Le script remplace ${API_URL} dans tous les fichiers JS du dossier 
# avant de démarrer Nginx.
CMD /bin/sh -c "envsubst '\$API_URL' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp && mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"
EXPOSE 8081