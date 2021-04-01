FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/angular-tour-of-heroesV2-berguert /usr/share/nginx/html
