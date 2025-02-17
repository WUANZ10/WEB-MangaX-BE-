import { createUserService } from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await createUserService();
    return res.status(201).json(newUser);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

export { createUser };
