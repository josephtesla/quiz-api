import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { modelTransformFn } from "../helpers";
import { IUser } from "../types";


const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      validate(email: string) {
        if (!validator.isEmail(email)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: modelTransformFn,
    },
  }
);

schema.index({ email: 1})

export const User = mongoose.model<IUser>("User", schema);
