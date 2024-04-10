import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  createPostInput,
  updatePostInput,
} from "@prateek19/blogging-website-common";

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
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      title: body.title,
      content: body.content,
      id: blog.id,
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
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
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

bookRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(blog);
  } catch (error) {
    c.status(403);
    return c.json({ error });
  }
});

bookRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(blog);
  } catch (err) {
    c.status(403);
    return c.json({ err });
  }
});

const app = new Hono();
app.route("/blog", bookRouter);
