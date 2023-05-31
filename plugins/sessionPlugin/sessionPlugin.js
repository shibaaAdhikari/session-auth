import fastifyPlugin from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";

export default fastifyPlugin(async (fastify) => {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: process.env.SESSION_ID,
    cookie: { secure: false },
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      if (!request.session.newUser) {
        reply.code(401).send({ message: "Unauthorized" });
        throw new Error("Unauthorized");
      }
    } catch (error) {
      reply.send(error);
    }
  });
});
