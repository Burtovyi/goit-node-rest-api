import * as contactsServices from "../services/contactsServices.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await contactsServices.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
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
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { error } = createContactSchema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        
        const result = await contactsServices.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        
        const { id } = req.params;
        const result = await contactsServices.updateContactById(id, req.body);
    
        if (!result) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const { error } = updateFavoriteSchema.validate(req.body); // Use updateFavoriteSchema here
        if (error) {
            return next(HttpError(400, error.message));
        }

        const result = await contactsServices.updateContactById(req.params.id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const result = await contactsServices.removeContact(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};