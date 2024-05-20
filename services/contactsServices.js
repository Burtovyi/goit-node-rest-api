import Contact from "../models/Contact.js";

export const listContacts = async () => {
  return await Contact.find({});
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const addContact = async (data) => {
  return await Contact.create(data);
};

export const updateContactById = async (contactId, data) => {
  return await Contact.findByIdAndUpdate(contactId, data, { new: true });
};

export const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};