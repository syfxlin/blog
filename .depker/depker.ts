/// <reference path="https://raw.githubusercontent.com/syfxlin/depker/master/src/types/index.ts" />

export const deploy = async () => {
  // prettier-ignore
  const dockerfile = depker.template.nodejs_static({
    inject_prepare: [`
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
    `]
  });
  const image = await depker.docker.build("syfxlin/blog", {
    dockerfile_contents: dockerfile,
    secrets: { build: ".env" }
  });
  const compose = depker.compose.deployment("blog", {
    services: {
      web: {
        image,
        traefik: {
          domain: ["blog.ixk.me"],
          tls: true
        }
      }
    }
  });
  await compose.up();
};
