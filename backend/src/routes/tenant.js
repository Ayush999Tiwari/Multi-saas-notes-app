import express from "express";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Upgrade subscription (Admin only)
router.post("/:id/upgrade", auth("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure admin can only upgrade *their own* tenant
    if (req.user.tenantId !== id) {
      return res.status(403).json({ message: "Not allowed to upgrade other tenants" });
    }

    const tenant = await Tenant.findByIdAndUpdate(
      id,
      { plan: "pro" },
      { new: true }
    );

    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    res.json({ message: "Tenant upgraded to Pro", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Invite user (Admin only)
router.post("/:id/invite", auth("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    // Ensure admin can only invite for their own tenant
    if (req.user.tenantId !== id) {
      return res.status(403).json({ message: "Not allowed to invite for other tenants" });
    }

    const user = new User({
      email,
      password: "password", // default password for testing
      role,
      tenant: id,
    });

    await user.save();
    res.status(201).json({ message: "User invited", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
