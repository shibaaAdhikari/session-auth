import bcrypt from "bcrypt";

const getRegisterUsers = async (req, reply) => {
  try {
    const registerUsers = await req.server.registerUsers.findAll();
    reply.send(registerUsers);
  } catch (error) {
    reply.send(error);
  }
};

const getRegisterUsersById = async (req, reply) => {
  try {
    const user = await req.server.registerUsers.findByPk(req.params.id);
    reply.code(200).send(user);
  } catch (error) {
    throw error;
  }
};

const postRegister = async (req, reply) => {
  try {
    const { email, password } = req.body;

    if (!email && password) {
      reply.code(400).send("All input is required");
    }

    const registerUsers = req.server.registerUsers;
    const oldUser = await registerUsers.findOne({ where: { email } });

    if (oldUser) {
      return reply.code(409).send("User Already Exists. Please Login");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUsers.create({
      email,
      password: hashedPassword,
    });

    req.session.newUser = { id: newUser.id, email: newUser.email };
    await req.session.save();

    reply.status(201).send({ msg: "register successfully", newUser });
  } catch (error) {
    reply.send(error);
  }
};

const logout = async (req, reply) => {
  // try {
  //   req.session.destroy((err) => {
  //     if (err) {
  //       console.error(err);
  //       reply.code(500).send({ message: "Session could not be cleared" });
  //       return;
  //     }
  //     console.log("Session ID cleared");
  //     reply.send({ message: "logged out successfully" });
  //   });
  // } catch (error) {
  //   console.error(error);
  //   reply.code(500).send({ message: "Internal Server Error" });
  // }
  await req.session.destroy();
};

export { getRegisterUsers, getRegisterUsersById, postRegister, logout };
