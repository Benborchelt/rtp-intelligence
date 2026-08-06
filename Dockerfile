FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /usr/share/nginx/html/*

COPY index.html portfolio.html contact.html 404.html robots.txt sitemap.xml /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

EXPOSE 8080
