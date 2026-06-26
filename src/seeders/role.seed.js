import '../config/env.config.js'
import mongoose from "mongoose";
import { Role } from "../model/role.model.js";

await mongoose.connect(process.env.MONGO_URI);

const roles = [
  { name: "Admin" },
  { name: "HR" },
  { name: "Employee" },
];

const seedRoles = async () => {
  try {
    for (const role of roles) {
      const exists = await Role.findOne({ name: role.name });

      if (!exists) {
        await Role.create(role);
      }
    }

    console.log("✅ Roles seeded successfully");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
};

seedRoles();