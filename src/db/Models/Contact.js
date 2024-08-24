import mongoose from 'mongoose';
const { model, Schema, models } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ContactsCollection = models.Contact || model('Contact', contactSchema);

export default ContactsCollection;
