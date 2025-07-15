import { createUser, loginUser } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

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

export const loginUserController = async (req, res) => {
  try {
    const dataUser = req.body;

    const { accessToken, refreshToken } = await loginUser(dataUser);

    res.cookie("refreshToken", refreshToken, {
      sameSite: "none",
      httpOnly: true,
      secure: false,
      maxAge: parseInt(process.env.REFRESH_TOKEN_AGE),
    });

    res.json({ token: accessToken });
  } catch (error) {
    res.status(500).json({
      message: "Failed login",
      errorMessage: error.message,
    });
  }
};

export const refreshController = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;

  try {
    if (!refreshToken) return res.sendStatus(403);

    const decode = jwt.verify(refreshToken, refreshSecret);
    const accessToken = jwt.sign(
      {
        name: decode.name,
        email: decode.email,
        username: decode.username,
      },
      accessSecret,
      { expiresIn: process.env.ACCESS_EXPIRE }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
