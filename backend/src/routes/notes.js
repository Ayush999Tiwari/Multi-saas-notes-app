import express from "express";
import Note from "../models/notes.js";
import Tenant from "../models/Tenant.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// --------------Create a note -------------------
router.post("/", auth(), async (req, res) => {
  try {
    const { title, content } = req.body;
    const { tenantId, userId } = req.user;

    // Check subscription plan
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    if (tenant.plan == "free") {
      const count = await Note.countDocuments({ tenant: tenantId });
      if (count >= 3) {
        return res.status(403).json({ message: "Free plan limit reached. Upgrade to Pro." });
      }
    }

    const note = new Note({ title, content, tenant: tenantId, user: userId });
    await note.save();

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notes for current tenant
router.get("/", auth(), async (req, res) => {
  const { tenantId } = req.user;
  const notes = await Note.find({ tenant: tenantId });
  res.json(notes);
});

// Get a specific note
router.get("/:id", auth(), async (req, res) => {
  const { tenantId } = req.user;
  const note = await Note.findOne({ _id: req.params.id, tenant: tenantId });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

// Update note
router.put("/:id", auth(), async (req, res) => {
  const { tenantId } = req.user;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, tenant: tenantId },
    req.body,
    { new: true }
  );
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

// Delete note
router.delete("/:id", auth(), async (req, res) => {
  const { tenantId } = req.user;
  const note = await Note.findOneAndDelete({ _id: req.params.id, tenant: tenantId });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Note deleted" });
});

export default router;
