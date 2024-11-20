const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email, password, role },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
