import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

bookRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  const jwt = header.split(" ")[1];
  const token = await verify(jwt, c.env.JWT_SECRET);
  if (!token) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }
  c.set("userId", token.id);
  await next();
});

bookRouter.post("/add", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      msg: `Blog added ${blog.id}`,
    });
  } catch (err) {
    c.status(403);
    return c.json({ err });
  }
});

bookRouter.put("/update", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const blog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      msg: `Blog updated ${blog.id}`,
    });
  } catch (err) {
    c.status(403);
    return c.json({ err });
  }
});

bookRouter.get("/post", async (c) => {
  const id = c.req.query("id");
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id,
        authorId: userId,
      },
    });
    return c.json(blog);
  } catch (err) {
    c.status(403);
    return c.json({ err });
  }
});

bookRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany({});
    return c.json(blog);
  } catch (error) {
    c.status(403);
    return c.json({ error });
  }
});

const app = new Hono();
app.route("/blog", bookRouter);
