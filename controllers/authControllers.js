import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

const signup = async (req, res) => {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw new HttpError(409, "Email already in use");
    }

    const newUser = await authServices.saveUser(req.body);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    });
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw new HttpError(401, "Email or password invalid");
    }
    const comparePassword = await compareHash(password, user.password);
    if (!comparePassword) {
        throw new HttpError(401, "Email or password invalid");
    }

    const { _id: id } = user;
    const payload = {
        id,
    };

    const token = createToken(payload);

    res.json({
        token,
        user: {
            email: user.email,
            username: user.username
        }
    });
};

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
};