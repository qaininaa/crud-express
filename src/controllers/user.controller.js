import { createUser } from "../services/user.service.js";

export const createUserController = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const newUser = await createUser(data);

    res.status(201).json({
      message: "Succes create new user",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
      errorMessage: error.message,
    });
  }
};
