FROM node AS build
WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json ./
RUN npm ci
COPY ./webpack.config.js ./
COPY ./src/client ./src/client
RUN npm run build 2>/dev/null

FROM alpine AS production
RUN apk add --update nodejs npm
ENV NODE_ENV=production
ARG PORT
ENV PORT=$PORT
EXPOSE $PORT
WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json ./
RUN npm ci --production
COPY --from=build /usr/src/app/dist ./dist
COPY ./src/server ./src/server
ENTRYPOINT ["npm", "run", "serve"]
