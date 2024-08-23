import mongoose from 'mongoose';
const { model, Schema, models } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, required: true },
    contactType: {
      type: String,
      required: true,
      default: 'personal',
      enum: ['work', 'home', 'personal'],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ContactsCollection = models.Contact || model('Contact', contactSchema);

export default ContactsCollection;
