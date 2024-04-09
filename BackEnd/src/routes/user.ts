import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput, signinInput } from "@prateek19/blogging-website-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  try {
    const uniqueUser = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (uniqueUser) {
      c.status(404);
      return c.json({
        msg: "User already exists",
      });
    }
    const User = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name || "Anonymous",
      },
    });
    const token = await sign({ id: User.id }, c.env.JWT_SECRET);
    return c.text(token);
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "invalid input" });
  }
  const User = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!User) {
    c.status(403);
    return c.json({ error: "User not found" });
  }
  const token = await sign({ id: User.id }, c.env.JWT_SECRET);
  return c.text(token);
});

const app = new Hono();
app.route("/user", userRouter);
