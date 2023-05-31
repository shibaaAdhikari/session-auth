import {
  getRegisterUsers,
  logout,
  postRegister,
} from "../../Controller/registerUsers.js";

export default function (fastify, opts, done) {
  const getRegisterUsersOpts = {
    schema: {
      response: {},
    },
    onRequest: [fastify.authenticate],
    handler: getRegisterUsers,
  };

  const postRegisterOpts = {
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
    },
    handler: postRegister,
  };

  const logoutOpts = {
    schema: {},
    handler: logout,
  };

  fastify.get("/", getRegisterUsersOpts);
  fastify.post("/", postRegisterOpts);
  fastify.post("/logout", logoutOpts);

  done();
}
