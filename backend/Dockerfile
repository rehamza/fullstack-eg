# Development Stage
FROM node:22.5.1 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production Stage
FROM node:22.5.1 as production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
