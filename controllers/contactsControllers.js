import * as contactsServices from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
    const result = await contactsServices.listContacts();
    res.json(result);
} catch (error) {
   next(error)
}
};

export const getOneContact = async (req, res, next) => {
    try {
        const result = await contactsServices.getContactById(req.params.id);
    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
} catch (error) {
   next(error)
}
};

export const createContact = async (req, res, next) => {
    try {
        const { error } = createContactSchema.validate(req.body);
        if (error) {
            throw next(HttpError(400, error.message));
        }
        
        
        const result = await contactsServices.addContact(
            req.body.name,
            req.body.email,
            req.body.phone
        );
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            throw next(HttpError(400, error.message));
        }
        const { id } = req.params;
        const result = await contactsServices.updateContactById(id, req.body);
    
        if (!result) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
}

export const deleteContact = async (req, res, next) => {
try {
    const result = await contactsServices.removeContact(req.params.id);
    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
} catch (error) {
   next(error)
}
};