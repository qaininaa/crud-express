import { createUser, loginUser } from "../services/auth.service.js";

export const createUserController = async (req, res) => {
  try {
    const data = req.body;

    await createUser(data);

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

export const LoginUserController = async (req, res) => {
  try {
    const dataUser = req.body;

    const user = await loginUser(dataUser);

    res.json({
      message: "Succes login",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed login",
      errorMessage: error.message,
    });
  }
};
