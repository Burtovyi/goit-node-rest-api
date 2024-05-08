import * as contactsServices from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsServices.listContacts();
    res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const contact = await contactsServices.getContactById(req.params.id);
    if (!contact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
};


export const deleteContact = async (req, res) => {
    const contact = await contactsServices.removeContact(req.params.id);
    if (!contact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
};


export const createContact = async (req, res) => {
    const contact = await contactsServices.addContact(
        req.body.name,
        req.body.email,
        req.body.phone
    );
    res.status(201).json(contact);
};


export const updateContact = async (req, res) => {
    const contact = await contactsServices.updateContactById(
        req.params.id,
        req.body.name,
        req.body.email,
        req.body.phone
    );
    if (!contact) {
        return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
}

