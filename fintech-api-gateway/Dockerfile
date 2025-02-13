FROM node:22.11.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

RUN  npx prisma migrate dev --name init

CMD ["yarn", "dev"]

