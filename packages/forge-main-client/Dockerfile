FROM node:lts-alpine as build

ARG PUBLIC_MAIN_SERVER_URL
ARG ENCYPTION_SECRET
ARG ENCYPTION_SALT
ENV PUBLIC_MAIN_SERVER_URL=${PUBLIC_MAIN_SERVER_URL}
ENV ENCYPTION_SECRET=${ENCYPTION_SECRET}
ENV ENCYPTION_SALT=${ENCYPTION_SALT}
WORKDIR /app
COPY ./package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:lts-alpine AS production
ARG ORIGIN
ENV ORIGIN=${ORIGIN}
COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install
CMD ["node", "index.js"]
