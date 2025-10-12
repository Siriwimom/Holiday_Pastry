import { Router } from "express";
import { auth, requireRole } from "../middleware/auth.js";

const router = Router();
const memory = []; // เปลี่ยนเป็น Mongo model จริงทีหลัง

router.get("/", async (_req, res) => {
  res.json(memory);
});

router.post("/", auth, requireRole("admin"), async (req, res) => {
  const { name, price, category, imageUrl } = req.body;
  const item = { id: Date.now().toString(), name, price, category, imageUrl };
  memory.push(item);
  res.status(201).json(item);
});

router.put("/:id", auth, requireRole("admin"), async (req, res) => {
  const idx = memory.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  memory[idx] = { ...memory[idx], ...req.body };
  res.json(memory[idx]);
});

router.delete("/:id", auth, requireRole("admin"), async (req, res) => {
  const idx = memory.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  const [removed] = memory.splice(idx, 1);
  res.json(removed);
});

export default router;
