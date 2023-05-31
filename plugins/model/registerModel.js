import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export const myPlugin = async (fastify, opts, done) => {
  const registerUsers = fastify.sequelize.define("registerUsers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,

      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  try {
    await registerUsers.sync({ force: false });
    console.log("User created successfully");
  } catch (error) {
    console.error(error);
  }

  fastify.decorate("registerUsers", registerUsers);
  done();
};

export default fp(myPlugin);
