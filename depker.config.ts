import { depker, nextjs } from "https://raw.githubusercontent.com/syfxlin/depker/master/mod.ts";

const app = depker();

app.service(
  nextjs({
    name: "blog",
    domain: "nextjs.test",
    nextjs: {
      inject: {
        dockerfile: `
          COPY --from=builder /app/content /app/content
        `,
      },
    },
  }),
);

export default app;
