import { model, Schema } from 'mongoose';

// модель сесій
const sessionSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Session = model('Session', sessionSchema);
