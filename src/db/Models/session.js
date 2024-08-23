import mongoose from 'mongoose';
const { model, Schema, models } = mongoose;
// модель сесій
const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Session = models.Session || model('Session', sessionSchema);

export default Session;
