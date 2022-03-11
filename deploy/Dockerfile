# step build next page
FROM node:alpine as builder
WORKDIR /app

# install dependencies
RUN apk --no-cache add git \
        shadow \
        gcc \
        musl-dev \
        autoconf \
        automake \
        make \
        libtool \
        nasm \
        tiff \
        jpeg \
        zlib \
        zlib-dev \
        file \
        pkgconf \
        util-linux

# copy package.json
COPY package.json pnpm-lock.yaml ./

# install node modules
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile

# copy project
COPY . .

# build project
RUN --mount=type=secret,id=build,dst=/app/.env pnpm run build

# step nginx
FROM nginx:alpine

# copy static pages
COPY --chown=nginx:nginx --from=builder /app/public /usr/share/nginx/html
