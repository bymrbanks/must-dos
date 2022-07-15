import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const mustdoRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
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
      console.log(ctx.session, "test")
      if (ctx.session) {
        let mustdos = await ctx.prisma.mustDo.findMany(
          {
            where: {
              user: {
                id: ctx.session.id as string,
              },
            },
          }
        );
        console.log(mustdos, "mustdos")
        return mustdos;
      } else {
        return [];
      }
    },
  });
