import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { bookRouter } from "./routes/blog";

const app = new Hono().basePath("/api/v1");

//  app.use(logger());  // For Middleware
app.use("/*", cors());
app.route("/user", userRouter);
app.route("/blog", bookRouter);

export default app;
