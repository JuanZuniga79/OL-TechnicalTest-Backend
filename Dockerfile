FROM oven/bun:latest
WORKDIR /usr/src/app

COPY package.json ./
RUN bun install
RUN bun run prisma generate

COPY . .

RUN bun run build

EXPOSE 8080

CMD ["bun", "dist/main"]