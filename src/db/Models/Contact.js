import mongoose from 'mongoose';
const { model, Schema, models } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ContactsCollection = models.Contact || model('Contact', contactSchema);

export default ContactsCollection;
