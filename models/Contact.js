import mongoose from "mongoose";
import { handleSaveError } from "../models/hooks.js";

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleSaveError);

const Contact = model("Contact", contactSchema);

export default Contact;