/// <reference path="https://raw.githubusercontent.com/syfxlin/depker/master/src/types/index.ts" />

export const deploy = depker.docker.of(() => ({
  name: "blog",
  image: "syfxlin/blog",
  build: {
    secret: { build: ".env" },
    dockerfile_contents: depker.template.nodejs_static({
      version: "node16",
      // prettier-ignore
      inject_prepare: [`RUN apk --no-cache add git \
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
          util-linux \
          g++ \
          make \
          python3
      `]
    })
  },
  run: {
    traefik: {
      domain: ["blog.ixk.me"],
      tls: true
    }
  }
}));
