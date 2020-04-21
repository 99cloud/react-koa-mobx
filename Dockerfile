FROM node:8-alpine
RUN mkdir -p /root/appUI
WORKDIR /root/appUI
COPY . /root/appUI
RUN mv dist/server.js server/server.js \
    && mv dist/fonts fonts
EXPOSE 8000
CMD ["npm", "run", "serve"]