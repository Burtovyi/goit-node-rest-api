import {findUser, saveUser, updateUser} from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

const signup = async(req, res)=> {
    const {email} = req.body;
    const user = await findUser({email});
    if(user) {
        throw HttpError(409, "Email already use");
    }

    const newUser = await saveUser(req.body);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const comparePassword = await compareHash(password, user.password);
    if(!comparePassword) {
        throw HttpError(401, "Email or password invalid");
    }

    const {_id: id} = user;
    const payload = {
        id,
    };

    const token = createToken(payload);
    await updateUser({_id: id}, {token});

    res.json({
        token,
    })
}

const getCurrent = (req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
    })
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    await updateUser({_id}, {token: ""});
    
    res.json({
        message: "Signout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}