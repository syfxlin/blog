# step build next page
FROM quay.io/syfxlin/pnpm:latest as builder
WORKDIR /app

# copy package.json
COPY package.json pnpm-lock.yaml ./

# install node modules
RUN pnpm install --frozen-lockfile

# copy project
COPY . .

# build project
RUN --mount=type=secret,id=build,dst=/app/.env pnpm run build

# step nginx
FROM quay.io/syfxlin/nginx:latest

# copy config
COPY ./deploy/nginx.d /etc/nginx/conf.d

# copy static pages
COPY --chown=nginx:nginx --from=builder /app/public /usr/share/nginx/html
