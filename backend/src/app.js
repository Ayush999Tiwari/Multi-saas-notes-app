import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import Tenant from "./models/Tenant.js";
import User from "./models/User.js";

dotenv.config();           
const app = express();
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);

import notesRouter from "./routes/notes.js";
app.use("/notes", notesRouter);

import tenantRouter from "./routes/tenant.js";  
app.use("/tenants", tenantRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Connect to MongoDB + seed defaults
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("MongoDB connected...");
  await ensureDefaults();
}).catch(err => console.error(err));

// Seed-on-startup function
async function ensureDefaults() {
  const existing = await Tenant.findOne({ name: "Acme" });
  if (existing) {
    console.log("Defaults already exist, skipping seed.");
    return;
  }

  const acme = await Tenant.create({ name: "Acme", plan: "free" });
  const globex = await Tenant.create({ name: "Globex", plan: "free" });

  const password = await bcrypt.hash("password", 10);

  await User.create([
    { email: "admin@acme.test", password, tenant: acme._id, role: "admin" },
    { email: "user@acme.test", password, tenant: acme._id, role: "member" },
    { email: "admin@globex.test", password, tenant: globex._id, role: "admin" },
    { email: "user@globex.test", password, tenant: globex._id, role: "member" },
  ]);

  console.log("Default tenants + users created.");
}

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
