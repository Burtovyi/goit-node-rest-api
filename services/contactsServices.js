import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find({});

export const getContactById = async (contactId) => Contact.findById(contactId);

export const addContact = data => Contact.create(data);

export const updateContactById = async (contactId, data) => Contact.findByIdAndUpdate(contactId, data, { new: true });

export const removeContact = async (contactId) => Contact.findByIdAndRemove(contactId);