import {
  signupService,
  loginService,
} from "../services/authService.js";

export const signup = async (req, res, next) => {
  try {
    const user = await signupService(req.body);
    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginService(req.body);

    res.cookie("token", data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ message: "login successfull", user: data.user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "logout successfully" });
};

export const me = async (req, res, next) => {
  return res.status(200).json({ message: "User details", user: req.user });
};
