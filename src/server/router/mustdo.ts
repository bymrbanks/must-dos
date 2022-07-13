import { createRouter } from "./context";
import { z } from "zod";

export const mustdoRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world ???"}`,
      };
    },
  })
  .mutation("delete", {
    input: z
      .object({
        id: z.string(),
      }),
    async resolve({ input, ctx }) {
      // find by id and delete
      return await ctx.prisma.mustDo.delete({
        where: {
          id: input.id,
        },
      })
    },
  })
  .mutation("add", {
    input: z
      .object({
        title: z.string(),
        description: z.string(),
        completed: z.boolean(),
        userId: z.string(),
        priority: z.number(),
      }),
    async resolve({ input, ctx }) {
      // CREATE new mustDo
      return await ctx.prisma.mustDo.create({
        data: {
          title: input.title,
          description: input.description,
          completed: input.completed,
          priority: input.priority,
          user: {
            connect: {
              id: input.userId,
            },
          },
        }
    })
    },
  })
  .mutation("update", {
    input: z
      .object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        completed: z.boolean(),
        userId: z.string(),
        priority: z.number(),
      }),
    async resolve({ input, ctx }) {
      // CREATE new mustDo
      return await ctx.prisma.mustDo.update({
        where: {
          id: input.id,
        },
        data: input
    })
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.mustDo.findMany();
    },
  });
