// models/Role.js
import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["Admin", "HR", "Employee"],
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export let Role = mongoose.model("Role", roleSchema);