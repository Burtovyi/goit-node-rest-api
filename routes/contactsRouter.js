import express from "express";
import { getAllContacts, getOneContact, deleteContact, createContact, updateContact } from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import isValidID from "../middlewares/isValidID.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidID, getOneContact);

contactsRouter.delete("/:id", isValidID, deleteContact);

contactsRouter.post("/", isEmptyBody, createContact);

contactsRouter.put("/:id", isValidID, isEmptyBody, updateContact);

contactsRouter.patch("/:id/favorite", isValidID, isEmptyBody, updateContact);

export default contactsRouter;